package com.project88.banking.controller;

import com.project88.banking.entity.Gender;
import com.project88.banking.entity.Role;
import com.project88.banking.entity.User;
import com.project88.banking.model.ChangePasswordRequest;
import com.project88.banking.model.LoginRequest;
import com.project88.banking.model.RegisterRequest;
import com.project88.banking.repository.UserRepository;
import com.project88.banking.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tài khoản đã tồn tại"));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAvatarUrl(request.getAvatarUrl());

        if (request.getRole() != null) {
            user.setRole(request.getRole());
        } else {
            user.setRole(Role.USER);
        }

        if (request.getGender() != null) {
            user.setGender(request.getGender());
        } else {
            user.setGender(Gender.MALE);
        }

        user.setStatus((short) 1);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Đăng ký thành công"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            String accessToken = jwtTokenUtil.generateToken(user.getUsername());
            String refreshToken = jwtTokenUtil.generateRefreshToken(user.getUsername());

            return ResponseEntity.ok(Map.of(
                    "accessToken", accessToken,
                    "refreshToken", refreshToken,
                    "role", user.getRole().name()
            ));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Sai username hoặc password"));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        if (refreshToken != null && jwtTokenUtil.validateRefreshToken(refreshToken)) {
            String username = jwtTokenUtil.getUsernameFromToken(refreshToken);
            String newAccessToken = jwtTokenUtil.generateToken(username);
            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Refresh token không hợp lệ hoặc đã hết hạn"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);

            return userRepository.findByUsername(username)
                    .map(user -> {
                        Map<String, Object> data = new HashMap<>();
                        data.put("id", user.getUserID());
                        data.put("username", user.getUsername());
                        data.put("role", user.getRole().name());
                        data.put("email", user.getEmail());
                        data.put("avatarUrl", user.getAvatarUrl());
                        data.put("firstName", user.getFirstName());
                        data.put("lastName", user.getLastName());
                        data.put("gender", user.getGender().name());
                        return ResponseEntity.ok(data);
                    })
                    .orElseGet(() -> ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy người dùng")));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Không xác thực được người dùng"));
    }

    @PostMapping("/secure/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            HttpServletRequest httpServletRequest) {

        String authHeader = httpServletRequest.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String username = jwtTokenUtil.getUsernameFromToken(token);

            Optional<User> userOpt = userRepository.findByUsername(username);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                if (passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    userRepository.save(user);
                    return ResponseEntity.ok(Map.of("message", "Đổi mật khẩu thành công"));
                } else {
                    return ResponseEntity.badRequest().body(Map.of("error", "Mật khẩu cũ không đúng"));
                }
            }
        }

        return ResponseEntity.status(401).body(Map.of("error", "Không xác thực được người dùng"));
    }

    @GetMapping("/secure/info")
    public ResponseEntity<?> secureInfo() {
        return ResponseEntity.ok("Chào mừng! Bạn đã xác thực thành công bằng JWT.");
    }
}
