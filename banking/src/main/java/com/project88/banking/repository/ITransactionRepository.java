package com.project88.banking.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.dto.TransactionHistoryDTO;
import com.project88.banking.entity.TransactionHistory;

public interface ITransactionRepository extends JpaRepository<TransactionHistory, Long> {
        @Query("SELECT new com.project88.banking.dto.TransactionHistoryDTO(t.createDate, t.transType, t.content, t.fee, t.endBalance) "
                        + "FROM TransactionHistory t WHERE t.user.username = :username AND (:startDate IS NULL OR t.createDate >= :startDate) "
                        + "AND (:endDate IS NULL OR t.createDate <= :endDate) AND (:name IS NULL OR t.content LIKE CONCAT('%', :name, '%'))")
        Page<TransactionHistoryDTO> findByUsername(@Param("username") String username,
                        @Param("startDate") LocalDateTime startDate,
                        @Param("endDate") LocalDateTime endDate,
                        @Param("name") String name, Pageable pageable);

        @Query("SELECT new com.project88.banking.dto.TransactionHistoryDTO(t.createDate, t.transType, t.content, t.fee, t.endBalance) "
                        + "FROM TransactionHistory t WHERE t.user.id = :userID AND (:startDate IS NULL OR t.createDate >= :startDate) "
                        + "AND (:endDate IS NULL OR t.createDate <= :endDate) AND (:name IS NULL OR t.content LIKE CONCAT('%', :name, '%'))")
        Page<TransactionHistoryDTO> findTransactionByUserID(@Param("userID") long userID,
                        @Param("startDate") LocalDateTime startDate,
                        @Param("endDate") LocalDateTime endDate,
                        @Param("name") String name, Pageable pageable);
}
