package com.project88.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllEmployeesDTO {
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private int cardNumber;

}
