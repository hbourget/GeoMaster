package com.ics.geomaster.users.controllers;

import com.ics.geomaster.users.models.User;
import com.ics.geomaster.users.models.UserDTO;
import com.ics.geomaster.users.models.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private UserMapper userMapper = new UserMapper();

    public UserDTO getUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            UserDTO userDto = userMapper.toDTO(userOptional.get());
            return userDto;
        } else {
            return null;
        }
    }

    public UserDTO getUserByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            UserDTO userDto = userMapper.toDTO(userOptional.get());
            return userDto;
        } else {
            return null;
        }
    }

    public Object getUserAuthById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            return null;
        }
    }

    public Object getUserAuthByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            return null;
        }
    }

    public List<UserDTO> getUsers() {
        Iterable<User> users = userRepository.findAll();
        List<UserDTO> usersDTO = new ArrayList<>();
        for (User user : users) {
            usersDTO.add(userMapper.toDTO(user));
        }
        return usersDTO;
    }

    public User saveUser(User user) {
        user.setBalance(0);
        userRepository.save(user);
        return user;
    }


    public UserDTO updateUser(int id, User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            userToUpdate.setUsername(user.getUsername());
            userToUpdate.setPassword(user.getPassword());
            userRepository.save(userToUpdate);
            return userMapper.toDTO(userToUpdate);
        } else {
            return null;
        }
    }

    public boolean deleteUser(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userToDelete = userOptional.get();
            userRepository.delete(userToDelete);
            return true;
        } else {
            return false;
        }
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    public UserDTO addBalance(Integer id, Integer balance) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            userToUpdate.setBalance(userToUpdate.getBalance() + balance);
            userRepository.save(userToUpdate);
            return userMapper.toDTO(userToUpdate);
        } else {
            return null;
        }
    }

    public UserDTO removeBalance(Integer id, Integer balance) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            userToUpdate.setBalance(userToUpdate.getBalance() - balance);
            userRepository.save(userToUpdate);
            return userMapper.toDTO(userToUpdate);
        } else {
            return null;
        }
    }
}
