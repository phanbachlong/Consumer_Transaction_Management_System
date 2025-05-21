package com.project88.banking.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistoryDTO {

    private LocalDate createDate;
    private String transType;
    private String content;
    private int fee;
    private int balance;

    // public TransactionHistory toEntity() {
    // return new TransactionHistory(transType, content, fee);
    // }
}
