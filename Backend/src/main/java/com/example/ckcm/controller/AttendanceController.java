package com.example.ckcm.controller;

import com.example.ckcm.entities.Attendance;
import com.example.ckcm.entities.TotalClassesTaken;
import com.example.ckcm.repositories.AttendanceRepository;
import com.example.ckcm.repositories.TotalClassesRepository;
import com.example.ckcm.services.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "http://localhost:4200")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @Autowired
    private  AttendanceRepository attendanceRepository;

    @Autowired
    private TotalClassesRepository totalClassesRepository;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Attendance>> getAllAttendanceRecords() {
        return ResponseEntity.ok(attendanceRepository.findAll());
    }


    // ✅ Mark attendance API
    @PostMapping("/mark")
    public String markAttendance(@RequestBody Attendance attendance) {
//        System.out.println("At the controller - Marking Attendance");
//        attendanceService.markAttendance(attendance);
//        return "Attendance marked successfully!";
        try {
            attendanceService.markAttendance(attendance);
            return ("Successful");
        } catch (IllegalArgumentException ex) {
            return ("You are not studying this subject");
        }
    }

    // ✅ Fetch attendance percentage API
    @GetMapping("/percentage/{email}")
    public ResponseEntity<Map<String, Object>> getAttendancePercentage(@PathVariable String email) {
        System.out.println("Fetching attendance data for: " + email);
        Map<String, Object> attendanceData = attendanceService.calculateAttendancePercentage(email);
        return ResponseEntity.ok(attendanceData);
    }

    @GetMapping("/branch-reports")
    public ResponseEntity<Map<String, Map<String, List<Map<String, Object>>>>> getBranchWiseAttendanceReports() {
        List<Attendance> allRecords = attendanceRepository.findAll();
        Map<String, List<String>> branchWiseStudents = new HashMap<>();
        Map<String, Map<String, List<Map<String, Object>>>> branchReports = new HashMap<>();

        // **Step 1: Group students by branch**
        for (Attendance record : allRecords) {
            String email = record.getStudentEmail();
            String branch = extractBranchFromEmail(email);

            branchWiseStudents.computeIfAbsent(branch, k -> new ArrayList<>());
            if (!branchWiseStudents.get(branch).contains(email)) {
                branchWiseStudents.get(branch).add(email);
            }
        }

        // **Step 2: Get attendance report for each student in each branch**
        for (Map.Entry<String, List<String>> entry : branchWiseStudents.entrySet()) {
            String branch = entry.getKey();
            List<String> students = entry.getValue();

            Map<String, List<Map<String, Object>>> branchAttendanceReport = new HashMap<>();
            for (String studentEmail : students) {
                Map<String, Object> studentReport = attendanceService.calculateAttendancePercentage(studentEmail);

                // Convert the subject-wise attendance map to a list of objects
                List<Map<String, Object>> attendanceList = new ArrayList<>();
                for (Map.Entry<String, Object> subjectEntry : studentReport.entrySet()) {
                    if (subjectEntry.getValue() instanceof Map) {
                        attendanceList.add((Map<String, Object>) subjectEntry.getValue());
                    }
                }

                branchAttendanceReport.put(studentEmail, attendanceList);
            }

            branchReports.put(branch, branchAttendanceReport);
        }

        return ResponseEntity.ok(branchReports);
    }

    // ✅ Utility method: Extract branch and map to full name
    private String extractBranchFromEmail(String email) {
        Map<String, String> branchMap = Map.of(
                "cs", "CSE",
                "ec", "ECE",
                "ee", "EEE",
                "me", "MECH",
                "ch", "CHEMICAL",
                "ce", "CIVIL",
                "pr", "PRODUCTION"
        );

        String[] parts = email.split("_");
        if (parts.length > 1) {

            String branchCode = parts[1].substring(7, 9).toLowerCase(); // Extract branch code (e.g., "cs" from "b221051cs")

            return branchMap.getOrDefault(branchCode, "UNKNOWN");
        }
        System.out.println("what");
        return "UNKNOWN"; // Default if email format is invalid
    }

//    @GetMapping("/teacher-report/{teacherEmail}")
//    public ResponseEntity<Map<String, Map<String, List<Map<String, Object>>>>> getTeacherAttendanceReport(@PathVariable String teacherEmail) {
//        System.out.println("hiii");
//        List<Attendance> teacherAttendanceRecords = attendanceRepository.findByFacultyEmail(teacherEmail);
//
//        // **Step 1: Find subjects taught by the teacher**
//        Set<String> subjects = teacherAttendanceRecords.stream()
//                .map(Attendance::getSubjectCode)
//                .collect(Collectors.toSet());
//
//        Map<String, Map<String, List<Map<String, Object>>>> teacherReport = new HashMap<>();
//
//        // **Step 2: Find sections for each subject taught by the teacher**
//        for (String subjectCode : subjects) {
//            List<Attendance> subjectRecords = teacherAttendanceRecords.stream()
//                    .filter(a -> a.getSubjectCode().equals(subjectCode))
//                    .toList();
//
//            Set<String> sections = subjectRecords.stream()
//                    .map(Attendance::getSectionName)
//                    .collect(Collectors.toSet());
//
//            Map<String, List<Map<String, Object>>> subjectReport = new HashMap<>();
//
//            // **Step 3: Get students who attended each section**
//            for (String section : sections) {
//                List<Attendance> sectionRecords = subjectRecords.stream()
//                        .filter(a -> a.getSectionName().equals(section))
//                        .toList();
//
//                Set<String> students = sectionRecords.stream()
//                        .map(Attendance::getStudentEmail)
//                        .collect(Collectors.toSet());
//
//                List<Map<String, Object>> studentAttendanceList = new ArrayList<>();
//
//                // **Step 4: Calculate attendance for each student in this section**
//                for (String studentEmail : students) {
//                    long attendedClasses = sectionRecords.stream()
//                            .filter(a -> a.getStudentEmail().equals(studentEmail))
//                            .count();
//
//                    // Fetch total classes taken from TotalClassesTaken entity
//                    TotalClassesTaken totalClassesTakenEntity = totalClassesRepository
//                            .findByFacultyEmailAndSubjectCodeAndSectionName(teacherEmail, subjectCode, section)
//                            .orElse(new TotalClassesTaken(teacherEmail, subjectCode, section, 0));
//
//                    long totalClasses = totalClassesTakenEntity.getTotalClasses();
//                    double attendancePercentage = (totalClasses > 0) ? (attendedClasses * 100.0 / totalClasses) : 0;
//
//                    Map<String, Object> studentData = new HashMap<>();
//                    studentData.put("studentEmail", studentEmail);
//                    studentData.put("attendedClasses", attendedClasses);
//                    studentData.put("totalClasses", totalClasses);
//                    studentData.put("attendancePercentage", attendancePercentage);
//
//                    studentAttendanceList.add(studentData);
//                }
//
//                subjectReport.put(section, studentAttendanceList);
//            }
//
//            teacherReport.put(subjectCode, subjectReport);
//        }
//
//        return ResponseEntity.ok(teacherReport);
//    }

    @GetMapping("/teacher-student-report")
    public ResponseEntity<List<Map<String, Object>>> getStudentAttendanceForTeacher(
            @RequestParam String teacherEmail,
            @RequestParam String subjectCode,
            @RequestParam String section) {

        // 1. Fetch attendance records by teacher, subject, and section
        List<Attendance> records = attendanceRepository.findByFacultyEmailAndSubjectCodeAndSectionName(
                teacherEmail, subjectCode, section);

        // 2. Fetch total classes from `TotalClassesTaken` table
        Optional<TotalClassesTaken> totalClassesTakenOpt = totalClassesRepository
                .findByFacultyEmailAndSubjectCodeAndSectionName(teacherEmail, subjectCode, section);

        int totalClasses = totalClassesTakenOpt.map(TotalClassesTaken::getTotalClasses).orElse(0);

        // 3. Group by student email and count their attendance
        Map<String, Long> studentAttendanceCount = records.stream()
                .collect(Collectors.groupingBy(Attendance::getStudentEmail, Collectors.counting()));

        // 4. Prepare response
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : studentAttendanceCount.entrySet()) {
            String studentEmail = entry.getKey();
            long attended = entry.getValue();
            double percentage = totalClasses == 0 ? 0.0 : ((double) attended / totalClasses) * 100;

            Map<String, Object> studentData = new HashMap<>();
            studentData.put("studentEmail", studentEmail);
            studentData.put("attended", attended);
            studentData.put("totalClasses", totalClasses);
            studentData.put("percentage", String.format("%.1f", percentage));

            result.add(studentData);
        }

        return ResponseEntity.ok(result);
    }



}
