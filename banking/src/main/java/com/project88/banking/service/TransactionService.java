package com.project88.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project88.banking.dto.TransactionHistoryDTO;
import com.project88.banking.dto.filter.TransactionFilter;
import com.project88.banking.repository.ITransactionRepository;

@Service
public class TransactionService implements ITransactionService {

    @Autowired
    private ITransactionRepository transactionRepository;

    @Override
    public Page<TransactionHistoryDTO> getTransaction(String username, Pageable pageable, TransactionFilter filter) {
        Page<TransactionHistoryDTO> transactionHistoryDTO = transactionRepository.findByUsername(username,
                filter.getStartDate(), filter.getEndDate(), filter.getName(),
                pageable);
        return transactionHistoryDTO;
    }

}
