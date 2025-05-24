package com.project88.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project88.banking.dto.TranferDTO;
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
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void tranfer(TranferDTO form) {
		int money = form.getMoney();
		User sender = userRepository.findById(form.getSenderID())
				.orElseThrow(() -> new IllegalArgumentException("User không tồn tại với userID: " + form.getSenderID()));
		User receiver = userRepository.findUserByCardNumber(form.getCardNumber());
		
		if (receiver == null) {
	        throw new IllegalArgumentException("Người nhận không tồn tại!");
	    }

	    if (sender.getBalance() < money) {
	        throw new IllegalStateException("Không đủ số dư!");
	    }

	    // Tiến hành giao dịch
	    sender.setBalance(sender.getBalance() - money);
	    receiver.setBalance(receiver.getBalance() + money);

	    userRepository.save(sender);
	    userRepository.save(receiver);
		
	}
	
	
}
