package com.example.ckcm.controller;

import com.example.ckcm.services.QrCodeService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/qr")
@CrossOrigin(origins = "http://localhost:4200") // Allow frontend requests
public class QrCodeController {

    private final QrCodeService qrCodeService;

    public QrCodeController(QrCodeService qrCodeService) {
        this.qrCodeService = qrCodeService;
    }

    // ✅ Generate and return QR Code as a downloadable file
    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateQRCode(@RequestBody Map<String, Object> qrData) {
        System.out.println("qr code generation controller");
        try {
            // Extract data safely
            List<String> subjectCodes = (List<String>) qrData.get("subject_codes");
            List<String> subjectNames = (List<String>) qrData.get("subject_names");
            String facultyEmail = (String) qrData.get("faculty_email");
            List<String> sectionNames = (List<String>) qrData.get("section_names");
            Double latitude = (Double) qrData.get("latitude");
            Double longitude = (Double) qrData.get("longitude");
            String generatedAt = (String) qrData.get("generated_time");

            // Validate input
            if (subjectCodes == null || subjectNames == null || facultyEmail == null ||
                    sectionNames == null || latitude == null || longitude == null || generatedAt == null) {
                return ResponseEntity.badRequest().body("Missing required fields".getBytes());
            }

            // Generate QR Code
            byte[] qrImage = qrCodeService.generateQRCode(subjectCodes, subjectNames, facultyEmail, sectionNames, latitude, longitude, generatedAt);

            // ✅ Set headers to return a file
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Disposition", "attachment; filename=qr_code.png");
            headers.set("Content-Type", "image/png");

            return new ResponseEntity<>(qrImage, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error generating QR Code".getBytes());
        }
    }

}
