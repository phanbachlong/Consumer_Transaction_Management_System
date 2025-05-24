package com.project88.banking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TopUpDTO {
	private Short userID;
	private Integer money; 
}
