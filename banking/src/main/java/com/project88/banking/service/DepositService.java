package com.project88.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project88.banking.dto.DepositDTO;
import com.project88.banking.entity.Deposit;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IDepositRepository;
import com.project88.banking.repository.IUserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DepositService implements IDepositService {

	@Autowired
	private IDepositRepository depositRepository;
	
	@Autowired
	private IUserRepository userRepository;

	@Override
	public void createDeposit(DepositDTO form, Long userId) {
		User user = userRepository.getUserById(userId);
		Deposit deposit = new Deposit(form.getDepositName(),form.getInterest(),user ,form.getDepositAmount());
		
		depositRepository.save(deposit);
	}
}
