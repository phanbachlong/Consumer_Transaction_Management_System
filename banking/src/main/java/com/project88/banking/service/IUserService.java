package com.project88.banking.service;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.project88.banking.dto.ChangeProfileDTO;
import com.project88.banking.dto.GetAllUserDTO;
import com.project88.banking.dto.ProfileDTO;
import com.project88.banking.dto.TransferDTO;
import com.project88.banking.entity.Bill;
import com.project88.banking.entity.User;

public interface IUserService extends UserDetailsService {
    void registerUser(User user);

    User getUserByCCCD(String cccd);

    User addBalance(String cccd, int amount);

    ProfileDTO getProfile(short userID);

    void changeUserProfile(String username, ChangeProfileDTO dto);

    void transfer(TransferDTO form);

    String findUserByCardNumber(int cardNumber);

    User findUserById(short id);

    Page<GetAllUserDTO> findAllUsers(int size, int page);

}
