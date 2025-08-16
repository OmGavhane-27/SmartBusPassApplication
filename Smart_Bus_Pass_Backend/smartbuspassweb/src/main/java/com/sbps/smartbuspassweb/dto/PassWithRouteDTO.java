package com.sbps.smartbuspassweb.dto;

import java.time.LocalDateTime;

public class PassWithRouteDTO {

    private Integer passId;
    private String passType;
    private LocalDateTime issueDate;
    private LocalDateTime expiryDate;
    private boolean active;
    private String qrCodeData;
    private String routeSource;
    private String routeDestination;
    private Double distanceKm;  

    public PassWithRouteDTO(Integer passId, String passType, LocalDateTime issueDate, LocalDateTime expiryDate,
                            boolean active, String qrCodeData, String routeSource, String routeDestination,
                            Double distanceKm) {  
        this.passId = passId;
        this.passType = passType;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
        this.active = active;
        this.qrCodeData = qrCodeData;
        this.routeSource = routeSource;
        this.routeDestination = routeDestination;
        this.distanceKm = distanceKm; 
    }


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
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getQrCodeData() {
        return qrCodeData;
    }

    public void setQrCodeData(String qrCodeData) {
        this.qrCodeData = qrCodeData;
    }

    public String getRouteSource() {
        return routeSource;
    }

    public void setRouteSource(String routeSource) {
        this.routeSource = routeSource;
    }

    public String getRouteDestination() {
        return routeDestination;
    }

    public void setRouteDestination(String routeDestination) {
        this.routeDestination = routeDestination;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }
}
