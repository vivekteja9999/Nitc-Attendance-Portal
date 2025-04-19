package com.example.ckcm.services;

import com.example.ckcm.noneeds.QrCodeGenerator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QrCodeService {

    // ✅ Generate QR Code and return as byte array
    public byte[] generateQRCode(List<String> subjectCodes, List<String> subjectNames, String facultyEmail,
                                 List<String> sectionNames, double latitude, double longitude, String generatedAt) throws Exception {
        System.out.println("QR code generation service");

        // ✅ Extract first subject code and name from the lists
        String subjectCode = subjectCodes.isEmpty() ? "UnknownCode" : subjectCodes.get(0);
        String subjectName = subjectNames.isEmpty() ? "UnknownName" : subjectNames.get(0);

        // ✅ Combine section names with semicolons (e.g., "A;B;C")
        String sectionsString = String.join(";", sectionNames);

        // ✅ Format QR data: "CODE,NAME,EMAIL,SECTIONS;SECTIONS,LATITUDE,LONGITUDE,TIME"
        String qrData = String.format("%s,%s,%s,%s,%.6f,%.6f,%s",
                subjectCode, subjectName, facultyEmail, sectionsString, latitude, longitude, generatedAt);

        return QrCodeGenerator.generateQRCodeImage(qrData, 300, 300);
    }
}
