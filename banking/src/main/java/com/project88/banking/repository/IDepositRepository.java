package com.project88.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project88.banking.entity.Deposit;

public interface IDepositRepository extends JpaRepository<Deposit, Integer> {
	
	

}
