package com.example.ckcm.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectCode;
    private String subjectName;
    private String facultyEmail;
    private String studentEmail;
    private String studentName;
    private String sectionName;

    private LocalDateTime attendanceTime;  // ✅ Added attendance timestamp
}
