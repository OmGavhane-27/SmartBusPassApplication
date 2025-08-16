package com.sbps.smartbuspassweb.Services;

import java.util.List;

import com.sbps.smartbuspassweb.dto.PassRequest;
import com.sbps.smartbuspassweb.dto.PassWithRouteDTO;
import com.sbps.smartbuspassweb.model.Pass;


public interface PassService {

    Pass getPassById(int id);
    List<Pass> getAllPasses();
    List<PassWithRouteDTO> findByUser(int userId);
    
    List<PassWithRouteDTO> findByUserAndActive(int userId, boolean active);
    void deletePass(Integer id);
    Pass issuePass(Integer userId, String src,String dst, PassRequest pass);
}