package com.sbps.smartbuspassweb.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbps.smartbuspassweb.model.Pass;
import com.sbps.smartbuspassweb.model.Payment;
import com.sbps.smartbuspassweb.model.User;
import com.sbps.smartbuspassweb.repository.PassRepository;
import com.sbps.smartbuspassweb.repository.PaymentRepo;
import com.sbps.smartbuspassweb.repository.UserRepository;

@Service
public class RazorpayService {
	
	@Autowired
	private PaymentRepo paymentRepo;
	
	public Payment getPaymentDetailsById(Integer id) {
		return paymentRepo.findById(id).get();
	}
	
	public List<Payment> getAllPaymentByUserId(Integer userId){
		return paymentRepo.getAllPaymentByUserId(userId);
	}
	
}
