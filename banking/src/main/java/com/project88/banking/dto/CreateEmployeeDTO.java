package com.project88.banking.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.project88.banking.entity.User;

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

    private LocalDate birth;

    private String password;

    private String role;

    public User toEntity() {
        return new User(firstName, lastName, username, email, gender, phone, cccd, birth, password, role);
    }

}
