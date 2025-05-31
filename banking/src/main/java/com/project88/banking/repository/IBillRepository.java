package com.project88.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.entity.Bill;
import com.project88.banking.entity.User;

public interface IBillRepository extends JpaRepository<Bill, Integer> {

	@Query("Select b FROM Bill b WHERE b.user.userID = :userId")
	List<Bill> findBillByUserId(@Param("userId") short userId);
    
    @Query("SELECT b.user FROM Bill b WHERE b.billId = :billId")
    User findUserByBillId(@Param("billId") int billId);
}
