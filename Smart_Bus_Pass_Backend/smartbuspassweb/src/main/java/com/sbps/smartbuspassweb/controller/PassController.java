package com.sbps.smartbuspassweb.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.MediaType;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.sbps.smartbuspassweb.Services.PassService;
import com.sbps.smartbuspassweb.dto.PassRequest;
import com.sbps.smartbuspassweb.dto.PassResponse;
import com.sbps.smartbuspassweb.dto.PassWithRouteDTO;
import com.sbps.smartbuspassweb.model.Pass;
import com.sbps.smartbuspassweb.model.QRCodeUtil;
import com.sbps.smartbuspassweb.repository.PassRepository;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/passes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PassController {
	
    @Autowired private PassService passService;
    @Autowired private PassRepository passRepo;
    @PostMapping("/user/{userId}/route/{src}/{dst}")
    public Pass issue(
            @PathVariable int userId,
            @PathVariable String src,
            @PathVariable String dst,
            @RequestBody PassRequest passRequest) {
        System.out.println("in pass: " + userId + ", " + src + " -> " + dst);
        return passService.issuePass(userId, src, dst, passRequest);
    }

    
    @GetMapping("/{id}") 
    public Pass get(@PathVariable int id) {
    	System.out.println("helloow oworidhfoajjghigoijgh");
    	return passService.getPassById(id);
    	}
    
    @GetMapping("/user/{userId}/passes")
    public List<PassWithRouteDTO> getPassesByUserAndActiveStatus(
        @PathVariable int userId,
        @RequestParam boolean isActive) {
        
        return passService.findByUserAndActive(userId, isActive);
    }

    
    @GetMapping("/getAllPasses")
    public List<PassResponse> all() { 
    	System.out.println("yoyo guys");
    	List<Pass> list =passService.getAllPasses();
    	List<PassResponse> passlist= new ArrayList<>();
    	for (Pass pass : list) {
			PassResponse pr = new PassResponse();
			pr.setUserId(pass.getUser().getUser_id());
			pr.setPassId(pass.getPassId());
			pr.setPassType(pass.getPassType());
			pr.setIssueDate(pass.getIssueDate());
			pr.setExpiryDate(pass.getExpiryDate());
			pr.setRouteId(1);
			pr.setQrCodeData(pass.getQrCodeData());
			passlist.add(pr);
		}
    	return  passlist;
    	
    	}
    
    @GetMapping("/user/{userId}") 
    public List<PassWithRouteDTO> findByUser(@PathVariable int userId) {
    	return passService.findByUser(userId); 
    	}
    
    @GetMapping("/download/{id}")
  public void downloadPassPdf(@PathVariable String id, HttpServletResponse response) throws Exception {
    	int passid = Integer.parseInt(id);
      Pass pass = passService.getPassById(passid); 

      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      System.out.println("in pass dowload");
     
      BufferedImage qrImage = QRCodeUtil.generateQRCodeImage("http://192.168.1.25:8080/api/passes/details/" + id, 200, 200);

      
      PdfWriter writer = new PdfWriter(baos);
      PdfDocument pdf = new PdfDocument(writer);
      Document document = new Document(pdf);

      
      Paragraph title = new Paragraph("Smart Bus Pass")
              .setBold()
              .setFontSize(18)
              .setTextAlignment(TextAlignment.CENTER);
      document.add(title);

      document.add(new Paragraph("Pass ID: " + pass.getPassId()));
      document.add(new Paragraph("Pass Type: " + pass.getPassType()));
      document.add(new Paragraph("Source: " + pass.getRoute().getSource()));
      document.add(new Paragraph("Destination: " + pass.getRoute().getDestination()));
      document.add(new Paragraph("Issue Date: " + pass.getIssueDate()));
      document.add(new Paragraph("Expiry Date: " + pass.getExpiryDate()));

      ByteArrayOutputStream qrBaos = new ByteArrayOutputStream();
      ImageIO.write(qrImage, "PNG", qrBaos);
      ImageData qrData = ImageDataFactory.create(qrBaos.toByteArray());
      Image qrCode = new Image(qrData).setWidth(150).setHorizontalAlignment(HorizontalAlignment.CENTER);
      document.add(qrCode);

      document.close();

      response.setContentType("application/pdf");
      response.setHeader("Content-Disposition", "attachment; filename=BusPass_" + id + ".pdf");
      response.getOutputStream().write(baos.toByteArray());
      response.getOutputStream().flush();
  }

  @GetMapping("/details/{id}")
  public ResponseEntity<String> getPassHtmlDetails(@PathVariable Integer id) {
      Pass pass = passRepo.findById(id).orElse(null);
      System.out.println("in pass details");
      if (pass == null) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
                  .body("<h2>Pass Not Found</h2>");
      }

      String html = """
      	    <html>
      	    <head>
      	        <title>Smart Bus Pass</title>
      	        <style>
      	            body {
      	                font-family: Arial, sans-serif;
      	                background-color: #f0f0f0;
      	                padding: 40px;
      	            }
      	            .card {
      	                background-color: white;
      	                border-radius: 16px;
      	                padding: 40px;
      	                max-width: 700px;
      	                margin: auto;
      	                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      	                font-size: 22px;
      	                line-height: 1.8;
      	            }
      	            .title {
      	                text-align: center;
      	                font-size: 32px;
      	                margin-bottom: 30px;
      	                color: #007bff;
      	                font-weight: bold;
      	            }
      	            .field {
      	                margin: 15px 0;
      	            }
      	            .label {
      	                font-weight: bold;
      	                color: #333;
      	            }
      	        </style>
      	    </head>
      	    <body>
      	        <div class="card">
      	            <div class="title">Smart Bus Pass</div>
      	            <div class="field"><span class="label">Pass ID:</span> %d</div>
      	            <div class="field"><span class="label">Pass Type:</span> %s</div>
      	            <div class="field"><span class="label">Source:</span> %s</div>
      	            <div class="field"><span class="label">Destination:</span> %s</div>
      	            <div class="field"><span class="label">Issue Date:</span> %s</div>
      	            <div class="field"><span class="label">Expiry Date:</span> %s</div>
      	        </div>
      	    </body>
      	    </html>
      	    """.formatted(
      	        pass.getPassId(),
      	        pass.getPassType(),
      	        pass.getRoute() != null ? pass.getRoute().getSource() : "N/A",
      	        pass.getRoute() != null ? pass.getRoute().getDestination() : "N/A",
      	        pass.getIssueDate(),
      	        pass.getExpiryDate()
      	    );


      return ResponseEntity.ok()
              .contentType(MediaType.TEXT_HTML)
              .body(html);
  }

}
