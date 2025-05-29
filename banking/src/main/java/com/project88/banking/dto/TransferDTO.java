package com.project88.banking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TransferDTO {

	private Long senderID;
	private Integer cardNumber;
	private Integer money;
	private String content;
}
