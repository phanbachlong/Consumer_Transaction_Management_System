package com.project88.banking.repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.dto.TransactionHistoryDTO;
import com.project88.banking.entity.TransactionHistory;

public interface ITransactionRepository extends JpaRepository<TransactionHistory, Short> {
    @Query("SELECT new com.project88.banking.dto.TransactionHistoryDTO(t.createDate, t.transType, t.content, t.fee, t.user.balance) "
            + "FROM TransactionHistory t WHERE t.user.userID = :userID AND (:startDate IS NULL OR t.createDate >= :startDate) "
            + "AND (:endDate IS NULL OR t.createDate <= :endDate)")
    public Page<TransactionHistoryDTO> findByUserID(@Param("userID") short userID,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate, Pageable pageable);
}
