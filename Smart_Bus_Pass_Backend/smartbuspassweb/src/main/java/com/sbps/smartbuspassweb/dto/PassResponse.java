package com.sbps.smartbuspassweb.dto;

import java.time.LocalDateTime;


public class PassResponse {

	private Integer passId;
    private String passType;
    private LocalDateTime issueDate, expiryDate;
    private boolean isActive;
    private String qrCodeData;

    private Integer userid;
    private Integer routeid;
    
    

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

	public Integer getUserId() {
		return userid;
	}

	public void setUserId(Integer user) {
		this.userid = user;
	}

	public Integer getRouteId() {
		return routeid;
	}

	public void setRouteId(Integer route) {
		this.routeid = route;
	}
}
