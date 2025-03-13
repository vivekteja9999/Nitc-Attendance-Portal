package com.example.ckcm.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Data
@Builder
@Entity
@Table(name = "keys")
@AllArgsConstructor
@NoArgsConstructor
public class Key {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,unique = true)
    private String keyId;
    @Column(nullable = false,unique = true)
    private String Location;
    private String status="Available";
    private String borrowedBy;
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date borrowedAt;
}
