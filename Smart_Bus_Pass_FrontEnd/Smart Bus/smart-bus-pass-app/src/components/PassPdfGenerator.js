import jsPDF from "jspdf";
import { formatDate } from "../config/formatDate";

/**
 * Generate a downloadable PDF of the bus pass, using the exact QR code received from backend.
 * @param {Object} pass - The pass data object.
 * @param {number} farePrice - Fare price per km.
 */
export const generatePassPDF = (pass, farePrice) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Smart Bus Pass", 105, 20, { align: "center" });
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);


  doc.setFontSize(12);
   doc.setFont("helvetica", "normal");

  let y = 40;
  const lineSpacing = 10;
  const details = [
    `Pass ID        : ${pass.passId}`,
    `Pass Type      : ${pass.passType}`,
    `Status         : ${pass.active ? "Approved" : "Expired"}`,
    `Valid From     : ${new Date(pass.issueDate).toLocaleDateString()}`,
    `Valid Until    : ${new Date(pass.expiryDate).toLocaleDateString()}`,
    `Route          : ${pass.routeSource} to ${pass.routeDestination}`,
  ];
 details.forEach((line) => {
    doc.text(line, 30, y);
    y += lineSpacing;
  });


  if (pass.distanceKm > 0) {
    const fare = pass.distanceKm * farePrice;
    doc.text(`Fare Price: ₹${fare}`, 20, y); y += lineSpacing;
  }

  if (pass.qrCodeData && pass.qrCodeData.startsWith("data:image")) {
    
    const qrX = 150;
    const qrY = 40;
    const qrSize = 40;

    doc.addImage(pass.qrCodeData, "PNG", qrX, qrY, qrSize, qrSize);
  } else {
    doc.text("⚠️ QR Code not available", 150, 80);
  }

  doc.save(`BusPass_${pass.passId}.pdf`);
};
