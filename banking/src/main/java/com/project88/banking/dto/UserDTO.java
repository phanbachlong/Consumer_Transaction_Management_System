package com.project88.banking.dto;

import com.project88.banking.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String username;

    private String email;

    private String firstName;

    private String lastName;

    private String gender;

    private String password;

    public User toEntity() {
        return new User(firstName, lastName, username, email, gender, password);
    }

}
