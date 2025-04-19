package com.example.ckcm.repositories;

import com.example.ckcm.entities.Sections;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SectionsRepository extends JpaRepository<Sections, Long> {
    Optional<Sections> findByClassId(String classId);
}
