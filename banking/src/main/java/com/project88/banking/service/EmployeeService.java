package com.project88.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project88.banking.dto.TopUpDTO;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IEmployeeRepository;

@Service
public class EmployeeService implements IEmployeeService {

	@Autowired
	private IEmployeeRepository employeeRepository;
	
	@Override
	public void topUp(TopUpDTO form) {
		short userID = form.getUserID();
		int money = form.getMoney();
		User u = employeeRepository.findById(userID).orElseThrow(() ->
			new IllegalArgumentException("User không tồn tại: " + userID)
				);
		int oldBalance = u.getBalance();
		u.setBalance(oldBalance + money);
		employeeRepository.save(u);
	}

}
