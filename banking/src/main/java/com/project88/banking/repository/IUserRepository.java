package com.project88.banking.repository;

import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;

import com.project88.banking.entity.User;

public interface IUserRepository extends JpaAttributeConverter<Integer, User> {

}
