package com.project88.banking.service;

import com.project88.banking.dto.UserDTO;
import com.project88.banking.entity.Bill;
import com.project88.banking.entity.CardNumber;
import com.project88.banking.entity.RegistrationUserToken;
import com.project88.banking.entity.Status;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IBillRepository;
import com.project88.banking.repository.ICardRepository;
import com.project88.banking.repository.IUserRepository;
import com.project88.banking.repository.RegistrationUserTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public void registerUser(UserDTO userDTO) {
        User user = userDTO.toEntity();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        CardNumber cardNumber = new CardNumber();
        cardNumber.setUser(user);
        cardRepository.save(cardNumber);

        Bill electricBill = new Bill("Hóa đơn điện", LocalDate.now(), user,500000);
        Bill waterBill = new Bill("Hóa đơn nước", LocalDate.now(), user,100000);
        Bill phoneBill = new Bill("Điện thoại cố định", LocalDate.now(), user,100000);
        billRepository.save(electricBill);
        billRepository.save(waterBill);
        billRepository.save(phoneBill);   

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
}
