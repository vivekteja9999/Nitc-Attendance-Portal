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
    private String keyId;
    private String location;
    private String status="Available";
    private String borrowedBy;
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date borrowedAt;
}
