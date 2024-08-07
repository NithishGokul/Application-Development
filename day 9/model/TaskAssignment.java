package com.example.taskmanager.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "task_assignments")
public class TaskAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "task_id")
    private Task task;

    // Constructors, getters, and setters
    public TaskAssignment() {
    }

    public TaskAssignment(User user, Task task) {
        this.user = user;
        this.task = task;
    }

    // Getters and Setters
    // ...
}
