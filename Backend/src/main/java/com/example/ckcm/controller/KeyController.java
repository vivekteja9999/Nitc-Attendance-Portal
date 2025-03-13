package com.example.ckcm.controller;

import com.example.ckcm.entities.Key;
import com.example.ckcm.repositories.KeyRepository;
import com.example.ckcm.services.KeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "/keys")
@CrossOrigin(origins = "http://localhost:4200")
public class KeyController {

    @Autowired
    private KeyRepository keyRepository;

    @Autowired
    private KeyService keyService;

    @PostMapping("/register")
    public ResponseEntity<?> registerKey(@RequestBody Map<String, String> response) {
        try {
            Key key = keyService.registerKey(response.get("keyId"), response.get("location"));
            return ResponseEntity.ok(key);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Handle duplicate key-location cases
        }
    }
}
