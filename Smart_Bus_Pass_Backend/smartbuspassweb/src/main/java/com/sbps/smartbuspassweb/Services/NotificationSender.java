package com.sbps.smartbuspassweb.Services;

import org.springframework.stereotype.Service;

@Service
public class NotificationSender {
	 public void send(String to, String subject, String message) {
	
	        System.out.println("[NOTIFICATION] Email to " + to + " | Subject: " + subject + " | Message: " + message);
	       
	    }
}
