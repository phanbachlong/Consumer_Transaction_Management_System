package com.project88.banking.dto;

import com.project88.banking.entity.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllEmployeesDTO {
    private long userID;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private int cardNumber;
    private Status status;

}
