package com.project88.banking.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.project88.banking.dto.ChangeProfileDTO;
import com.project88.banking.dto.ProfileDTO;
import com.project88.banking.dto.TranferDTO;

import com.project88.banking.entity.User;

public interface IUserService extends UserDetailsService {
    void registerUser(User user);


    User getUserByCCCD(String cccd);

    User addBalance(String cccd, int amount);

    ProfileDTO getProfile(short userID);

    void changeUserProfile(String username, ChangeProfileDTO dto);

    void transfer (TransferDTO form);
	String findUserByCardNumber(int cardNumber);
	User findUserById(short id);
}
