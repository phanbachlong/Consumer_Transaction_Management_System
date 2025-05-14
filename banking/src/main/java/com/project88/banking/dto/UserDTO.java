package com.project88.banking.dto;

import com.project88.banking.entity.Gender;
import com.project88.banking.entity.User;

public class UserDTO {

    private String username;

    private String email;

    private String firstName;

    private String lastName;

    private Gender gender;

    public UserDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public User toEntity() {
        return new User(firstName, lastName, username, email, gender, email);
    }
}