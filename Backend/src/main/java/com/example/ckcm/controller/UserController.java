package com.example.ckcm.controller;

import com.example.ckcm.entities.Role;
import com.example.ckcm.entities.User;
import com.example.ckcm.repositories.UserRepository;
import com.example.ckcm.services.JwtService;
import com.example.ckcm.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final JwtService jwtService;
    private final UserService userService;
    private final UserRepository userRepository;
    @GetMapping("/details")
    public ResponseEntity<Map<String, Object>> getUserDetails(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Map<String, Object> response = new HashMap<>();
        String rollNo;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            rollNo = "";
            response.put("error", "Missing or invalid Authorization header");
            return ResponseEntity.status(401).body(response);
        }else{
            // ✅ Extract JWT token from header
            String token = authHeader.substring(7);
            String email = jwtService.extractUsername(token);
            if(!userRepository.findByEmail(email).get().getRole().name().equals("ADMIN")) {
                rollNo = email.split("@")[0].split("_")[1].toUpperCase();
            } else {
                rollNo = "";
            }
            System.out.println(email);
            // ✅ Fetch user from database
            return userService.getUserdetails(token)
                    .map(user -> {
                        Map<String, Object> userInfo = new HashMap<>();
                        userInfo.put("id", user.getId());
                        userInfo.put("firstname", user.getFirstName());
                        userInfo.put("lastname", user.getLastName());
                        userInfo.put("email", user.getEmail());
                        userInfo.put("role", user.getRole().name());
                        userInfo.put("rollNo",rollNo);// Ensure role is returned as a string
                        return ResponseEntity.ok(userInfo);
                    })
                    .orElseGet(() -> {
                        response.put("error", "User not found");
                        return ResponseEntity.status(404).body(response);
                    });

        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchUserByEmail(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update-role/{userId}")
    public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @RequestBody Map<String, String> request) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOptional.get();
        user.setRole(Role.valueOf(request.get("role")));
        Map<String, String> response = new HashMap<>();
        response.put("message", "User role updated successfully");
        userRepository.save(user);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.findAll());
    }
}
