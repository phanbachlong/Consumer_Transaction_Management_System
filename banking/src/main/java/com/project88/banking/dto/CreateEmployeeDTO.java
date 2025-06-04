package com.project88.banking.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateEmployeeDTO {
    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String gender;

    private String phone;

    private String cccd;

    private String password;

    private String role = "Employee";

}
