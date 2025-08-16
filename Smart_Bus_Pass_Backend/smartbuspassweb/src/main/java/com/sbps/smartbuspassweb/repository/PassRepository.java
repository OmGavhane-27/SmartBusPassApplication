package com.sbps.smartbuspassweb.repository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sbps.smartbuspassweb.model.Pass;

@Repository
public interface PassRepository extends JpaRepository<Pass, Integer> {
	
	@Query("select p from Pass p where p.user.user_id=:userId")
    List<Pass> findByUser_id(@Param("userId") Integer userId);
	
	@Query("SELECT p FROM Pass p WHERE p.expiryDate = :targetDate AND p.isActive = true")
    List<Pass> findExpiringPasses(@Param("targetDate") LocalDate targetDate);
    
    @Query("SELECT p FROM Pass p WHERE p.expiryDate BETWEEN :start AND :end AND p.isActive = true")
    List<Pass> findPassesExpiringBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT p FROM Pass p WHERE p.expiryDate = :targetTime AND p.isActive = true")
    List<Pass> findPassesExpiringAt(@Param("targetTime") LocalDateTime targetTime);
    
    @Query(value="select * from passes where user_id=:id and is_active=1",nativeQuery = true)
    List<Pass> AllActivePassesByUser(@Param("id")Integer id);
    

    @Query(value="SELECT * FROM passes WHERE expiry_date < ? AND is_active = 1",nativeQuery=true)
    List<Pass> findByValidToBeforeAndIsActive(LocalDate currentDate);
    
    @Query("SELECT p FROM Pass p WHERE p.user.id = :userId AND p.isActive = :isActive")
    List<Pass> findByUserIdAndIsActive(@Param("userId") Integer userId, @Param("isActive") boolean isActive);

}