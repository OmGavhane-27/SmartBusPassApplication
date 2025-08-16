package com.sbps.smartbuspassweb.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="passes")
public class Pass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer passId;
    private String passType;
    private LocalDateTime issueDate, expiryDate;
    @Column(name = "is_active")
    private boolean isActive;
    private String qrCodeData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id")
    @JsonIgnore
    private Route route;
    
    

	public Integer getPassId() {
		return passId;
	}

	public void setPassId(Integer passId) {
		this.passId = passId;
	}

	public String getPassType() {
		return passType;
	}

	public void setPassType(String passType) {
		this.passType = passType;
	}

	public LocalDateTime getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDateTime issueDate) {
		this.issueDate = issueDate;
	}

	public LocalDateTime getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDateTime expiryDate) {
		this.expiryDate = expiryDate;
	}

	public boolean isActive() {
		return isActive;
	}


	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getQrCodeData() {
		return qrCodeData;
	}

	public void setQrCodeData(String qrCodeData) {
		this.qrCodeData = qrCodeData;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Route getRoute() {
		return route;
	}

	public void setRoute(Route route) {
		this.route = route;
	}
    
}