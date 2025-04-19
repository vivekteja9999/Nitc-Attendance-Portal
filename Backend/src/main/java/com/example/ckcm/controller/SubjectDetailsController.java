package com.example.ckcm.controller;

import com.example.ckcm.entities.Subject;
import com.example.ckcm.entities.SubjectDetails;
import com.example.ckcm.services.SubjectDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/subject-details")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class SubjectDetailsController {

    private final SubjectDetailsService subjectDetailsService;

    // ✅ Save or update subject list for a user
    @PostMapping("/save")
    public ResponseEntity<SubjectDetails> saveSubjects(@RequestBody Map<String, Object> payload) {
        try {
            String email = (String) payload.get("email");

            // ✅ Ensure subjectIds is handled properly as a List
            Object subjectIdsObject = payload.get("subjectIds");
            List<?> subjectIdsRaw = subjectIdsObject instanceof List<?> ? (List<?>) subjectIdsObject : new ArrayList<>();

            // Convert List<?> to Set<Long>
            Set<Long> subjectIds = new HashSet<>();
            for (Object id : subjectIdsRaw) {
                if (id instanceof Number) {
                    subjectIds.add(((Number) id).longValue());
                } else {
                    return ResponseEntity.badRequest().build(); // Invalid type found
                }
            }

            SubjectDetails updatedDetails = subjectDetailsService.saveOrUpdateSubjects(email, subjectIds);
            return ResponseEntity.ok(updatedDetails);
        } catch (Exception e) {
            e.printStackTrace();  // Log the error for debugging
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ Retrieve subjects assigned to a user by email
    @GetMapping("/{email}")
    public ResponseEntity<Set<Subject>> getSubjects(@PathVariable String email) {
        return ResponseEntity.ok(subjectDetailsService.getSubjectsByEmail(email));
    }

    // ✅ Remove a specific subject assigned to a user
    @DeleteMapping("/{email}/{subjectId}")
    public ResponseEntity<String> deleteSubject(@PathVariable String email, @PathVariable Long subjectId) {
        boolean removed = subjectDetailsService.removeSubjectFromUser(email, subjectId);
        if (removed) {
            return ResponseEntity.ok("Subject removed successfully.");
        } else {
            return ResponseEntity.badRequest().body("Subject not found or could not be removed.");
        }
    }
}
