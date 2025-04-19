package com.example.ckcm.services;

import com.example.ckcm.entities.Attendance;
import com.example.ckcm.entities.SubjectDetails;
import com.example.ckcm.repositories.AttendanceRepository;
import com.example.ckcm.repositories.SubjectDetailsRepository;
import com.example.ckcm.repositories.TotalClassesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TotalClassesRepository totalClassesRepository;

    @Autowired
    private SubjectDetailsRepository subjectDetailsRepository;

    // ✅ Mark attendance
    public void markAttendance(Attendance attendance) {
//        attendanceRepository.save(attendance);
        String studentEmail = attendance.getStudentEmail();
        String subjectCode = attendance.getSubjectCode();

        SubjectDetails subjectDetails = subjectDetailsRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException("Student is not registered for any subjects."));

        boolean isSubjectValid = subjectDetails.getSubjects().stream()
                .anyMatch(subject -> subject.getSubjectCode().equalsIgnoreCase(subjectCode));

        if (!isSubjectValid) {
            throw new IllegalArgumentException("Student is not enrolled in the subject: " + subjectCode);
        }

        attendanceRepository.save(attendance);
    }

    // ✅ Fetch student attendance report
    public Map<String, Object> calculateAttendancePercentage(String studentEmail) {
        List<Attendance> attendanceRecords = attendanceRepository.findByStudentEmail(studentEmail);
        Map<String, Object> report = new HashMap<>();

        if (attendanceRecords.isEmpty()) {
            return report;
        }

        // Group attendance data by subject code
        Map<String, Map<String, Object>> subjectWiseAttendance = new HashMap<>();
        for (Attendance record : attendanceRecords) {
            subjectWiseAttendance.computeIfAbsent(record.getSubjectCode(), k -> new HashMap<>());

            Map<String, Object> subjectData = subjectWiseAttendance.get(record.getSubjectCode());
            subjectData.put("subjectCode", record.getSubjectCode());
            subjectData.put("subjectName", record.getSubjectName());
            subjectData.put("classesAttended", subjectData.getOrDefault("classesAttended", 0));

            subjectData.put("classesAttended", (int) subjectData.get("classesAttended") + 1);
//            int totalClasses = attendanceRepository.countTotalClassesTaken(record.getSubjectCode(), record.getSectionName());
            System.out.println(record.getSectionName());
            int totalClasses = totalClassesRepository.countTotalClassesTaken(record.getSubjectCode() , record.getSectionName());
            subjectData.put("classesTaken", totalClasses);
            subjectData.put("percentage", (totalClasses > 0) ? ((double) (int) subjectData.get("classesAttended") / totalClasses) * 100 : 0.0);
        }

        // **Fake Attendance Detection** (if a student has attended classes in multiple sections)
        int uniqueSections = attendanceRepository.countDistinctSectionsByStudentEmail(studentEmail);
        if (uniqueSections > 1) {
            report.put("FAKE_ATTENDANCE", Map.of(
                    "subjectCode", "FAKE_ATTENDANCE",
                    "subjectName", "Multiple Sections Detected",
                    "classesAttended", 0,
                    "classesTaken", 0,
                    "percentage", -1
            ));
        }

        report.putAll(subjectWiseAttendance);
        return report;
    }
}
