package com.example.taskmanager.backend.controller;

import com.example.taskmanager.backend.model.User;
import com.example.taskmanager.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<User>> getAlluser() {
        List<User> users = userService.getAlluser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("/{email}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{email}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User userDetails) {
    Optional<User> userOptional = userService.getUserByEmail(email);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());  // Only if password change is allowed
        user.setRole(userDetails.getRole());
        User updatedUser = userService.updateUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}


     @DeleteMapping("/{email}")
     @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
     public ResponseEntity<Void> deleteUser(@PathVariable String email) {
         Optional<User> userOptional = userService.getUserByEmail(email);
         if (userOptional.isPresent()) {
             userService.deleteUser(userOptional.get().getId());
             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
         } else {
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
     }

}