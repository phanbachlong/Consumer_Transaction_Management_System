package com.project88.banking.service;

import java.util.List;

import com.project88.banking.entity.Bill;

public interface IBillService {

	List<Bill> findBillByUserId(Long userId);

	void payBill(int billId);
}
