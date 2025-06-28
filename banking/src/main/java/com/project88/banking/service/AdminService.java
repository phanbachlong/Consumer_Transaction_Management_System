package com.project88.banking.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project88.banking.dto.CreateEmployeeDTO;
import com.project88.banking.entity.CardNumber;
import com.project88.banking.entity.RegistrationUserToken;
import com.project88.banking.entity.Status;
import com.project88.banking.entity.User;
import com.project88.banking.repository.ICardRepository;
import com.project88.banking.repository.IUserRepository;
import com.project88.banking.repository.PasswordResetTokenRepository;
import com.project88.banking.repository.RegistrationUserTokenRepository;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ICardRepository cardRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RegistrationUserTokenRepository registrationUserTokenRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public void activeUser(long userID, String status) {
        User user = userRepository.findByUserID(userID);

        if (user == null) {

            throw new IllegalArgumentException("User not found with ID: " + userID);
        }
        Status st = Status.valueOf(status.toUpperCase());
        user.setStatus(st);
        userRepository.save(user);
    }

    @Override
    public void createEmployee(CreateEmployeeDTO createEmployeeDTO) {
        User employee = createEmployeeDTO.toEntity();
        employee.setPassword(passwordEncoder.encode("123456"));
        employee.setRole("Employee");

        userRepository.save(employee);

        CardNumber cardNumber = new CardNumber();
        cardNumber.setUser(employee);
        cardRepository.save(cardNumber);

        String token = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusHours(24);

        RegistrationUserToken regToken = new RegistrationUserToken();
        regToken.setToken(token);
        regToken.setUser(employee);
        regToken.setExpiryDate(expiry);
        registrationUserTokenRepository.save(regToken);

        String verifyLink = "http://localhost:3000/verify?token=" + token;
        emailService.send(employee.getEmail(), "Xác thực tài khoản",
                "Vui lòng nhấn vào link sau để kích hoạt tài khoản: " + verifyLink);

    }
}
