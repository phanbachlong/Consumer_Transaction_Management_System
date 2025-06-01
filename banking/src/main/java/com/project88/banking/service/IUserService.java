package com.project88.banking.service;

import com.project88.banking.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;



import com.project88.banking.dto.ChangeProfileDTO;
import com.project88.banking.dto.ProfileDTO;
import com.project88.banking.dto.TransferDTO;
import com.project88.banking.entity.Bill;
import com.project88.banking.entity.User;

public interface IUserService extends UserDetailsService {
    void registerUser(User user);

//    User getUserByCCCD(String cccd);
//
//    User addBalance(String cccd, int amount);

    ProfileDTO getProfile(Long userID);

    void changeUserProfile(String username, ChangeProfileDTO dto);

    void transfer (TransferDTO form);

	String findUserByCardNumber(int cardNumber);

    //them user (phan minh)
    User createUser(CreateUserDTO createUserDTO);

    //chinh sua user (phan minh)
    User updateUser(Long userId, UpdateUserDTO updateUserDTO);

    //lay thong tin user theo userId (phan minh)
    User getUserById(Long userId);

    //hien thị toan bo employee (phan minh)
    Page<User> getAllUsers(int page, int size);
    User findUserById(short id);

	
}
