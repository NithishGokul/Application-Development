package com.example.taskmanager.backend.repository;
import com.example.taskmanager.backend.model.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssigneeEmail(String assigneeEmail);
}