package com.example.taskmanager.backend.controller;
import com.example.taskmanager.backend.model.TaskAssignment;
import com.example.taskmanager.backend.service.TaskAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/task-assignments")
public class TaskAssignmentController {

    @Autowired
    private TaskAssignmentService taskAssignmentService;

    @GetMapping
    public List<TaskAssignment> getAllTaskAssignments() {
        return taskAssignmentService.getAllTaskAssignments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskAssignment> getTaskAssignmentById(@PathVariable Long id) {
        Optional<TaskAssignment> taskAssignment = taskAssignmentService.getTaskAssignmentById(id);
        return taskAssignment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public TaskAssignment createTaskAssignment(@RequestBody TaskAssignment taskAssignment) {
        return taskAssignmentService.saveTaskAssignment(taskAssignment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskAssignment> updateTaskAssignment(@PathVariable Long id, @RequestBody TaskAssignment updatedTaskAssignment) {
        Optional<TaskAssignment> existingTaskAssignment = taskAssignmentService.getTaskAssignmentById(id);
        if (existingTaskAssignment.isPresent()) {
            TaskAssignment taskAssignment = existingTaskAssignment.get();
            taskAssignment.setAssignedTo(updatedTaskAssignment.getAssignedTo());
            taskAssignment.setTask(updatedTaskAssignment.getTask());
            taskAssignment.setStatus(updatedTaskAssignment.getStatus());
            return ResponseEntity.ok(taskAssignmentService.saveTaskAssignment(taskAssignment));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskAssignment(@PathVariable Long id) {
        Optional<TaskAssignment> taskAssignment = taskAssignmentService.getTaskAssignmentById(id);
        if (taskAssignment.isPresent()) {
            taskAssignmentService.deleteTaskAssignment(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}