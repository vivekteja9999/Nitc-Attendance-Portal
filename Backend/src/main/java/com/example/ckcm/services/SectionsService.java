package com.example.ckcm.services;

import com.example.ckcm.entities.Sections;
import com.example.ckcm.repositories.SectionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SectionsService {

    private final SectionsRepository sectionsRepository;

    // Register a new section
    public Sections registerSection(String classId) {
        if (sectionsRepository.findByClassId(classId).isPresent()) {
            throw new RuntimeException("Section with this Class ID already exists");
        }
        Sections section = Sections.builder()
                .classId(classId)
                .build();
        return sectionsRepository.save(section);
    }

    // Get all sections
    public List<Sections> getAllSections() {
        return sectionsRepository.findAll();
    }

    // Get section by ID
    public Optional<Sections> getSectionById(Long id) {
        return sectionsRepository.findById(id);
    }

    // Get section by Class ID
    public Optional<Sections> getSectionByClassId(String classId) {
        return sectionsRepository.findByClassId(classId);
    }

    // Update a section's Class ID
    public Sections updateSection(Long id, String classId) {
        return sectionsRepository.findById(id).map(section -> {
            section.setClassId(classId);
            return sectionsRepository.save(section);
        }).orElseThrow(() -> new RuntimeException("Section not found"));
    }

    // Delete a section by ID
    public void deleteSection(Long id) {
        if (!sectionsRepository.existsById(id)) {
            throw new RuntimeException("Section not found");
        }
        sectionsRepository.deleteById(id);
    }
}
