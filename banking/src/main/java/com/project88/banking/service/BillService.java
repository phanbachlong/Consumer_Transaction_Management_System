package com.project88.banking.service;

import java.util.List;

import com.project88.banking.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project88.banking.entity.TransactionHistory;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IBillRepository;
import com.project88.banking.repository.ITransactionRepository;
import com.project88.banking.repository.IUserRepository;


import jakarta.transaction.Transactional;

@Service
@Transactional
public class BillService implements IBillService {

	@Autowired
	private IBillRepository billRepository;
	
	@Autowired
	private ITransactionRepository transactionRepository;
	
	@Autowired
	private IUserRepository userRepository;
	
	@Override
	public List<Bill> findBillByUserId(short userId) {
		List<Bill> bills = billRepository.findBillByUserId(userId);
		return bills;
	}

	@Override
	public void payBill(int billId) {
//		ghi lịch sử giao dịch với userID của billid
		
		Bill bill = billRepository.findById(billId)
				.orElseThrow(
						() -> new IllegalArgumentException("Bill không tồn tại!"));
		String content = "Thanh toan hoa don: " + bill.getBillId() + " - " + bill.getBillName();
		int billAmount = bill.getBillAmount();
		User user = bill.getUser();
		int oldBalance = user.getBalance(); 
		if (oldBalance < billAmount) {
			throw new IllegalStateException("Không đủ số dư!");
		}
		int newBalance = oldBalance - billAmount;
		TransactionHistory trans = new TransactionHistory("HD",content,-billAmount,user,newBalance);
		user.setBalance(oldBalance - billAmount);
		
		transactionRepository.save(trans);
		userRepository.save(user);
		billRepository.delete(bill);
		
	}

}
