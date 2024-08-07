package com.example.taskmanager.backend.model;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String bio;

    // Constructors, getters, and setters
    public Profile() {
    }

    public Profile(User user, String bio) {
        this.user = user;
        this.bio = bio;
    }

    // Getters and Setters
    // ...
}
