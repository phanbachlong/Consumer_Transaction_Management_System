package com.project88.banking.repository;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.dto.GetAllUserDTO;
import com.project88.banking.dto.ProfileDTO;
import com.project88.banking.entity.User;
import org.springframework.data.jpa.repository.Modifying;

public interface IUserRepository extends JpaRepository<User, Long> {

    @Query("SELECT c.user FROM CardNumber c WHERE c.cardNumber = :cardNumber")
    User findUserByCardNumber(@Param("cardNumber") Integer cardNumber);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.balance = u.balance + :amount WHERE u.cccd = :cccd")
    int updateBalanceByCCCD(String cccd, int amount);

    @Query("SELECT new com.project88.banking.dto.ProfileDTO(u.firstName, u.lastName,u.username, u.email, u.birth, u.avatarUrl, u.cccd, u.phone, u.gender) FROM User u WHERE u.userID = :userID")
    ProfileDTO findByID(@Param("userID") Long userID);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findByUsername(@Param("username") String username);

    @Query("SELECT u FROM User u WHERE u.userID = :userId")
    User getUserById(@Param("userId") Long userId);

    @Query("SELECT new com.project88.banking.dto.GetAllUserDTO(u.userID, CONCAT(u.firstName, ' ', u.lastName), u.email, u.phone, c.cardNumber) FROM User u JOIN u.cardNumber c ")
    Page<GetAllUserDTO> findAllUsers(Pageable pageable);

    @Modifying
    @Query("UPDATE User u SET u.balance = u.balance + :amount WHERE u.userID = :userId")
    void topUp(@Param("userId") Short userId, @Param("amount") Integer amount);
}
