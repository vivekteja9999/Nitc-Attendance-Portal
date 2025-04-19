package com.example.ckcm.controller;

import com.example.ckcm.entities.Subject;
import com.example.ckcm.repositories.subjectRepository;
import com.example.ckcm.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/subjects")
@CrossOrigin(origins = "http://localhost:4200")
public class SubjectController {

    @Autowired
    private subjectRepository subjectRepository;

    @Autowired
    private SubjectService subjectService;

    // Register a new subject
    @PostMapping("/register")
    public ResponseEntity<?> registerSubject(@RequestBody Map<String, String> response) {
        try {
            Subject subject = subjectService.registerSubject(
                    response.get("subjectCode"),
                    response.get("subjectName")
            );
            return ResponseEntity.ok(subject);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all subjects
    @GetMapping("/all")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    // Get subject by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSubjectById(@PathVariable Long id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));
    }

    // ✅ Fixed: Get subject by SubjectCode
    @GetMapping("/code/{subjectCode}")
    public ResponseEntity<?> getSubjectBySubjectCode(@PathVariable String subjectCode) {
        return ResponseEntity.ok(subjectService.getSubjectByClassCode(subjectCode));
    }

    // Update an existing subject
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long id, @RequestBody Map<String, String> response) {
        try {
            Subject updatedSubject = subjectService.updateSubject(
                    id,
                    response.get("subjectCode"),
                    response.get("subjectName")
            );
            return ResponseEntity.ok(updatedSubject);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ Fixed: Use DELETE instead of POST for deleting
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.ok(Map.of("message", "Subject deleted successfully"));
    }
}
