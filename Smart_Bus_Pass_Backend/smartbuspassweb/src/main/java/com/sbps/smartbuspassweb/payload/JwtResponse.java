package com.sbps.smartbuspassweb.payload;

public class JwtResponse {
    private String token;
    private String username;
    private String role;
    private Integer userId;  
	private String fname;

    public JwtResponse(String token, String username, String role, Integer userId, String name) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.userId = userId;
        this.fname = name;
        
    }

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getUserId() {  
        return userId;
    }

    public void setUserId(Integer userId) { 
        this.userId = userId;
    }
}
