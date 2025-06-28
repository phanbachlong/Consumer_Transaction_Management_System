package com.project88.banking.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`user`")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;

    @Column(name = "`firstName`", nullable = false, length = 50)
    private String firstName;

    @Column(name = "`lastName`", nullable = false, length = 50)
    private String lastName;

    @Column(name = "`username`", nullable = false, length = 50, unique = true)
    private String username;

    @Column(name = "`email`", nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "phone", length = 10, unique = true)
    private String phone;

    @Column(name = "cccd", length = 12, nullable = false)
    private String cccd;

    @Column(name = "balance", nullable = false)
    private int balance = 0;

    @Column(name = "birth", nullable = true)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;

    @Column(name = "`password`", nullable = false, length = 800)
    private String password;

    @Column(name = "role", nullable = false)
    private String role = "User";

    @Column(name = "status")
    @Enumerated(value = EnumType.ORDINAL)
    private Status status = Status.NOT_ACTIVE;

    @Column(name = "avatarUrl")
    private String avatarUrl;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private List<TransactionHistory> transactionHistories;

    @OneToOne(mappedBy = "user")
    private CardNumber cardNumber;

    public User(String firstName, String lastName, String username, String email, String gender, String cccd,
            LocalDate birth, String password, String phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.cccd = cccd;
        this.birth = birth;
        this.password = password;
        this.phone = phone;
    }

    public User(String firstName, String lastName, String username, String email, String gender, String cccd,
            String phone, LocalDate birth, String avatarUrl) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.cccd = cccd;
        this.phone = phone;
        this.birth = birth;
        this.avatarUrl = avatarUrl;
    }

    public User(String firstName, String lastName, String username, String email, String gender, String phone,
            String cccd, LocalDate birth, String password, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.phone = phone;
        this.cccd = cccd;
        this.birth = birth;
        this.password = password;
        this.role = role;
    }

}
