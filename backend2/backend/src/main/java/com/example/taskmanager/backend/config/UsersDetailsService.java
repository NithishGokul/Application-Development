package com.example.taskmanager.backend.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.taskmanager.backend.model.User;
import com.example.taskmanager.backend.repository.UserRepository;

@Component
public class UsersDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userInfo = repository.findByEmail(username);
        return userInfo.map(UsersDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

    }
}
