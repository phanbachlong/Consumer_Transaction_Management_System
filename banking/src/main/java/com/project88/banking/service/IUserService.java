package com.project88.banking.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.project88.banking.dto.TransferDTO;
import com.project88.banking.entity.User;

public interface IUserService extends UserDetailsService {
    void registerUser(User user);
    void transfer (TransferDTO form);
	String findUserByCardNumber(int cardNumber);
	User findUserById(short id);
}
