package com.project88.banking.dto.filter;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionFilter {
    private LocalDate startDate;
    private LocalDate endDate;
}
