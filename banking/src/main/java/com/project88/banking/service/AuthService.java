package com.project88.banking.service;

import com.project88.banking.config.jwt.JwtUtils;
import com.project88.banking.dto.LoginDTO;
import com.project88.banking.dto.UserDTO;
import com.project88.banking.entity.Bill;
import com.project88.banking.entity.CardNumber;
import com.project88.banking.entity.PasswordResetToken;
import com.project88.banking.entity.RegistrationUserToken;
import com.project88.banking.entity.Status;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IBillRepository;
import com.project88.banking.repository.ICardRepository;
import com.project88.banking.repository.IUserRepository;
import com.project88.banking.repository.PasswordResetTokenRepository;
import com.project88.banking.repository.RegistrationUserTokenRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private RegistrationUserTokenRepository registrationUserTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IBillRepository billRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ICardRepository cardRepository;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Autowired
    private IUserService userService;
    
    @Autowired
    private JwtBlacklistService jwtBlacklistService;

    
    public ResponseEntity<?> login(LoginDTO loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Sai tài khoản hoặc mật khẩu!");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findUserByUsername(userDetails.getUsername());

        // Kiểm tra trạng thái tài khoản: nếu NOT_ACTIVE thì gửi lại email xác thực
        if (user.getStatus() == Status.NOT_ACTIVE) {
            sendTokenViaEmail(user);
            return ResponseEntity.status(403).body("Tài khoản chưa kích hoạt. Đã gửi lại link kích hoạt qua email.");
        } else if (user.getStatus() == Status.FROZEN ) {
        	return ResponseEntity.status(403).body("Tài khoản đã bị khóa, vui lòng liên hệ ngân hàng.");
		}

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        return ResponseEntity.ok(response);
    }
    
    public ResponseEntity<?> logout(HttpServletRequest request) {
    	String token = jwtUtils.getJwtFromRequest(request);
        if (token != null && jwtUtils.validateToken(token)) {
            LocalDateTime expiry = jwtUtils.getExpiryFromToken(token);
            jwtBlacklistService.blacklistToken(token, expiry);
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    public void registerUser(UserDTO userDTO) {
        User user = userDTO.toEntity();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        CardNumber cardNumber = new CardNumber();
        cardNumber.setUser(user);
        cardRepository.save(cardNumber);

        Bill electricBill = new Bill("Hóa đơn điện", LocalDate.now(), user, 500000);
        Bill waterBill = new Bill("Hóa đơn nước", LocalDate.now(), user, 100000);
        Bill phoneBill = new Bill("Điện thoại cố định", LocalDate.now(), user, 100000);
        billRepository.save(electricBill);
        billRepository.save(waterBill);
        billRepository.save(phoneBill);

        sendTokenViaEmail(user);
    }
    
    public void sendTokenViaEmail (User user) {
    	String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusHours(24);

        RegistrationUserToken regToken = new RegistrationUserToken();
        regToken.setToken(token);
        regToken.setUser(user);
        regToken.setExpiryDate(expiry);
        registrationUserTokenRepository.save(regToken);

        String verifyLink = "http://localhost:3000/verify?token=" + token;
        emailService.send(user.getEmail(), "Xác thực tài khoản",
                "Vui lòng nhấn vào link sau để kích hoạt tài khoản: " + verifyLink);
    }

    public ResponseEntity<?> verifyUser(String token) {

        RegistrationUserToken regToken = registrationUserTokenRepository.findByToken(token);
        if (regToken == null || regToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token không hợp lệ hoặc đã hết hạn!");
        }
        User user = userRepository.findById(regToken.getUser().getUserID()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User không tồn tại!");
        }
        user.setStatus(Status.ACTIVE);
        userRepository.save(user);
        registrationUserTokenRepository.delete(regToken);
        return ResponseEntity.ok("Kích hoạt tài khoản thành công!");
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<?> forgotPassword(String email) {
        User user = findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("Email không tồn tại!");
        }
        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(30);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(expiry);
        passwordResetTokenRepository.save(resetToken);

        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        emailService.send(user.getEmail(), "Đặt lại mật khẩu",
                "Nhấn vào link sau để đặt lại mật khẩu: " + resetLink);
        return ResponseEntity.ok("Đã gửi email đặt lại mật khẩu!");
    }

    public ResponseEntity<?> resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token không hợp lệ hoặc đã hết hạn!");
        }
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
        return ResponseEntity.ok("Đổi mật khẩu thành công!");
    }
}
