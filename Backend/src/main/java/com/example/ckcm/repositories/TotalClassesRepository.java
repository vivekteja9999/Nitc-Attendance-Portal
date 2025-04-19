package com.example.ckcm.repositories;

import com.example.ckcm.entities.TotalClassesTaken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TotalClassesRepository extends JpaRepository<TotalClassesTaken, Long> {

    Optional<TotalClassesTaken> findByFacultyEmailAndSubjectCodeAndSectionName(
            String facultyEmail, String subjectCode, String sectionName);

    Optional<TotalClassesTaken> findBySubjectCodeAndFacultyEmail(String subjectCode, String facultyEmail);
    @Query("SELECT COALESCE(SUM(t.totalClasses), 0) FROM TotalClassesTaken t " +
            "WHERE t.subjectCode = :subjectCode AND t.sectionName = :sectionName")
    int countTotalClassesTaken(@Param("subjectCode") String subjectCode,
                               @Param("sectionName") String sectionName);
}
