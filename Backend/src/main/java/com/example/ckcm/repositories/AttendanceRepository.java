package com.example.ckcm.repositories;

import com.example.ckcm.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Fetch all attendance records for a given student
    List<Attendance> findByStudentEmail(String studentEmail);

    List<Attendance> findByFacultyEmail(String facultyEmail);

    List<Attendance> findByFacultyEmailAndSubjectCodeAndSectionName(String facultyEmail, String subjectCode, String section);


    // Count how many times a student attended a specific subject
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.studentEmail = :studentEmail AND a.subjectCode = :subjectCode")
    int countByStudentEmailAndSubjectCode(String studentEmail, String subjectCode);

    // Count distinct sections attended by a student (to detect fake attendance)
    @Query("SELECT COUNT(DISTINCT a.sectionName) FROM Attendance a WHERE a.studentEmail = :studentEmail")
    int countDistinctSectionsByStudentEmail(String studentEmail);

    // Count total classes conducted for a specific subject and section
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.subjectCode = :subjectCode AND a.sectionName = :sectionName")
    int countTotalClassesTaken(String subjectCode, String sectionName);
}
