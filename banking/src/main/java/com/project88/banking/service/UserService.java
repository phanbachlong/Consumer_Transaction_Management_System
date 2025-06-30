package com.project88.banking.service;

import com.project88.banking.dto.*;
import com.project88.banking.dto.filter.UserFilter;
import com.project88.banking.security.CustomUserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.project88.banking.entity.CardNumber;
import com.project88.banking.entity.RegistrationUserToken;
import com.project88.banking.entity.Status;
import com.project88.banking.entity.TransactionHistory;
import com.project88.banking.entity.User;
import com.project88.banking.repository.ICardRepository;
import com.project88.banking.repository.ITransactionRepository;
import com.project88.banking.repository.IUserRepository;
import com.project88.banking.repository.RegistrationUserTokenRepository;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

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
	private ICardRepository cardRepository;

	@Autowired
	private RegistrationUserTokenRepository registrationUserTokenRepository;

	@Autowired
	private EmailService emailService;

	@Override
	public void registerUser(User user) {

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		CardNumber cardNumber = new CardNumber();
		cardNumber.setUser(user);
		cardRepository.save(cardNumber);

	}

	@Override
	public User findUserById(Long id) {
		User user = userRepository.findById((long) id)
				.orElseThrow(() -> new IllegalArgumentException("User không tồn tại với id = " + id));
		return user;
	}

	@Override
	public Page<GetAllUserDTO> findAllUsers(Pageable pageable, UserFilter filter, String username) {
		return userRepository.findAllUsers(pageable, filter.getName(), username);
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
		String senderContent = String.format("Chuyen Khoan den %s so tien %d",
				receiver.getFirstName() + " " + receiver.getLastName(), money);
		int newSenderBalance = sender.getBalance();
		TransactionHistory senderTrans = new TransactionHistory(senderTransType, senderContent, -money, sender,
				newSenderBalance);

		// Receiver
		receiver.setBalance(receiver.getBalance() + money);
		String receiverTransType = "CK";
		String receiverContent = String.format("Nhan tien tu %S so tien %d. Noi Dung: %s ",
				sender.getFirstName() + " " + sender.getLastName(),
				money, form.getContent());
		int newReceiverBalance = receiver.getBalance();
		TransactionHistory receiverTrans = new TransactionHistory(receiverTransType, receiverContent, money, receiver,
				newReceiverBalance);

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

	// @Override
	// public User getUserByCCCD(String cccd) {
	// // TODO Auto-generated method stub
	// return null;
	// }

	public ProfileDTO getProfile(String name) {
		return userRepository.findByUserName(name);
	}

	public String changeUserProfile(String username, MultipartFile file) throws IOException {

		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}

		// 1. Xóa ảnh cũ nếu có
		String oldAvatar = user.getAvatarUrl();
		if (oldAvatar != null) {
			Path oldFile = Paths.get("uploads").resolve(Paths.get(oldAvatar).getFileName());
			Files.deleteIfExists(oldFile);
		}
		String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
		Path path = Paths.get("uploads");

		Files.createDirectories(path);

		Path filePath = path.resolve(fileName);
		Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

		String newAvatarUrl = "/uploads/" + fileName;
		user.setAvatarUrl(newAvatarUrl);
		userRepository.save(user);

		return "/uploads/" + fileName;

	}

	public void topUpBalance(TopUpDTO dto) {
		Optional<User> userOptional = userRepository.findById(Long.valueOf(dto.getUserID()));
		if (userOptional.isEmpty()) {
			throw new RuntimeException("Không tìm thấy User " /* + dto.getUserID() */);
		}

		if (dto.getMoney() == null || dto.getMoney() <= 0) {
			throw new IllegalArgumentException("Số tiền phải > 0");
		}

		userRepository.topUp(dto.getUserID(), dto.getMoney());

		TransactionHistory trans = TransactionHistory.builder()
				.transType("NT")
				.content("Nạp tiền vào tài khoản")
				.fee(dto.getMoney())
				.endBalance(userOptional.get().getBalance() + dto.getMoney())
				.user(userOptional.get())
				.build();

		transactionRepository.save(trans);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}

		return new CustomUserDetails(user);
	}

	@Override
	public User findUserByUsername(String username) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return user;
	}

	@Override
	public boolean isEmailExists(String email) {
		return userRepository.existsByEmail(email);

	}

	@Override
	public boolean isPhoneExists(String phone) {
		return userRepository.existsByPhone(phone);
	}

	@Override
	public boolean isUsernameExists(String username) {
		return userRepository.existsByUsername(username);
	}

	@Override
	public boolean isCccdExists(String cccd) {
		return userRepository.existsByCccd(cccd);
	}

	@Override
	public void editUserByEmployee(long userID, EditUserDTO dto) {
		User user = userRepository.findByUserID(userID);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + userID);
		}

		if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
			if (user.getEmail() != dto.getEmail()) {
				user.setEmail(dto.getEmail());
				user.setStatus(Status.NOT_ACTIVE);
				String token = UUID.randomUUID().toString();
				LocalDateTime expiry = LocalDateTime.now().plusHours(24);

				RegistrationUserToken regToken = new RegistrationUserToken();
				regToken.setToken(token);
				regToken.setUser(user);
				regToken.setExpiryDate(expiry);
				registrationUserTokenRepository.save(regToken);

				String verifyLink = "http://localhost:3000/verify?token=" + token;
				emailService.send(user.getEmail(), "Xác thực tài khoản",
						"Vui lòng nhấn vào link sau để kích hoạt tài khoản: " + verifyLink);
			}
		}
		if (dto.getPhone() != null && !dto.getPhone().isEmpty()) {
			user.setPhone(dto.getPhone());
		}

		userRepository.save(user);

	}

}
