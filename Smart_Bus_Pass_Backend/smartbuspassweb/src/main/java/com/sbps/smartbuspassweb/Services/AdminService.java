package com.sbps.smartbuspassweb.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbps.smartbuspassweb.model.Admin;
import com.sbps.smartbuspassweb.repository.AdminRepository;


@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Integer id) {
        return adminRepository.findById(id);
    }

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Integer id, Admin updatedAdmin) {
        return adminRepository.findById(id).map(admin -> {
            admin.setUsername(updatedAdmin.getUsername());
            admin.setPassword(updatedAdmin.getPassword());
            admin.setEmail(updatedAdmin.getEmail());
            return adminRepository.save(admin);
        }).orElseGet(() -> {
            updatedAdmin.setAdminId(id);
            return adminRepository.save(updatedAdmin);
        });
    }

    public void deleteAdmin(Integer id) {
        adminRepository.deleteById(id);
    }
}
