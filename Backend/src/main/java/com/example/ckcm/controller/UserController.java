package com.example.ckcm.controller;

import com.example.ckcm.entities.User;
import com.example.ckcm.services.JwtService;
import com.example.ckcm.services.UserService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/details")
    public ResponseEntity<Map<String, Object>> getUserDetails(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Map<String, Object> response = new HashMap<>();

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.put("error", "Missing or invalid Authorization header");
            return ResponseEntity.status(401).body(response);
        }else{
            // ✅ Extract JWT token from header
            String token = authHeader.substring(7);
            String email = jwtService.extractUsername(token);
            System.out.println(email);
            // ✅ Fetch user from database
            return userService.getUserdetails(token)
                    .map(user -> {
                        Map<String, Object> userInfo = new HashMap<>();
                        userInfo.put("id", user.getId());
                        userInfo.put("firstname", user.getFirstName());
                        userInfo.put("lastname", user.getLastName());
                        userInfo.put("email", user.getEmail());
                        userInfo.put("role", user.getRole().name()); // Ensure role is returned as a string
                        return ResponseEntity.ok(userInfo);
                    })
                    .orElseGet(() -> {
                        response.put("error", "User not found");
                        return ResponseEntity.status(404).body(response);
                    });

        }
    }

}
