package com.project88.banking.repository;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project88.banking.dto.TransactionHistoryDTO;
import com.project88.banking.entity.TransactionHistory;

public interface ITransactionRepository extends JpaRepository<TransactionHistory, Long> {
        @Query("SELECT new com.project88.banking.dto.TransactionHistoryDTO(t.createDate, t.transType, t.content, t.fee, t.endBalance) "
                        + "FROM TransactionHistory t WHERE t.user.userID = :userID AND (:startDate IS NULL OR t.createDate >= :startDate) "
                        + "AND (:endDate IS NULL OR t.createDate <= :endDate) ORDER BY t.createDate DESC")
        public Page<TransactionHistoryDTO> findByUserID(@Param("userID") long userID,
                        @Param("startDate") LocalDate startDate,
                        @Param("endDate") LocalDate endDate, Pageable pageable);
}
