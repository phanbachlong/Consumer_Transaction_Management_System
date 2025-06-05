package com.project88.banking.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistoryDTO {

    private LocalDateTime createDate;
    private String transType;
    private String content;
    private int fee;
    private int endBalance;

}
