package com.project88.banking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TopUpDTO {
	private Long userID;
	private Integer money; 
}
