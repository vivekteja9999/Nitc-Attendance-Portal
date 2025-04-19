package com.example.ckcm.controller;

import com.example.ckcm.services.TotalClassTakenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/total-classes")
@RequiredArgsConstructor
public class TotalClassesController {

    private final TotalClassTakenService service;

    @PostMapping("/increment")
    public ResponseEntity<Map<String, String>> incrementTotalClasses(@RequestBody Map<String, Object> requestData) {
        System.out.println("at increment controller");
        String facultyEmail = (String) requestData.get("facultyEmail");
        String facultyName = (String) requestData.get("facultyName");
        String subjectCode = (String) requestData.get("subjectCode");
        String subjectName = (String) requestData.get("subjectName");
        List<String> sectionNames = (List<String>) requestData.get("sectionNames");

        if (facultyEmail == null || subjectCode == null || sectionNames == null || sectionNames.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing required fields"));
        }

        // Increment total classes for each section
        service.incrementTotalClasses(facultyEmail, facultyName, subjectCode, subjectName, sectionNames);

        return ResponseEntity.ok(Map.of("message", "Total classes incremented successfully!"));
    }

    @GetMapping("/{subjectCode}/{facultyEmail}")
    public ResponseEntity<Integer> getTotalClasses(@PathVariable String subjectCode, @PathVariable String facultyEmail) {
        int totalClasses = service.getTotalClassesForSubject(subjectCode, facultyEmail);
        return ResponseEntity.ok(totalClasses);
    }
}
