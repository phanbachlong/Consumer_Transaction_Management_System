package com.project88.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project88.banking.entity.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
}
