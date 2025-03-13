package com.example.ckcm.entities;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "cycles")
@AllArgsConstructor
@NoArgsConstructor
public class Cycle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,unique = true)
    private String cycleId;
    @Column(nullable = false,unique = true,length = 1024)
    private String qrCode;
    private String status="Available";
    private String location;
    private String borrowedBy;
    private String gearType;
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date borrowedAt;
}
