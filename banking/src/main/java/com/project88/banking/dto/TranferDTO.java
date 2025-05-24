package com.project88.banking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TranferDTO {

	private short senderID;
	private Integer cardNumber;
	private Integer money;
}
