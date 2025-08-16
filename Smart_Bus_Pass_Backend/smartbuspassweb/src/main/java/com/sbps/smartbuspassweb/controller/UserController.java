package com.sbps.smartbuspassweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbps.smartbuspassweb.Services.UserService;
import com.sbps.smartbuspassweb.model.User;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    @Autowired private UserService userService;
    
    @PostMapping 
    public User create(@RequestBody User user) { 
    	return userService.createUser(user); 
    	}
    
    @GetMapping("/{id}") 
    public User get(@PathVariable int id) { 
    	return userService.getUserById(id); 
    	}
    
    @GetMapping("/getAllUsers")
    public List<User> list() {
    	return userService.getAllUsers(); 
    	}
    
    @PutMapping("/{id}") 
    public String update(@PathVariable int id, @RequestBody User user) { 
    	return userService.updateUser(id, user); 
    	}
    
    @DeleteMapping("/{id}") 
    public void delete(@PathVariable int id) { 
    	userService.deleteUser(id); 
    	}
}
