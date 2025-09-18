const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/certificate", async (req, res) => {
  try {
    const { name, course, date } = req.body;

    // Image paths
    const codeMateLogoPath = path.join(
      __dirname,
      "../public/images/codemateai_logo.png"
    );
    const codeTitansSealPath = path.join(
      __dirname,
      "../public/images/code_titans_seal.png"
    );
    const signaturePath = path.join(
      __dirname,
      "../public/images/signature.png"
    );

    // Check images
    if (
      !fs.existsSync(codeMateLogoPath) ||
      !fs.existsSync(codeTitansSealPath) ||
      !fs.existsSync(signaturePath)
    ) {
      return res.status(500).json({ error: "Required images not found." });
    }

    // PDF setup: A4 landscape
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="certificate.pdf"'
    );
    doc.pipe(res);

    const width = doc.page.width;
    const height = doc.page.height;

    // White background
    doc.rect(0, 0, width, height).fill("#fff");

    // Border
    doc
      .save()
      .lineWidth(2)
      .strokeColor("#1976d2")
      .rect(18, 18, width - 36, height - 36)
      .stroke()
      .restore();

    // Top logos
    const logoMargin = 40;
    const codeMateLogoW = 110,
      codeMateLogoH = 60;
    const codeTitansLogoW = 80,
      codeTitansLogoH = 80;
    doc.image(codeMateLogoPath, logoMargin, logoMargin, {
      width: codeMateLogoW,
      height: codeMateLogoH,
    });
    doc.image(
      codeTitansSealPath,
      width - codeTitansLogoW - logoMargin,
      logoMargin,
      {
        width: codeTitansLogoW,
        height: codeTitansLogoH,
      }
    );

    // --- Center block calculation ---
    // Calculate total height of the center block
    const centerBlockHeight =
      38 + // Title
      30 + // space
      20 + // Presented text
      30 + // space
      30 + // Name
      20 + // space
      18 + // Subtitle
      20 + // space
      22 + // Course
      20 + // space
      16 + // Date
      18 + // space
      14; // Cert ID

    // Start Y so that the block is vertically centered
    let centerY = (height - centerBlockHeight) / 2;

    // Title
    doc
      .font("Helvetica-Bold")
      .fontSize(38)
      .fillColor("#22223b")
      .text("Certificate of Completion", 0, centerY, {
        align: "center",
        width,
      });
    centerY += 38 + 30;

    // Presented text
    doc
      .font("Helvetica")
      .fontSize(20)
      .fillColor("#222")
      .text("This is proudly presented to", 0, centerY, {
        align: "center",
        width,
      });
    centerY += 20 + 30;

    // Name
    doc
      .font("Helvetica-Bold")
      .fontSize(30)
      .fillColor("#1976d2")
      .text(name || "Participant Name", 0, centerY, { align: "center", width });
    centerY += 30 + 20;

    // Subtitle
    doc
      .font("Helvetica")
      .fontSize(18)
      .fillColor("#222")
      .text("has successfully completed the course", 0, centerY, {
        align: "center",
        width,
      });
    centerY += 18 + 20;

    // Course Name
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#1976d2")
      .text(course || "Course Name", 0, centerY, { align: "center", width });
    centerY += 22 + 20;

    // Date
    doc
      .font("Helvetica")
      .fontSize(16)
      .fillColor("#222")
      .text(`Date: ${date || new Date().toLocaleDateString()}`, 0, centerY, {
        align: "center",
        width,
      });
    centerY += 16 + 18;

    // Certificate ID
    const certId = `Certificate ID: CM-2025-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    doc
      .font("Helvetica-Oblique")
      .fontSize(14)
      .fillColor("#888")
      .text(certId, 0, centerY, { align: "center", width });

    // --- Signature and Academy text at bottom-left, but signature shifted right ---
    const bottomMargin = 40;
    const sigImgWidth = 120,
      sigImgHeight = 40;
    const sigImgX = bottomMargin + 80; // Move signature 80px right from left edge
    const sigBlockY = height - bottomMargin - sigImgHeight - 25; // 25px above academy text
    doc.image(signaturePath, sigImgX, sigBlockY, {
      width: sigImgWidth,
      height: sigImgHeight,
    });

    // Academy text stays left-aligned under signature
    doc
      .font("Helvetica-Bold")
      .fontSize(15)
      .fillColor("#1976d2")
      .text(
        "CodeMateAI X CodeTitans Academy",
        bottomMargin,
        sigBlockY + sigImgHeight + 5
      );

    doc.end();
  } catch (err) {
    res.status(500).json({ error: "Failed to generate certificate." });
  }
});

module.exports = router;
