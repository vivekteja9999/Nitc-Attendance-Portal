package com.example.ckcm.repositories;

import com.example.ckcm.entities.Key;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KeyRepository extends JpaRepository<Key,Long> {
    Optional<Key> findByKeyId(String keyId);
    Optional<Key> findByBorrowedBy(String email);
    List<Key> findByStatus(String status);
    Optional<Key> findByKeyIdAndLocation(String keyId, String location);

    void deleteByKeyId(String keyId);
}
