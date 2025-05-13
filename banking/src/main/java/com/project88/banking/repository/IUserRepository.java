package com.project88.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project88.banking.entity.User;

public interface IUserRepository extends JpaRepository<User, Short> {

}
