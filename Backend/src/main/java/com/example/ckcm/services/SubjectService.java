package com.example.ckcm.services;

import com.example.ckcm.entities.Subject;
import com.example.ckcm.repositories.subjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private subjectRepository subjectRepository;

    // Register a new subject
    public Subject registerSubject(String subjectCode, String subjectName) {
        // Check if the subjectCode already exists
        if (subjectRepository.findBySubjectCode(subjectCode).isPresent()) {
            throw new RuntimeException("Subject with this code already exists");
        }

        Subject subject = new Subject();
        subject.setSubjectCode(subjectCode);
        subject.setSubjectName(subjectName);

        return subjectRepository.save(subject);
    }

    // Get all subjects
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    // Get a subject by ID
    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    // Get a subject by subjectCode
    public Subject getSubjectByClassCode(String subjectCode) {
        return subjectRepository.findBySubjectCode(subjectCode)
                .orElseThrow(() -> new RuntimeException("Subject not found with code: " + subjectCode));
    }

    // Update a subject
    public Subject updateSubject(Long id, String subjectCode, String subjectName) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        subject.setSubjectCode(subjectCode);
        subject.setSubjectName(subjectName);

        return subjectRepository.save(subject);
    }

    // Delete a subject
    public void deleteSubject(Long id) {
        if (!subjectRepository.existsById(id)) {
            throw new RuntimeException("Subject not found");
        }
        subjectRepository.deleteById(id);
    }
}
