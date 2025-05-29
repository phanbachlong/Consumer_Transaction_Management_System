package com.project88.banking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO {

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String gender;

    private String phone;

    private String cccd;

    private String password;
}
