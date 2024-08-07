package com.example.taskmanager.backend.controller;

import com.example.taskmanager.backend.model.TaskAssignment;
import com.example.taskmanager.backend.service.TaskAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-assignments")
public class TaskAssignmentController {

    @Autowired
    private TaskAssignmentService taskAssignmentService;

    @PostMapping
    public TaskAssignment createTaskAssignment(@RequestBody TaskAssignment taskAssignment) {
        return taskAssignmentService.saveTaskAssignment(taskAssignment);
    }

    @GetMapping("/{id}")
    public TaskAssignment getTaskAssignmentById(@PathVariable Long id) {
        return taskAssignmentService.getTaskAssignmentById(id);
    }

    @GetMapping
    public List<TaskAssignment> getAllTaskAssignments() {
        return taskAssignmentService.getAllTaskAssignments();
    }

    @PutMapping("/{id}")
    public TaskAssignment updateTaskAssignment(@PathVariable Long id, @RequestBody TaskAssignment taskAssignmentDetails) {
        TaskAssignment taskAssignment = taskAssignmentService.getTaskAssignmentById(id);
        if (taskAssignment != null) {
            taskAssignment.setTask(taskAssignmentDetails.getTask());
            taskAssignment.setUser(taskAssignmentDetails.getUser());
            // Update other fields as necessary
            return taskAssignmentService.saveTaskAssignment(taskAssignment);
        } else {
            throw new RuntimeException("TaskAssignment not found with id " + id);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteTaskAssignment(@PathVariable Long id) {
        TaskAssignment taskAssignment = taskAssignmentService.getTaskAssignmentById(id);
        if (taskAssignment != null) {
            taskAssignmentService.deleteTaskAssignment(id);
            return "TaskAssignment deleted with id " + id;
        } else {
            throw new RuntimeException("TaskAssignment not found with id " + id);
        }
    }
}
