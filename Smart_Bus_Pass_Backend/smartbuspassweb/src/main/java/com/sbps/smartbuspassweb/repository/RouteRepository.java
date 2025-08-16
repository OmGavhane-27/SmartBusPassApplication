package com.sbps.smartbuspassweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sbps.smartbuspassweb.model.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {

	
	@Query(value="select route_id from routes where source=:src and destination=:dst",nativeQuery = true)
	int findbysrcdst(@Param("src") String src,@Param("dst") String dst);
}