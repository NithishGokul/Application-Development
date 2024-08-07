package com.example.taskmanager.backend.model;



import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    // Constructors, getters, and setters
    public Task() {
    }

    public Task(String title, String description, LocalDate dueDate, String status, User assignedTo) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.assignedTo = assignedTo;
    }

    public void setUser(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setUser'");
    }

    // Getters and Setters
    // ...
}
