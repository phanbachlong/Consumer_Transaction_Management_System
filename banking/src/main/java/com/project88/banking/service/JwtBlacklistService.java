package com.project88.banking.service;

import com.project88.banking.entity.JwtBlacklist;
import com.project88.banking.repository.JwtBlacklistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class JwtBlacklistService {
    @Autowired
    private JwtBlacklistRepository repository;

    public void blacklistToken(String token, LocalDateTime expiryDate) {
        JwtBlacklist jwtBlacklist = new JwtBlacklist();
        jwtBlacklist.setToken(token);
        jwtBlacklist.setExpiryDate(expiryDate);
        repository.save(jwtBlacklist);
    }

    public boolean isBlacklisted(String token) {
        return repository.existsByToken(token);
    }
}