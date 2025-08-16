package com.sbps.smartbuspassweb.model;

import java.sql.Timestamp;
import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer payment_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "pass_id", nullable = false)
    private Pass pass;

    private Double amount;

    private String payment_method;

    private String transaction_id;

    private String payment_status;

    @Column(name = "payment_timestamp", insertable = false, updatable = false)
    private Timestamp payment_timestamp;

    public Payment() {}

    public Payment(User user, Pass pass, Double amount, String payment_method,
                   String transaction_id, String payment_status) {
        this.user = user;
        this.pass = pass;
        this.amount = amount;
        this.payment_method = payment_method;
        this.transaction_id = transaction_id;
        this.payment_status = payment_status;
    }

    public Integer getPayment_id() {
        return payment_id;
    }

    public void setPayment_id(Integer payment_id) {
        this.payment_id = payment_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Pass getPass() {
        return pass;
    }

    public void setPass(Pass pass) {
        this.pass = pass;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public Timestamp getPayment_timestamp() {
        return payment_timestamp;
    }

    public void setPayment_timestamp(Timestamp payment_timestamp) {
        this.payment_timestamp = payment_timestamp;
    }

	@Override
	public String toString() {
		return "Payment [payment_id=" + payment_id + ", user=" + user + ", pass=" + pass + ", amount=" + amount
				+ ", payment_method=" + payment_method + ", transaction_id=" + transaction_id + ", payment_status="
				+ payment_status + ", payment_timestamp=" + payment_timestamp + "]";
	}

	
    
}
