package com.project88.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project88.banking.entity.User;
import com.project88.banking.repository.IUserRepository;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    @Override
    public User getUserByCCCD(String cccd) {
        return userRepository.findByCccd(cccd);
    }

    @Override
    public User addBalance(String cccd, int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        int updated = userRepository.updateBalanceByCCCD(cccd, amount);
        if (updated == 0) {
            return null; // không tìm thấy CCCD
        }

        return userRepository.findByCccd(cccd); // trả lại user sau khi update
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        return null;
    }
}
