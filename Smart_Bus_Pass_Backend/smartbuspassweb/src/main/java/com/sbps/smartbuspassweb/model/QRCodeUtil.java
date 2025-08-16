package com.sbps.smartbuspassweb.model;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

public class QRCodeUtil {
    public static String generateBase64QRCode(String data, int size) throws Exception {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix matrix = writer.encode(data, BarcodeFormat.QR_CODE, size, size);
        BufferedImage image = MatrixToImageWriter.toBufferedImage(matrix);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ImageIO.write(image, "png", out);
        return "data:image/png;base64," + Base64.getEncoder().encodeToString(out.toByteArray());
    }
	
	    public static BufferedImage generateQRCodeImage(String text, int width, int height) throws WriterException {
	        BitMatrix bitMatrix = new MultiFormatWriter()
	                .encode(text, BarcodeFormat.QR_CODE, width, height);

	        return MatrixToImageWriter.toBufferedImage(bitMatrix);
	    }
	

}