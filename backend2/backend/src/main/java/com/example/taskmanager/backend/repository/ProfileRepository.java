package com.example.taskmanager.backend.repository;

import com.example.taskmanager.backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
