package com.project88.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.project88.banking.entity.User;

@Repository
public interface IEmployeeRepository extends JpaRepository<User, Short>, JpaSpecificationExecutor<User> {

}
