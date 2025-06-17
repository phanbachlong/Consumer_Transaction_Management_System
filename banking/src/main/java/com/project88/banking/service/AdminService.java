package com.project88.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project88.banking.entity.Status;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IUserRepository;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private IUserRepository userRepository;

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
}
