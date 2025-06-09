package com.project88.banking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.entity.Deposit;
import com.project88.banking.entity.DepositStatus;
import com.project88.banking.entity.User;

public interface IDepositRepository extends JpaRepository<Deposit, Integer> {

    List<Deposit> findByUser(User user);

    List<Deposit> findByUserAndStatus(User user, DepositStatus depositStatus);

    @Query("SELECT d FROM Deposit d WHERE d.user.username = :username AND d.status = 'ACTIVE'")
    List<Deposit> findByUserNameActive(@Param("username") String username);

}
