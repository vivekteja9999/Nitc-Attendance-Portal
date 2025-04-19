package com.example.ckcm.services;

import com.example.ckcm.entities.TotalClassesTaken;
import com.example.ckcm.repositories.TotalClassesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TotalClassTakenService {

    @Autowired
    private TotalClassesRepository totalClassesTakenRepository;

    public void incrementTotalClasses(String facultyEmail, String facultyName,
                                      String subjectCode, String subjectName, List<String> sectionNames) {
        System.out.println("at the increment service");
        for (String sectionName : sectionNames) {
            Optional<TotalClassesTaken> existingRecord = totalClassesTakenRepository
                    .findByFacultyEmailAndSubjectCodeAndSectionName(facultyEmail, subjectCode, sectionName);

            if (existingRecord.isPresent()) {
                TotalClassesTaken totalClassesTaken = existingRecord.get();
                totalClassesTaken.setTotalClasses(totalClassesTaken.getTotalClasses() + 1);
                totalClassesTakenRepository.save(totalClassesTaken);
            } else {
                TotalClassesTaken newRecord = new TotalClassesTaken();
                newRecord.setFacultyEmail(facultyEmail);
                newRecord.setFacultyName(facultyName);
                newRecord.setSubjectCode(subjectCode);
                newRecord.setSubjectName(subjectName);
                newRecord.setSectionName(sectionName);
                newRecord.setTotalClasses(1);
                totalClassesTakenRepository.save(newRecord);
            }
        }
    }

    public int getTotalClassesForSubject(String subjectCode, String facultyEmail) {
        return totalClassesTakenRepository.findBySubjectCodeAndFacultyEmail(subjectCode, facultyEmail)
                .map(TotalClassesTaken::getTotalClasses)
                .orElse(0);
    }
}
