package com.project88.banking.entity;

import java.io.Serializable;
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
@Table(name = "`transaction_history`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "`trans_id`")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short transID;

    @Column(name = "createDate", updatable = false, insertable = false)
    private LocalDate createDate;

    @Column(name = "transType", nullable = false)
    private String transType;

    @Column(name = "content", length = 800)
    private String content;

    @ManyToOne
    @JoinColumn(name = "`user_id`")
    private User user;

    @Column(name = "fee", nullable = false)
    private int fee;

    public TransactionHistory(LocalDate createDate, String transType, String content, int fee) {
        this.createDate = createDate;
        this.transType = transType;
        this.content = content;
        this.fee = fee;
    }

}
