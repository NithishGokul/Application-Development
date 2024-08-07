package com.example.taskmanager.backend.controller;

import com.example.taskmanager.backend.model.User;
import com.example.taskmanager.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userService.getUserById(id);
        if (user != null) {
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setEmail(userDetails.getEmail());
            user.setUsername(userDetails.getUsername());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole()); // Update role
            // Update other fields as necessary
            return userService.saveUser(user);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            userService.deleteUser(id);
            return "User deleted with id " + id;
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }
}
