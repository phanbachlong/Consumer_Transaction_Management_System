package com.project88.banking.dto;

import java.time.LocalDate;

import com.project88.banking.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private LocalDate birth;
    private String avatarUrl;
    private String cccd;
    private String phone;
    private String gender;

    public User toEntity() {
        return new User(firstName, lastName, username, email, gender, cccd, phone, birth, avatarUrl);
    }

}
