package com.sbps.smartbuspassweb.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbps.smartbuspassweb.model.Admin;
import com.sbps.smartbuspassweb.model.User;
import com.sbps.smartbuspassweb.payload.AdminLoginRequest;
import com.sbps.smartbuspassweb.payload.JwtResponse;
import com.sbps.smartbuspassweb.payload.LoginRequest;
import com.sbps.smartbuspassweb.payload.SignupRequest;
import com.sbps.smartbuspassweb.repository.AdminRepository;
import com.sbps.smartbuspassweb.repository.UserRepository;
import com.sbps.smartbuspassweb.security.JwtTokenProvider;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenProvider jwtTokenProvider;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AdminRepository adminRepo;

    @GetMapping("/")
    public String home() {
    	System.out.println("helloo world");
    	return "hello world";
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    	 System.out.println("hellloooooo");
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        System.out.println("hellloooooo1");
        String token = jwtTokenProvider.generateToken(authentication);
        System.out.println(token);
        System.out.println("helloooo2");
        User u = userRepository.findByEmail(request.getEmail()).get();
    	return ResponseEntity.ok(new JwtResponse(token, request.getEmail(), "USER",u.getUser_id(), u.getName()));
        
    }

    @PostMapping("/adminlogin")
	public ResponseEntity<?> adminlogin(@RequestBody LoginRequest request) {
    	System.out.println("udit admin ");
    	System.out.println(request.getEmail());
    	System.out.println(request.getPassword());
	    Authentication authentication = authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
	    );
	    System.out.println("Om admin ");
	    String token = jwtTokenProvider.generateToken(authentication);
	    System.out.println("Generated Admin Token: " + token);

	    Admin admin = adminRepo.findByEmail(request.getEmail()).orElse(null);
	    if (admin == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    }
	    System.out.println(admin.toString());
	    return ResponseEntity.ok(new JwtResponse(token, request.getEmail(), "ADMIN", admin.getAdminId(), admin.getUsername()));
	}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        User user = new User();
        
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone_number(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setDob(request.getDob());
        user.setAddress(request.getAddress());
        user.setAadharNumber(request.getAadharNumber());
        user.setStudentId(request.getStudentId());
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
    
}