package com.project88.banking.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BillDTO {

	private int billId;
	private int BillAmount;
	private String billName;
	private LocalDate createDate;
}
