package com.example.ckcm.services;

import com.example.ckcm.entities.Subject;
import com.example.ckcm.entities.SubjectDetails;
import com.example.ckcm.repositories.SubjectDetailsRepository;
import com.example.ckcm.repositories.subjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SubjectDetailsService {

    private final SubjectDetailsRepository subjectDetailsRepository;
    private final subjectRepository subjectRepository;

    // ✅ Save or update subjects for a user
    public SubjectDetails saveOrUpdateSubjects(String email, Set<Long> subjectIds) {
        Set<Subject> subjects = new HashSet<>(subjectRepository.findAllById(subjectIds));

        Optional<SubjectDetails> existingDetails = subjectDetailsRepository.findByEmail(email);
        SubjectDetails subjectDetails;

        if (existingDetails.isPresent()) {
            // Update existing subject details
            subjectDetails = existingDetails.get();
            subjectDetails.getSubjects().addAll(subjects);
        } else {
            // Create new subject details
            subjectDetails = SubjectDetails.builder()
                    .email(email)
                    .subjects(subjects)
                    .build();
        }

        return subjectDetailsRepository.save(subjectDetails);
    }

    // ✅ Retrieve subjects for a user by email
    public Set<Subject> getSubjectsByEmail(String email) {
        System.out.println("at the serviceeee");
        Optional<SubjectDetails> subjectDetails = subjectDetailsRepository.findByEmail(email);
        return subjectDetails.map(SubjectDetails::getSubjects).orElse(new HashSet<>());
    }

    // ✅ Remove a specific subject assigned to a user
    public boolean removeSubjectFromUser(String email, Long subjectId) {
        Optional<SubjectDetails> existingDetails = subjectDetailsRepository.findByEmail(email);

        if (existingDetails.isPresent()) {
            SubjectDetails subjectDetails = existingDetails.get();
            Set<Subject> subjects = subjectDetails.getSubjects();

            // Remove the subject from the set
            boolean removed = subjects.removeIf(subject -> subject.getId().equals(subjectId));

            if (removed) {
                subjectDetailsRepository.save(subjectDetails);
                return true; // Successfully removed
            }
        }
        return false; // Subject not found or not removed
    }
}
