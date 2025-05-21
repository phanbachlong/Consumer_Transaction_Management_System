package com.project88.banking.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.project88.banking.dto.TransactionHistoryDTO;
import com.project88.banking.dto.filter.TransactionFilter;

public interface ITransactionService {

    Page<TransactionHistoryDTO> getTransaction(short userID, Pageable pageable, TransactionFilter filter);
}
