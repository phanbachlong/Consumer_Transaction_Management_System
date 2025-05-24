package com.project88.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.entity.User;

public interface IUserRepository extends JpaRepository<User, Short> {

	@Query("SELECT c.user FROM CardNumber c WHERE c.cardNumber = :cardNumber")
	User findUserByCardNumber(@Param("cardNumber") Integer cardNumber);
}
