package com.project88.banking.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEmployeeDTO {

    @JsonProperty("username")
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String phone;
    private String cccd;
    private LocalDate birth;
    private String role;
    private String password;
    private String status;
    private String avatarUrl;
}
