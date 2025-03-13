package com.example.ckcm.services;

import com.example.ckcm.entities.Cycle;
import com.example.ckcm.repositories.CycleRepository;
import com.example.ckcm.util.QrCodeGenerator;
import com.google.zxing.WriterException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CycleService {
    private final CycleRepository cycleRepository;
    private final QrCodeGenerator qrCodeService;
    @Transactional
    public Cycle registerCycle(String cycleNumber, String location,String gearOrNonGear) throws IOException, WriterException {
        String qrCode = "";
        if(cycleRepository.existsByCycleId(cycleNumber)){
            throw new IllegalArgumentException("Cycle ID already exists!");
        }
        qrCode = qrCodeService.generateQrCodeFile(cycleNumber,300,300);
        Cycle cycle = Cycle.builder()
                .cycleId(cycleNumber)
                .gearType(gearOrNonGear)
                .status("Available")
                .qrCode(qrCode)
                .location(location)
                .borrowedBy(null)
                .borrowedAt(null)
                .build();
        return cycleRepository.save(cycle);
    }
}
