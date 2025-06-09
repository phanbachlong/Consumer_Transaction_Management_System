package com.project88.banking.repository;

import com.project88.banking.entity.RegistrationUserToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationUserTokenRepository extends JpaRepository<RegistrationUserToken, Long> {
    RegistrationUserToken findByToken(String token);
}
