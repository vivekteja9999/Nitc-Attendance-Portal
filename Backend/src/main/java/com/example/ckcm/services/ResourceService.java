package com.example.ckcm.services;

import com.example.ckcm.entities.Cycle;
import com.example.ckcm.entities.Key;
import com.example.ckcm.entities.User;
import com.example.ckcm.repositories.CycleBorrowRepository;
import com.example.ckcm.repositories.CycleRepository;
import com.example.ckcm.repositories.KeyRepository;
import com.example.ckcm.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResourceService {
    private final CycleRepository cycleRepository;
    private final KeyRepository keyRepository;
    private final UserRepository userRepository;
    public List<?> getAvailableResources(String email){
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isPresent()){
            User user = userOpt.get();
            if(user.getRole().name().equals("USER")){
                System.out.println("Data being fetched for user: "+email);
                return cycleRepository.findByStatus("Available");
            }
            else{
                System.out.println("Data being fetched for admin: "+email);
                List<Key> availableKeys = keyRepository.findByStatus("Available");
                List<Cycle> availableCycles = cycleRepository.findByStatus("Available");
                return List.of(availableKeys,availableCycles);
            }
        }
        return List.of();
    }
}
