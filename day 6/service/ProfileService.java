package com.example.backend.taskmanager.service;

import com.example.backend.taskmanager.model.Profile;
import com.example.backend.taskmanager.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Optional<Profile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }

    public Profile updateProfile(Long id, Profile updatedProfile) {
        if (profileRepository.existsById(id)) {
            updatedProfile.setId(id);
            return profileRepository.save(updatedProfile);
        }
        return null; // Or throw an exception if profile not found
    }

    public void deleteProfile(Long id) {
        profileRepository.deleteById(id);
    }
}
