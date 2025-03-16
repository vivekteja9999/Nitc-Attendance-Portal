package com.example.ckcm.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Base64;
import java.util.UUID;

@Component
public class QrCodeGenerator {

    private static final String QR_CODE_DIR = "src/main/resources/static/qrcodes/";

    /**
     * Generates a QR code and returns it as a Base64 string.
     */
    public String generateQrCodeBase64(String text, int height, int width) {
        try {
            BitMatrix bitMatrix = new MultiFormatWriter().encode(
                    new String(text.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8),
                    BarcodeFormat.QR_CODE, width, height
            );

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "png", outputStream);

            return Base64.getEncoder().encodeToString(outputStream.toByteArray());

        } catch (WriterException | IOException e) {
            throw new RuntimeException("Error generating QR code: " + e.getMessage(), e);
        }
    }

    /**
     * Generates a QR code and saves it as a file, returning the file path.
     */
    public String generateQrCodeFile(String text, int height, int width) {
        try {
            BitMatrix bitMatrix = new MultiFormatWriter().encode(
                    new String(text.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8),
                    BarcodeFormat.QR_CODE, width, height
            );

            // ✅ Generate a unique filename
            String fileName = "QR_" + text + ".png";
            Path filePath = Path.of(QR_CODE_DIR, fileName);

            // ✅ Ensure directory exists
            File dir = new File(QR_CODE_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // ✅ Save QR Code to file
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", filePath);

            return "/qrcodes/" + fileName; // ✅ Return file path for downloading

        } catch (WriterException | IOException e) {
            throw new RuntimeException("Error generating QR code file: " + e.getMessage(), e);
        }
    }
}
