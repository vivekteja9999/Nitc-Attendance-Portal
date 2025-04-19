package com.example.ckcm.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "total_classes_taken")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TotalClassesTaken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String facultyEmail;
    private String facultyName;
    private String subjectCode;
    private String subjectName;
    private String sectionName;
    private int totalClasses = 0;
}
