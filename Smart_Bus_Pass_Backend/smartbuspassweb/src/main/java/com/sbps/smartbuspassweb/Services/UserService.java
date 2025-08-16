package com.sbps.smartbuspassweb.Services;

import java.util.List;
import com.sbps.smartbuspassweb.model.User;

public interface UserService {
    User createUser(User user);
    User getUserById(int id);
    List<User> getAllUsers();
    String updateUser(int id, User user);
    void deleteUser(int id);
}