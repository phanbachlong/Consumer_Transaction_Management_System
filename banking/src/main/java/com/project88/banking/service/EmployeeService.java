package com.project88.banking.service;

import com.project88.banking.dto.CreateEmployeeDTO;
import com.project88.banking.dto.GetAllEmployeesDTO;
import com.project88.banking.dto.UpdateEmployeeDTO;
import com.project88.banking.dto.UpdateStatusEmployeeDTO;
import com.project88.banking.dto.filter.EmployeeFilter;
import com.project88.banking.entity.Status;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project88.banking.dto.TopUpDTO;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IEmployeeRepository;

import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService {

	@Autowired
	private IEmployeeRepository employeeRepository;

	@Override
	public void topUp(TopUpDTO form) {
		Long userID = form.getUserID();
		int money = form.getMoney();
		User u = employeeRepository.findById((long) userID)
				.orElseThrow(() -> new IllegalArgumentException("User không tồn tại: " + userID));
		int oldBalance = u.getBalance();
		u.setBalance(oldBalance + money);
		employeeRepository.save(u);
	}

	// lay thon tin cac employee (phan minh)
	@Override
	public Page<GetAllEmployeesDTO> getAllEmployees(int page, int size, EmployeeFilter filter) {
		Pageable pageable = PageRequest.of(page, size); // page - 1 vì Pageable bắt đầu từ 0
		return employeeRepository.getAllEmployees(pageable, filter.getName());
	}

	// lay thon tin cac employee da bi xoa (phan minh)
	@Override
	public Page<User> getDeletedEmployeeList(int page, int size) {
		Pageable pageable = PageRequest.of(page - 1, size); // page - 1 vì Pageable bắt đầu từ 0
		return employeeRepository.getDeletedEmployeeList(pageable);
	}

	// lay thong tin employee theo userId (phan minh)
	@Override
	public User getEmployeeById(Long userId) {
		return employeeRepository.findEmployeeById(userId);
	}

	// update employee (phan minh)
	@Override
	public User updateEmployee(Long userId, UpdateEmployeeDTO dto) {
		Optional<User> optionalUser = employeeRepository.findById(userId);

		if (!optionalUser.isPresent()) {
			throw new RuntimeException("User not found"); // Ném ngoại lệ nếu không tìm thấy tài khoản
		}
		User user = optionalUser.get();
		user.setUsername(dto.getUserName());
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setEmail(dto.getEmail());
		user.setGender(dto.getGender());
		user.setPhone(dto.getPhone());
		user.setCccd(dto.getCccd());
		user.setBirth(dto.getBirth());
		user.setPassword(dto.getPassword());
		user.setRole(dto.getRole());
		user.setStatus(Status.valueOf(dto.getStatus()));
		user.setAvatarUrl(dto.getAvatarUrl());

		return employeeRepository.save(user);
	}

	// them employee (phan minh)
	@Override
	public User createEmployee(CreateEmployeeDTO dto) {
		User user = new User();
		user.setUsername(dto.getUsername());
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setEmail(dto.getEmail());
		user.setGender(dto.getGender());
		user.setPhone(dto.getPhone());
		user.setCccd(dto.getCccd());
		user.setRole(dto.getRole());
		user.setPassword(dto.getPassword());

		return employeeRepository.save(user);
	}

	@Override
	public User updateStatus(Long userId, UpdateStatusEmployeeDTO request) {
		User user = employeeRepository.findById(userId)
				.orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng với ID: " + userId));

		user.setStatus(request.getStatus());
		return employeeRepository.save(user);
	}

	@Override
	public void deleteEmployee(Long userId) {
		var existingGroups = employeeRepository.findById(userId);
		if (existingGroups.isEmpty()) {
			throw new RuntimeException("Employee not found");
		}
		employeeRepository.delete(existingGroups.get());
	}

}
