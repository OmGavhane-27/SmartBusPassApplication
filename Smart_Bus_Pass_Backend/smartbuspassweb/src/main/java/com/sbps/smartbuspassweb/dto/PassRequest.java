package com.sbps.smartbuspassweb.dto;

import java.time.LocalDateTime;

public class PassRequest {
    private String passType;
    private LocalDateTime issueDate;
    private boolean isActive;
    private String qrCodeData;
    private String studentId; 
    private String aadharNumber;

    
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

    public String getStudentId() {
        return studentId;
    }
    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getAadharNumber() {
        return aadharNumber;
    }
    public void setAadharNumber(String aadharNumber) {
        this.aadharNumber = aadharNumber;
    }
	@Override
	public String toString() {
		return "PassRequest [passType=" + passType + ", issueDate=" + issueDate + ", isActive=" + isActive
				+ ", qrCodeData=" + qrCodeData + ", studentId=" + studentId + ", aadharNumber=" + aadharNumber + "]";
	}
    
    
}
