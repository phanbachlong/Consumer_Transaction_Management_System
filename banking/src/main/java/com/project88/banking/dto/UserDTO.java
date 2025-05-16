package com.project88.banking.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project88.banking.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String cccd;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;
    private String gender;
    private String password;

    // public User toEntity() {
    // return new User(firstName, lastName, username, email, gender, cccd, birth,
    // password);
    // }

    public User toEntity() {
        return User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .username(username)
                .email(email)
                .gender(gender)
                .cccd(cccd)
                .birth(birth)
                .password(password)
                .build();
    }
}
