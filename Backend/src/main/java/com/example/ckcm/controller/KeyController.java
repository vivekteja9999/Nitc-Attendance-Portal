package com.example.ckcm.controller;

import com.example.ckcm.entities.Key;
import com.example.ckcm.entities.KeyBorrow;
import com.example.ckcm.repositories.KeyBorrowRepository;
import com.example.ckcm.repositories.KeyRepository;
import com.example.ckcm.services.KeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/keys")
@CrossOrigin(origins = "http://localhost:4200")
public class KeyController {

    @Autowired
    private KeyRepository keyRepository;

    @Autowired
    private KeyService keyService;
    @Autowired
    private KeyBorrowRepository keyBorrowRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerKey(@RequestBody Map<String, String> response) {
        try {
            Key key = keyService.registerKey(response.get("keyId"), response.get("location"));
            return ResponseEntity.ok(key);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Handle duplicate key-location cases
        }
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllKeys(){
        return ResponseEntity.ok(keyRepository.findAll());
    }
    @GetMapping("/requests/{email}")
    public ResponseEntity<List<KeyBorrow>> fetchKeyRequests(@PathVariable String email){
        System.out.println(keyBorrowRepository.findByBorrowerEmail(email));
        return ResponseEntity.ok(keyBorrowRepository.findByBorrowerEmail(email));
    }
    @PostMapping("/delete/{keyId}")
    public ResponseEntity<?> deleteKey(@PathVariable String keyId){
        keyRepository.deleteByKeyId(keyId);
        return ResponseEntity.ok(Map.of("message", "Key deleted successfully"));
    }
}
