package com.sbps.smartbuspassweb.Services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbps.smartbuspassweb.dto.PassRequest;
import com.sbps.smartbuspassweb.dto.PassWithRouteDTO;
import com.sbps.smartbuspassweb.model.Pass;
import com.sbps.smartbuspassweb.model.QRCodeUtil;
import com.sbps.smartbuspassweb.model.Route;
import com.sbps.smartbuspassweb.model.User;
import com.sbps.smartbuspassweb.repository.PassRepository;
import com.sbps.smartbuspassweb.repository.RouteRepository;
import com.sbps.smartbuspassweb.repository.UserRepository;

@Service

public class PassServiceImpl implements PassService {
    @Autowired private PassRepository passRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private RouteRepository routeRepo;

    public Pass issuePass(Integer userId, String src, String dst, PassRequest passRequest) {
    	int routeId;
    	 Route route;
    	System.out.println(passRequest);
        User user = userRepo.findById(userId).orElseThrow();
        user.setStudentId(passRequest.getStudentId());
        if(src=="NA"&& dst=="NA") {
        	 routeId = 0;
        	 route = null;
        }
        else {
        	System.out.println("Hello src and dst"+ src+  " " + dst );
         routeId = routeRepo.findbysrcdst(src, dst);
         System.out.println("Hello Route Id"+ routeId);
         route = routeRepo.findById(routeId).orElseThrow();
        }
       
        String passType = passRequest.getPassType();

        if ("Student Pass".equalsIgnoreCase(passType)) {
            if (user.getStudentId() == null || user.getStudentId().isBlank()) {
                throw new IllegalArgumentException("Student ID is required for Student Pass");
            }
        }

        if ("Senior Citizen Pass".equalsIgnoreCase(passType)) {
            if (user.getAadharNumber() == null || user.getAadharNumber().isBlank()) {
                throw new IllegalArgumentException("Aadhar Card is required for Senior Citizen Pass");
            }
            int age = calculateAgeFromDob(user.getDob());
            if (age < 60) {
                throw new IllegalArgumentException("User is not eligible for Senior Citizen Pass (Age < 60)");
            }
        }

        Pass pass = new Pass();
        pass.setUser(user);
        pass.setRoute(route);
        pass.setPassType(passType);
      
        LocalDateTime today = passRequest.getIssueDate();
        if (today == null) today = LocalDateTime.now();

        pass.setIssueDate(today);
        pass.setExpiryDate(calculateExpiryDate(passType, today));
        pass.setActive(true);
        passRepo.save(pass);
        try {
        	String qrlink = "http://192.168.1.25:8080/api/passes/download/"+pass.getPassId();
        	pass.setQrCodeData(QRCodeUtil.generateBase64QRCode(qrlink, 250));
          
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return passRepo.save(pass);
    }


    public List<PassWithRouteDTO> findByUser(int userId) {
        List<Pass> passes = passRepo.findByUser_id(userId);
        return passes.stream().map(pass -> {
            return new PassWithRouteDTO(
                pass.getPassId(),
                pass.getPassType(),
                pass.getIssueDate(),
                pass.getExpiryDate(),
                pass.isActive(),
                pass.getQrCodeData(),
                pass.getRoute().getSource(),
                pass.getRoute().getDestination(),
                pass.getRoute().getDistanceKm()
            );
        }).collect(Collectors.toList());
    }
    
    public List<PassWithRouteDTO> findByUserAndActive(int userId, boolean active){
    	 List<Pass> passes = passRepo.findByUserIdAndIsActive(userId, active);
         return passes.stream().map(pass -> {
             return new PassWithRouteDTO(
                 pass.getPassId(),
                 pass.getPassType(),
                 pass.getIssueDate(),
                 pass.getExpiryDate(),
                 pass.isActive(),
                 pass.getQrCodeData(),
                 pass.getRoute().getSource(),
                 pass.getRoute().getDestination(),
                 pass.getRoute().getDistanceKm()
             );
         }).collect(Collectors.toList());
    }

    public List<Pass> getAllPasses() { return passRepo.findAll(); }
    public Pass getPassById(int id) { return passRepo.findById(id).orElseThrow(); }

    private int calculateAgeFromDob(String dob) {
        LocalDate birthDate = LocalDate.parse(dob); // Ensure dob is in 'yyyy-MM-dd' format
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
    
    public void deletePass(Integer id) {
        passRepo.deleteById(id);
    }

    private LocalDateTime calculateExpiryDate(String passType, LocalDateTime issueDate) {
        switch (passType.toUpperCase()) {
            case "DAILY PASS": return issueDate.plusDays(1);
            case "MONTHLY PASS":return issueDate.plusDays(30);
            case "STUDENT PASS": return issueDate.plusDays(30);
            case "SENIOR CITIZEN PASS": return issueDate.plusDays(60);
            default: throw new IllegalArgumentException("Invalid pass type: " + passType);
        }
    }

	

	

}
