package com.example.ckcm.controller;

import com.example.ckcm.entities.Sections;
import com.example.ckcm.services.SectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/class")
@CrossOrigin(origins = "http://localhost:4200")
public class SectionsController {

    @Autowired
    private SectionsService sectionsService;

    // Register a new section
    @PostMapping("/register")
    public ResponseEntity<?> registerSection(@RequestBody Map<String, String> request) {
        try {
            Sections section = sectionsService.registerSection(request.get("classId"));
            return ResponseEntity.ok(section);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Get all sections
    @GetMapping("/all")
    public ResponseEntity<List<Sections>> getAllSections() {
        return ResponseEntity.ok(sectionsService.getAllSections());
    }

    // Get section by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSectionById(@PathVariable Long id) {
        try {
            Optional<Sections> section = sectionsService.getSectionById(id);
            return section.map(ResponseEntity::ok)
                    .orElseThrow(() -> new RuntimeException("Section not found"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/code/{classId}")
    public ResponseEntity<?> getClassbyId(@PathVariable String classId) {
        return ResponseEntity.ok(sectionsService.getSectionByClassId(classId));
    }

    // Get section by classId
    @GetMapping("/class/{classId}")
    public ResponseEntity<?> getSectionByClassId(@PathVariable String classId) {
        try {
            Optional<Sections> section = sectionsService.getSectionByClassId(classId);
            return section.map(ResponseEntity::ok)
                    .orElseThrow(() -> new RuntimeException("Section not found"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Update section
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSection(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            Sections updatedSection = sectionsService.updateSection(id, request.get("classId"));
            return ResponseEntity.ok(updatedSection);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Delete section
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSection(@PathVariable Long id) {
        try {
            sectionsService.deleteSection(id);
            return ResponseEntity.ok(Map.of("message", "Section deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
