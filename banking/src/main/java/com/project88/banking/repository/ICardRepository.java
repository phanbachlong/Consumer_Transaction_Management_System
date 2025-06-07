package com.project88.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project88.banking.entity.CardNumber;

public interface ICardRepository extends JpaRepository<CardNumber, Integer> {
    // Define any custom query methods if needed

}
