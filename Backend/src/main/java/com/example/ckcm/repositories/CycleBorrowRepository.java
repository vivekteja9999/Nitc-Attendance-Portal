package com.example.ckcm.repositories;

import com.example.ckcm.entities.CycleBorrow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CycleBorrowRepository extends JpaRepository<CycleBorrow,Long> {
    Optional<CycleBorrow> findByCycleId(String cycleId);
    Optional<CycleBorrow> findByStatus(String status);
    List<CycleBorrow> findByBorrowerEmail(String borrowerEmail);
    Optional<CycleBorrow> findByCycleIdAndBorrowerEmailAndStatus(String cycleId,String borrowerEmail,String status);
}