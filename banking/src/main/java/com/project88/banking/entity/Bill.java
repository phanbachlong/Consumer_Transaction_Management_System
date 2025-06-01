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
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`bill`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "bill_Id")
	private int billId;

	@Column(name = "bill_name", length = 80, nullable = false)
	private String billName;

	@Column(name = "createDate")
	private LocalDate createDate;

	@ManyToOne
	@JoinColumn(name = "`user_id`")
	private User user;

	@Column(name = "bill_amount", nullable = false)
	private int BillAmount;
}
