package com.sbps.smartbuspassweb.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbps.smartbuspassweb.Services.RouteService;
import com.sbps.smartbuspassweb.model.Admin;
import com.sbps.smartbuspassweb.model.Route;
import com.sbps.smartbuspassweb.model.RouteDTO;
import com.sbps.smartbuspassweb.repository.AdminRepository;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
    

    @GetMapping("/{id}")
    public Optional<Admin> getAdminById(@PathVariable Integer id) {
        return adminRepository.findById(id);
    }

    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
    	admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    @PutMapping("/{id}")
    public Admin updateAdmin(@PathVariable Integer id, @RequestBody Admin updatedAdmin) {
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

    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable Integer id) {
        adminRepository.deleteById(id);
    }
    
    
    @Autowired
    private RouteService routeService;

    
    @GetMapping("/routes")
    public ResponseEntity<List<RouteDTO>> getAllRoutes() {
    	System.out.println("In route controller");
        List<Route> routes = routeService.getAllRoutes();
        List<RouteDTO> routeDTOs = new ArrayList<>();
        
        for (Route route : routes) {
            routeDTOs.add(convertToDTO(route));
        }
        
        return new ResponseEntity<>(routeDTOs, HttpStatus.OK);
    }


    @GetMapping("/routes/{id}")
    public ResponseEntity<RouteDTO> getRouteById(@PathVariable Integer id) {
        return routeService.getRouteById(id)
                .map(route -> new ResponseEntity<>(convertToDTO(route), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/routes")
    public ResponseEntity<RouteDTO> createRoute(@RequestBody RouteDTO routeDTO) {
        Route route = convertToEntity(routeDTO);
        Route createdRoute = routeService.createRoute(route);
        return new ResponseEntity<>(convertToDTO(createdRoute), HttpStatus.CREATED);
    }

  
    @PutMapping("/routes/{id}")
    public ResponseEntity<RouteDTO> updateRoute(@PathVariable Integer id, @RequestBody RouteDTO routeDTO) {
        Route updatedRoute = convertToEntity(routeDTO);
        Route route = routeService.updateRoute(id, updatedRoute);
        return new ResponseEntity<>(convertToDTO(route), HttpStatus.OK);
    }

    @DeleteMapping("/routes/{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Integer id) {
        routeService.deleteRoute(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private RouteDTO convertToDTO(Route route) {
        RouteDTO dto = new RouteDTO();
        dto.setRouteId(route.getRouteId());
        dto.setRouteNumber(route.getRouteNumber());
        dto.setSource(route.getSource());
        dto.setDestination(route.getDestination());
        dto.setDistanceKm(route.getDistanceKm());
        return dto;
    }

   
    private Route convertToEntity(RouteDTO dto) {
        Route route = new Route();
        route.setRouteId(dto.getRouteId());
        route.setRouteNumber(dto.getRouteNumber());
        route.setSource(dto.getSource());
        route.setDestination(dto.getDestination());
        route.setDistanceKm(dto.getDistanceKm());
        return route;
    }
    
}