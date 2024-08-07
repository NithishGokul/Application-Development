package com.example.taskmanager.backend.controller;

import com.example.taskmanager.backend.model.Profile;
import com.example.taskmanager.backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {
        return profileService.saveProfile(profile);
    }

    @GetMapping("/{id}")
    public Profile getProfileById(@PathVariable Long id) {
        return profileService.getProfileById(id);
    }

    @GetMapping
    public List<Profile> getAllProfiles() {
        return profileService.getAllProfiles();
    }

    @PutMapping("/{id}")
    public Profile updateProfile(@PathVariable Long id, @RequestBody Profile profileDetails) {
        Profile profile = profileService.getProfileById(id);
        if (profile != null) {
            profile.setBio(profileDetails.getBio());
            profile.setUser(profileDetails.getUser());
            // Update other fields as necessary
            return profileService.saveProfile(profile);
        } else {
            throw new RuntimeException("Profile not found with id " + id);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {
        Profile profile = profileService.getProfileById(id);
        if (profile != null) {
            profileService.deleteProfile(id);
            return "Profile deleted with id " + id;
        } else {
            throw new RuntimeException("Profile not found with id " + id);
        }
    }
}
