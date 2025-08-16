package com.sbps.smartbuspassweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartbuspasswebApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartbuspasswebApplication.class, args);
	}

}
