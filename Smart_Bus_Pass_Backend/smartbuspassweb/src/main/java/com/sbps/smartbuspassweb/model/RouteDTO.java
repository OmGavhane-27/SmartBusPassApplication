package com.sbps.smartbuspassweb.model;

public class RouteDTO {
    private Integer routeId;
    private String routeNumber;
    private String source;
    private String destination;
    private Double distanceKm;
    private String timings; 

    public Integer getRouteId() {
        return routeId;
    }
    public void setRouteId(Integer routeId) {
        this.routeId = routeId;
    }
    
    public String getRouteNumber() { return routeNumber; } 
    public void setRouteNumber(String routeNumber) { this.routeNumber = routeNumber; } 
    
    public String getSource() {
        return source;
    }
    public void setSource(String source) {
        this.source = source;
    }
    
    public String getDestination() {
        return destination;
    }
    public void setDestination(String destination) {
        this.destination = destination;
    }
    
    public Double getDistanceKm() {
        return distanceKm;
    }
    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }
    
    public String getTimings() { return timings; } 
    public void setTimings(String timings) { this.timings = timings; } 
}
