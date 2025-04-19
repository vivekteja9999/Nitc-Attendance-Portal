package com.example.ckcm.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "subjects")
@AllArgsConstructor
@NoArgsConstructor
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String subjectCode;

    @Column(nullable = false)
    private String subjectName;

//    @Column(nullable = true)
//    private String teacherName;
}
