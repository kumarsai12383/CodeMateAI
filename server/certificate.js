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

    // Check images
    if (
      !fs.existsSync(codeMateLogoPath) ||
      !fs.existsSync(codeTitansSealPath)
    ) {
      return res.status(500).json({ error: "Logo images not found." });
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

    // Thin border
    doc
      .save()
      .lineWidth(2)
      .strokeColor("#1976d2")
      .rect(18, 18, width - 36, height - 36)
      .stroke()
      .restore();

    // Title: Certificate of Completion (top center)
    const titleY = 60;
    doc
      .font("Helvetica-Bold")
      .fontSize(38)
      .fillColor("#22223b")
      .text("Certificate of Completion", 0, titleY, { align: "center", width });

    // CodeMateAI logo (centered below title)
    const logoWidth = 110;
    const logoHeight = 60;
    const logoY = titleY + 50;
    doc.image(codeMateLogoPath, width / 2 - logoWidth / 2, logoY, {
      width: logoWidth,
      height: logoHeight,
    });

    // Participant Name (big bold, centered)
    const nameY = logoY + logoHeight + 40;
    doc
      .font("Helvetica-Bold")
      .fontSize(30)
      .fillColor("#1976d2")
      .text(name || "Participant Name", 0, nameY, { align: "center", width });

    // "has successfully completed the course"
    const subtitleY = nameY + 45;
    doc
      .font("Helvetica")
      .fontSize(18)
      .fillColor("#222")
      .text("has successfully completed the course", 0, subtitleY, {
        align: "center",
        width,
      });

    // Course Name (bold blue, centered)
    const courseY = subtitleY + 35;
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#1976d2")
      .text(course || "Course Name", 0, courseY, { align: "center", width });

    // Completion Date (under course name)
    const dateY = courseY + 35;
    doc
      .font("Helvetica")
      .fontSize(16)
      .fillColor("#222")
      .text(`Date: ${date || new Date().toLocaleDateString()}`, 0, dateY, {
        align: "center",
        width,
      });

    // Signature (bottom-left) with text, no line
    const sigTextY = height - 80;
    doc
      .font("Helvetica-Bold")
      .fontSize(15)
      .fillColor("#1976d2")
      .text("CodeMateAI X CodeTitans Team", 60, sigTextY + 8);

    // Code Titans seal (bottom-right)
    const sealSize = 80;
    doc.image(
      codeTitansSealPath,
      width - sealSize - 50,
      height - sealSize - 50,
      { width: sealSize }
    );

    doc.end();
  } catch (err) {
    res.status(500).json({ error: "Failed to generate certificate." });
  }
});

module.exports = router;
