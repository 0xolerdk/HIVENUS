package com.hivenus.back_end.service;

import com.hivenus.back_end.entity.User;
import com.hivenus.back_end.dto.UserDto;



import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findUserByEmail(String email);

    List<UserDto> findAllUsers();
}
