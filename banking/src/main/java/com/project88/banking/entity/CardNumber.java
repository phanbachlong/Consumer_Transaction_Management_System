package com.project88.banking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="`card_number`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardNumber {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "card_number")
	private Integer cardNumber;

	@OneToOne
	@JoinColumn(name ="user_id", referencedColumnName = "user_id")
	@JsonIgnore
	private User user;
}
