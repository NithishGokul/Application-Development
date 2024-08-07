package com.example.taskmanager.backend.repository;

import com.example.taskmanager.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Fetch user by email
    User findByUsername(String username); // Fetch user by username
}
