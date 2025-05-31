package com.project88.banking.entity;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Table(name = "`deposit`")
@Entity
public class Deposit {

	@Id
	@Column(name = "deposit_Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int depositId;
	
	@Column(name = "deposit_name")
	private String depositName;
	
	@Column(name = "createDate")
	private LocalDate createDate;
	
	@Column(name = "interest")
	private float interest;
	
	@ManyToOne
	@JoinColumn(name =  "user_id")
	private User user;
	
	@Column(name = "deposit_amount")
	private int depositAmount;
	
	public Deposit(String depositName,float interest,User user, int depositAmount) {
		this.depositName = depositName;
		this.interest = interest;
		this.user = user;
		this.depositAmount = depositAmount;
	}
}
