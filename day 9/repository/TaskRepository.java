package com.example.taskmanager.backend.repository;

import com.example.taskmanager.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
