package com.sbps.smartbuspassweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.sbps.smartbuspassweb.Services.RazorpayService;
import com.sbps.smartbuspassweb.model.Pass;
import com.sbps.smartbuspassweb.model.Payment;
import com.sbps.smartbuspassweb.model.User;
import com.sbps.smartbuspassweb.repository.PassRepository;
import com.sbps.smartbuspassweb.repository.PaymentRepo;
import com.sbps.smartbuspassweb.repository.UserRepository;


@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {
	
	@Autowired
	private RazorpayService service;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PassRepository passRepository;
	@Autowired
	private PaymentRepo paymentRepo;
	
	@Value("${razorpay.api.key}")
	private String apikey;
	
	@Value("${razorpay.api.secret}")
	private String apisecret;
	
    @PostMapping("/createPayment")
    public ResponseEntity<String> savePayment(@RequestBody Payment paymentDto) {
    	System.out.println("payyyyyyyyy");
        try {
        	System.out.println("tryyyy");
        	System.out.println(paymentDto);
            User user = userRepository.findById(paymentDto.getUser().getUser_id()).orElseThrow();
            
            Pass pass = passRepository.findById(paymentDto.getPass().getPassId()).orElseThrow();
            System.out.println("tryyyy2");
            Payment payment = new Payment(
                    user,
                    pass,
                    paymentDto.getAmount(),
                    paymentDto.getPayment_method(),
                    paymentDto.getTransaction_id(),
                    paymentDto.getPayment_status()
            );

            System.out.println(payment);
            paymentRepo.save(payment);
            return ResponseEntity.ok("Payment saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save payment");
        }
    }

	
	@GetMapping("/getPaymentById/{id}")
	public Payment getPaymentDetail(@PathVariable Integer id){
		return service.getPaymentDetailsById(id);
	}
	
	@GetMapping("{id}")
	public List<Payment> getPaymentByUserId(@PathVariable Integer id){
		return service.getAllPaymentByUserId(id);
	}
	
	@PostMapping("/create-order")
	public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
		System.out.print("payment me hu guys");
	    RazorpayClient razorpay = new RazorpayClient(apikey, apisecret);

	    JSONObject orderRequest = new JSONObject();
	    orderRequest.put("amount", data.get("amount")); 
	    orderRequest.put("currency", "INR");

	    Order order = razorpay.orders.create(orderRequest);

	    Map<String, Object> response = new HashMap<>();
	    response.put("id", order.get("id"));
	    response.put("amount", order.get("amount"));
	    System.out.println(response);
	    return ResponseEntity.ok(response);
	}

	
}
