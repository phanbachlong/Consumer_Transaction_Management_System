package com.project88.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project88.banking.entity.CardNumber;
import com.project88.banking.repository.ICardRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CardService implements ICardService {

    @Autowired
    private ICardRepository cardRepository;

    @Override
    public CardNumber createCard(CardNumber cardNumber) {
        // TODO Auto-generated method stub
        return null;
    }
}
