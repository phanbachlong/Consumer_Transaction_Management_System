package com.project88.banking.service;

import com.project88.banking.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project88.banking.entity.TransactionHistory;
import com.project88.banking.entity.User;
import com.project88.banking.repository.ITransactionRepository;
import com.project88.banking.repository.IUserRepository;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Component
@Transactional
public class UserService implements IUserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ITransactionRepository transactionRepository;

    @Override
    public void registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(">>> Password: " + user.getPassword());
        System.out.println(">>> Password length: " + user.getPassword().length());
        userRepository.save(user);
    }
  
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void transfer(TransferDTO form) {
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
	    //Sender
	    sender.setBalance(sender.getBalance() - money);
	    String senderTransType = "CK";
	    String senderContent = String.format("Chuyen Khoan den %s so tien %d", receiver.getFirstName() ,money);
	    TransactionHistory senderTrans = new TransactionHistory(senderTransType, senderContent, - money, sender);
	    
	    //Receiver
	    receiver.setBalance(receiver.getBalance() + money);
	    String receiverTransType = "CK";
	    String receiverContent = String.format("Nhan tien tu %S so tien %d. Noi Dung: %s ", sender.getFirstName() ,money,form.getContent());
	    TransactionHistory receiverTrans = new TransactionHistory(receiverTransType, receiverContent, money, receiver);
	    
	    // luu vao database
	    userRepository.save(sender);
	    userRepository.save(receiver);
	    transactionRepository.save(senderTrans);
	    transactionRepository.save(receiverTrans);
		
	}
	
	@Override
	public String findUserByCardNumber(int cardNumber) {
		User u = userRepository.findUserByCardNumber(cardNumber);
		String name = u.getFirstName() + " " + u. getLastName();
		return name;
	}


	//them user (phan minh)
	@Override
	public User createUser(CreateUserDTO createUserDTO) {
		User user = new User();
		user.setFirstName(createUserDTO.getFirstName());
		user.setLastName(createUserDTO.getLastName());
		user.setUsername(createUserDTO.getUsername());
		user.setPassword(createUserDTO.getPassword());
		user.setEmail(createUserDTO.getEmail());
		user.setGender(createUserDTO.getGender());
		user.setPhone(createUserDTO.getPhone());
		user.setCccd(createUserDTO.getCccd());

		return userRepository.save(user);
	}

	//chinh sua user (phan minh)
	@Override
	public User updateUser(Long userId, UpdateUserDTO updateUserDTO) {
		Optional<User> optionalUser = userRepository.findById(userId);

		if (!optionalUser.isPresent()) {
			throw new RuntimeException("User not found"); // Ném ngoại lệ nếu không tìm thấy tài khoản
		}

		User user = optionalUser.get();
		user.setUsername(user.getUsername());
		user.setFirstName(updateUserDTO.getFirstName());
		user.setLastName(updateUserDTO.getLastName());
		user.setEmail(updateUserDTO.getEmail());
		user.setGender(updateUserDTO.getGender());
		user.setPhone(updateUserDTO.getPhone());
		user.setCccd(updateUserDTO.getCccd());
		user.setBirth(updateUserDTO.getBirth());
		user.setRole(updateUserDTO.getRole());
		user.setAvatarUrl(updateUserDTO.getAvatarUrl());

		return userRepository.save(user);
	}

	//lay thong tin user theo userId (phan minh)
	@Override
	public User getUserById(Long userId) {
		return userRepository.findByID(userId).toEntity();
	}

	@Override
    public ProfileDTO getProfile(Long userID) {
        return userRepository.findByID(userID);
    }

    @Override
    public void changeUserProfile(String username, ChangeProfileDTO dto) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        user.setAvatarUrl(dto.getAvatarUrl());
        userRepository.save(user);

    };


}