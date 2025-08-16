package com.sbps.smartbuspassweb.Services;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class QRCodeService {
    
    private final Map<String, LocalDateTime> validPasses = new HashMap<>();
    
    public String generateQRCode(String passId, long duration, TimeUnit timeUnit) throws WriterException, IOException {
    	
        LocalDateTime expiryTime = LocalDateTime.now().plusSeconds(timeUnit.toSeconds(duration));
        validPasses.put(passId, expiryTime);
        
        String qrContent = passId + "|" + expiryTime.toEpochSecond(ZoneOffset.UTC);
        
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent, BarcodeFormat.QR_CODE, 250, 250);
        
        BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "png", baos);
        
        return "data:image/png;base64," + Base64.getEncoder().encodeToString(baos.toByteArray());
    }

    public boolean verifyQRCode(String qrContent) {
        String[] parts = qrContent.split("\\|");
        if (parts.length != 2) return false;
        
        String passId = parts[0];
        long expiryTimestamp = Long.parseLong(parts[1]);
        LocalDateTime expiryTime = LocalDateTime.ofEpochSecond(expiryTimestamp, 0, ZoneOffset.UTC);
        
        if (!validPasses.containsKey(passId) || 
            !validPasses.get(passId).equals(expiryTime)) {
            return false;
        }
        
        return LocalDateTime.now().isBefore(expiryTime);
    }
}
