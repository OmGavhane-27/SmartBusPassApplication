package com.sbps.smartbuspassweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sbps.smartbuspassweb.model.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment,Integer> {

	@Query(value = "select * from payments where user_id=:id",nativeQuery = true)
	public  List<Payment> getAllPaymentByUserId(@Param("id") Integer id);
}
