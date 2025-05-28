package com.project88.banking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTOv2 {

	private String firstName;
	private String lastName;
	private String username;
	private int balance;
	
}
