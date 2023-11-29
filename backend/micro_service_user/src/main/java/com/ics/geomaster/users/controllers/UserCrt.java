package com.ics.geomaster.users.controllers;

import com.ics.geomaster.users.models.User;
import com.ics.geomaster.users.models.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserCrt {
    @Autowired
    private UserService uService;

    @GetMapping("/users/{idOrUsername}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String idOrUsername) {
        UserDTO user;
        try {
            Integer id = Integer.parseInt(idOrUsername);
            user = uService.getUserById(id);
        } catch (NumberFormatException e) {
            user = uService.getUserByUsername(idOrUsername);
        }
        if (user == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> users = uService.getUsers();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(users);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Integer id, @RequestBody User user) {
        UserDTO updatedUser = uService.updateUser(id, user);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(updatedUser);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        boolean userDeleted = uService.deleteUser(id);
        if (userDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users")
    public ResponseEntity<Void> deleteUsers() {
        uService.deleteAllUsers();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users/auth/{idOrUsername}")
    public Object GetUserAuth(@PathVariable String idOrUsername) {
        try {
            Integer id = Integer.parseInt(idOrUsername);
            return uService.getUserAuthById(id);
        } catch (NumberFormatException e) {
            return uService.getUserAuthByUsername(idOrUsername);
        }
    }
    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }
        User createdUser = uService.saveUser(user);
        if (createdUser == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        }
    }

}