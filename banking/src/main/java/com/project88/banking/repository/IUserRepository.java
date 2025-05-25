package com.project88.banking.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface IUserRepository extends JpaRepository<User, Short> {

	@Query("SELECT c.user FROM CardNumber c WHERE c.cardNumber = :cardNumber")
	User findUserByCardNumber(@Param("cardNumber") Integer cardNumber);
	
    User findByCccd(String cccd);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.balance = u.balance + :amount WHERE u.cccd = :cccd")
    int updateBalanceByCCCD(String cccd, int amount);
}
