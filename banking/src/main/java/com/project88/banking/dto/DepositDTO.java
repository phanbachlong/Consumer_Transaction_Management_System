package com.project88.banking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DepositDTO {

	private String depositName;
	private float interest;
	private int depositAmount;
	
}
