package com.project88.banking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project88.banking.dto.ChangeProfileDTO;
import com.project88.banking.dto.GetAllUserDTO;
import com.project88.banking.dto.ProfileDTO;
import com.project88.banking.dto.TransferDTO;
import com.project88.banking.entity.Bill;
import com.project88.banking.entity.TransactionHistory;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IBillRepository;
import com.project88.banking.repository.ITransactionRepository;
import com.project88.banking.repository.IUserRepository;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class UserService implements IUserService {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private ITransactionRepository transactionRepository;

	@Autowired
	private IBillRepository billRepository;

	@Autowired
	private IDepositService depositService;

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
	public Page<GetAllUserDTO> findAllUsers(int size, int page) {
		Pageable pageable = PageRequest.of(page, size);
		return userRepository.findAllUsers(pageable);
	}

	@Override
	public void transfer(TransferDTO form) {
		int money = form.getMoney();
		User sender = userRepository.findById(form.getSenderID())
				.orElseThrow(
						() -> new IllegalArgumentException("User không tồn tại với userID: " + form.getSenderID()));
		User receiver = userRepository.findUserByCardNumber(form.getCardNumber());

		if (receiver == null) {
			throw new IllegalArgumentException("Người nhận không tồn tại!");
		}

		if (sender.getBalance() < money) {
			throw new IllegalStateException("Không đủ số dư!");
		}

		// Tiến hành giao dịch
		// Sender
		sender.setBalance(sender.getBalance() - money);
		String senderTransType = "CK";
		String senderContent = String.format("Chuyen Khoan den %s so tien %d", receiver.getFirstName(), money);
		TransactionHistory senderTrans = new TransactionHistory(senderTransType, senderContent, -money, sender);

		// Receiver
		receiver.setBalance(receiver.getBalance() + money);
		String receiverTransType = "CK";
		String receiverContent = String.format("Nhan tien tu %S so tien %d. Noi Dung: %s ", sender.getFirstName(),
				money, form.getContent());
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
		String name = u.getFirstName() + " " + u.getLastName();
		return name;
	}

	@Override
	public User findUserById(short id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("User không tồn tại với id = " + id));
		return user;
	}

	@Override
	public ProfileDTO getProfile(short userID) {
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

	@Override
	public User addBalance(String cccd, int amount) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User getUserByCCCD(String cccd) {
		// TODO Auto-generated method stub
		return null;
	}

}
