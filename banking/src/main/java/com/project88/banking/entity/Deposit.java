package com.project88.banking.entity;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`deposit`")
@Entity
public class Deposit {

	@Id
	@Column(name = "deposit_Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int depositId;
	
	@Column(name = "deposit_name", nullable = false, length = 100)
	private String depositName;
	
	@Column(name = "createDate", nullable = false)
	private LocalDate createDate;
	
	@Column(name = "interest_rate", nullable = false)
    private float interestRate;
    
    @Column(name = "term_months", nullable = false)
    private int termMonths; //1, 3, 6, 12
    
    @Column(name = "transaction_id", unique = true, length = 50)
    private String transactionId;
	
	@ManyToOne
	@JoinColumn(name =  "user_id", nullable = false)
	private User user;
	
	@Column(name = "deposit_amount", nullable = false)
	private int depositAmount;
	
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private DepositStatus status = DepositStatus.ACTIVE;
	
	public Deposit(String depositName,float interestRate,User user, int depositAmount, int termMonths) {
		this.depositName = depositName;
		this.interestRate = interestRate;
		this.user = user;
		this.depositAmount = depositAmount;
        this.termMonths = termMonths;
	}
	
	@PrePersist
    protected void onCreate() {
        this.createDate = LocalDate.now();
        this.status = DepositStatus.ACTIVE;
        this.transactionId = "TRANS-" + System.currentTimeMillis() + "-" + 
                String.format("%04d", (int)(Math.random() * 10000));
	}
	
}

