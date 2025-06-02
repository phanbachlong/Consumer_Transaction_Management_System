package com.project88.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllUserDTO {

    private long userID;
    private String fullName;
    private String email;
    private String phone;
    private int cardNumber;

}
