package com.sbps.smartbuspassweb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sbps.smartbuspassweb.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
	
	public Optional<Admin> findByEmail(String email);
	
	@Query(value="select * from admins where email =:email and password =:password",nativeQuery = true)
	public Optional<Admin> findByAdminIdAndPassword(String email,String password);
}
