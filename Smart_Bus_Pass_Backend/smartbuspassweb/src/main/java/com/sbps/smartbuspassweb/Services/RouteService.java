package com.sbps.smartbuspassweb.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbps.smartbuspassweb.model.Route;
import com.sbps.smartbuspassweb.repository.RouteRepository;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getRouteById(Integer id) {
        return routeRepository.findById(id);
    }

    public Route createRoute(Route route) {
        return routeRepository.save(route);
    }

    public Route updateRoute(Integer id, Route updatedRoute) {
        return routeRepository.findById(id).map(route -> {
            route.setRouteNumber(updatedRoute.getRouteNumber()); 
            route.setSource(updatedRoute.getSource());
            route.setDestination(updatedRoute.getDestination());
            route.setDistanceKm(updatedRoute.getDistanceKm()); 
            return routeRepository.save(route);
        }).orElseThrow(() -> new RuntimeException("Route not found"));
    }

    public void deleteRoute(Integer id) {
        routeRepository.deleteById(id);
    }
}
