package com.project88.banking.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.project88.banking.dto.TranferDTO;
import com.project88.banking.entity.User;

public interface IUserService extends UserDetailsService {
    void registerUser(User user);
    void tranfer (TranferDTO form);
}
