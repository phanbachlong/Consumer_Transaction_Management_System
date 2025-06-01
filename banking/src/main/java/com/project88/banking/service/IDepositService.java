package com.project88.banking.service;

import com.project88.banking.dto.DepositDTO;

public interface IDepositService {

	void createDeposit(DepositDTO form, short userId);

}
