package com.project88.banking.controller;

import org.springframework.web.bind.annotation.RestController;

import com.project88.banking.dto.TransactionHistoryDTO;
import com.project88.banking.dto.filter.TransactionFilter;
import com.project88.banking.security.CustomUserDetails;
import com.project88.banking.service.ITransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(value = "/api/v1/transaction")
public class TransactionController {

        @Autowired
        private ITransactionService transactionService;

        @GetMapping()
        public ResponseEntity<?> getTransactionHistory(Authentication authentication,
                        @PageableDefault(size = 10, sort = "createDate", direction = Direction.DESC) Pageable pageable,
                        TransactionFilter filter) {

                String username = authentication.getName();
                Page<TransactionHistoryDTO> transactionHistoryDTO = transactionService.getTransaction(username,
                                pageable,
                                filter);

                return new ResponseEntity<>(transactionHistoryDTO, HttpStatus.OK);
        }
}
