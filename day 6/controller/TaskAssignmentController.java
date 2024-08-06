package com.example.backend.taskmanager.controller;

import com.example.backend.taskmanager.model.TaskAssignment;
import com.example.backend.taskmanager.service.TaskAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/task-assignments")
public class TaskAssignmentController {

    @Autowired
    private TaskAssignmentService taskAssignmentService;

    @PostMapping
    public ResponseEntity<TaskAssignment> createTaskAssignment(@RequestBody TaskAssignment taskAssignment) {
        TaskAssignment createdTaskAssignment = taskAssignmentService.createTaskAssignment(taskAssignment);
        return new ResponseEntity<>(createdTaskAssignment, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskAssignment> getTaskAssignmentById(@PathVariable Long id) {
        Optional<TaskAssignment> taskAssignment = taskAssignmentService.getTaskAssignmentById(id);
        return taskAssignment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskAssignment> updateTaskAssignment(@PathVariable Long id, @RequestBody TaskAssignment updatedTaskAssignment) {
        TaskAssignment taskAssignment = taskAssignmentService.updateTaskAssignment(id, updatedTaskAssignment);
        return taskAssignment != null ? ResponseEntity.ok(taskAssignment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskAssignment(@PathVariable Long id) {
        taskAssignmentService.deleteTaskAssignment(id);
        return ResponseEntity.noContent().build();
    }
}
