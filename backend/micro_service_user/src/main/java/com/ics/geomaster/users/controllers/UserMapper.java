package com.ics.geomaster.users.controllers;

import com.ics.geomaster.users.models.User;
import com.ics.geomaster.users.models.UserDTO;

public class UserMapper {
    public static UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getBalance());
    }
}
