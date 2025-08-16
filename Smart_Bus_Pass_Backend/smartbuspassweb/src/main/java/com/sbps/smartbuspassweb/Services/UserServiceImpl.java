package com.sbps.smartbuspassweb.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbps.smartbuspassweb.model.User;
import com.sbps.smartbuspassweb.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepo;

	public User createUser(User u) {
		return userRepo.save(u);
	}

	public User getUserById(int id) {
		return userRepo.findById(id).orElseThrow();
	}

	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	public String updateUser(int id, User user) {
		return userRepo.findById(id).map(u -> {
			u.setName(user.getName());
			u.setEmail(user.getEmail());
			u.setPassword(user.getPassword());
			u.setPhone_number(user.getPhone_number());
			u.setGender(user.getGender());
			u.setDob(user.getDob());
			u.setAddress(user.getAddress());
			u.setStudentId(user.getStudentId());
			u.setAadharNumber(user.getAadharNumber());
			userRepo.save(u);
			return "Updated";
		}).orElse("Invalid user");
	}

	public void deleteUser(int id) {
		userRepo.deleteById(id);
	}
}