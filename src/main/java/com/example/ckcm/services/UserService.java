package com.example.ckcm.services;

import com.example.ckcm.entities.User;
import com.example.ckcm.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    public Optional<User> getUserdetails(String token){
        String email = jwtService.extractUsername(token);
        return userRepository.findByEmail(email);
    }
}
