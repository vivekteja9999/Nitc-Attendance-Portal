package com.example.ckcm.repositories;

import com.example.ckcm.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface subjectRepository extends JpaRepository<Subject,Long> {

    Optional<Subject> findBySubjectCode(String subjectCode);

}
