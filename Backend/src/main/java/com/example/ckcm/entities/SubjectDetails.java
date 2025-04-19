package com.example.ckcm.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@Entity
@Table(name = "subject_details")
@AllArgsConstructor
@NoArgsConstructor
public class SubjectDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email; // Storing email of the person

    @ManyToMany
    @JoinTable(
            name = "subject_details_mapping",
            joinColumns = @JoinColumn(name = "subject_details_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subjects = new HashSet<>();


}
