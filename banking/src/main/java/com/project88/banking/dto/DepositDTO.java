package com.project88.banking.dto;

import java.time.LocalDate;

import com.project88.banking.entity.Deposit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepositDTO {

    private String accountName;
    private float interestRate;
    private int amount;
    private int term;
    private String transactionId;
    private long userId;
    private int depositId;
    private String status;
    private LocalDate createDate;

    public DepositDTO(Deposit deposit) {
        this.depositId = deposit.getDepositId();
        this.accountName = deposit.getDepositName();
        this.amount = deposit.getDepositAmount();
        this.interestRate = deposit.getInterestRate();
        this.term = deposit.getTermMonths();
        this.status = deposit.getStatus().toString();
        this.createDate = deposit.getCreateDate();
        this.transactionId = deposit.getTransactionId();
        this.userId = deposit.getUser().getUserID();
    }

    // Redeem Request
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RedeemRequestDTO {
        private LocalDate redeemDate;
        private Double interestAmount;
    }
}