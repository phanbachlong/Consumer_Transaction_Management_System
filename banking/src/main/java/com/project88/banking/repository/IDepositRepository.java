package com.project88.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project88.banking.entity.Deposit;
import com.project88.banking.entity.DepositStatus;
import com.project88.banking.entity.User;

public interface IDepositRepository extends JpaRepository<Deposit, Integer> {

    List<Deposit> findByUser(User user);

	List<Deposit> findByUserAndStatus(User user, DepositStatus depositStatus);
}
