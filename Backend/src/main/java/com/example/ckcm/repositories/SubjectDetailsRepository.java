package com.example.ckcm.repositories;

import com.example.ckcm.entities.SubjectDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SubjectDetailsRepository extends JpaRepository<SubjectDetails, Long> {
    Optional<SubjectDetails> findByEmail(String email);
}
