package com.example.ckcm.controller;

import com.example.ckcm.entities.User;
import com.example.ckcm.repositories.CycleRepository;
import com.example.ckcm.repositories.UserRepository;
import com.example.ckcm.services.ResourceService;
import com.example.ckcm.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/userDashboard")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserDashboardController {
    private final UserRepository userRepository;
    private final ResourceService resourceService;
    @GetMapping("/available")
    public List<?> getAvailableResources(@RequestParam String email){
        System.out.println(resourceService.getAvailableResources(email));
        return resourceService.getAvailableResources(email);
    }
}
