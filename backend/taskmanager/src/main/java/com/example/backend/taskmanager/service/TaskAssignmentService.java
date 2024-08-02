package com.example.backend.taskmanager.service;

import com.example.backend.taskmanager.model.TaskAssignment;
import com.example.backend.taskmanager.repository.TaskAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskAssignmentService {

    @Autowired
    private TaskAssignmentRepository taskAssignmentRepository;

    public TaskAssignment createTaskAssignment(TaskAssignment taskAssignment) {
        return taskAssignmentRepository.save(taskAssignment);
    }

    public Optional<TaskAssignment> getTaskAssignmentById(Long id) {
        return taskAssignmentRepository.findById(id);
    }

    public TaskAssignment updateTaskAssignment(Long id, TaskAssignment updatedTaskAssignment) {
        if (taskAssignmentRepository.existsById(id)) {
            updatedTaskAssignment.setId(id);
            return taskAssignmentRepository.save(updatedTaskAssignment);
        }
        return null; // Or throw an exception if taskAssignment not found
    }

    public void deleteTaskAssignment(Long id) {
        taskAssignmentRepository.deleteById(id);
    }
}
