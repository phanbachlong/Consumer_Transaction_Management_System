package com.project88.banking.repository;

import com.project88.banking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Short> {
    Optional<User> findByUsername(String username);
}
