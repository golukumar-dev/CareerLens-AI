const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");
const { createWorker } = require("tesseract.js");

const { analyzeResume } = require("./services/resumeAnalyzer");
const { JOB_ROLES } = require("./services/jobRoleCatalog");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed."));
    }
  },
});

// OCR fallback for image-based or designed PDFs
async function extractPdfWithOCR(pdfBuffer) {
  const { pdf } = await import("pdf-to-img");
  const worker = await createWorker("eng");

  try {
    const document = await pdf(pdfBuffer, { scale: 2 });
    const pageTexts = [];

    for await (const pageImage of document) {
      const { data } = await worker.recognize(pageImage);
      pageTexts.push(data.text || "");
    }

    return pageTexts.join("\n\n").trim();
  } finally {
    await worker.terminate();
  }
}

app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Backend is Running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working successfully!",
  });
});

app.get("/api/job-roles", (req, res) => {
  res.json({
    success: true,
    jobRoles: JOB_ROLES.map((role) => ({
      id: role.id,
      title: role.title,
      branches: role.branches,
    })),
  });
});

app.post("/api/upload-resume", (req, res) => {
  upload.single("resume")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        success: false,
        message: uploadError.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF or DOCX resume.",
      });
    }

    const jobDescription = (req.body.jobDescription || "").trim();
    const jobRoleId = (req.body.jobRoleId || "").trim();
    const customRole = (req.body.customRole || "").trim();
    const analysisMode = (req.body.analysisMode || "resume").trim();

    if (!["resume", "job", "both"].includes(analysisMode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid analysis mode.",
      });
    }

    if (
      (analysisMode === "job" || analysisMode === "both") &&
      !jobRoleId &&
      !customRole &&
      !jobDescription
    ) {
      return res.status(400).json({
        success: false,
        message: "Select a job role or provide a job description.",
      });
    }

    try {
      let extractedText = "";
      let extractionMethod = "text";

      if (req.file.mimetype === "application/pdf") {
        const parser = new PDFParse({ data: req.file.buffer });

        try {
          const result = await parser.getText();
          extractedText = (result.text || "").trim();
        } finally {
          await parser.destroy();
        }

        // If normal extraction found little text, try OCR.
        if (extractedText.replace(/\s/g, "").length < 80) {
          console.log("PDF text is limited. Trying OCR...");
          extractedText = await extractPdfWithOCR(req.file.buffer);
          extractionMethod = "OCR";
        }
      } else {
        const result = await mammoth.extractRawText({
          buffer: req.file.buffer,
        });
        extractedText = (result.value || "").trim();
      }

      // Prevent misleading 0/100 reports when extraction failed.
      if (extractedText.replace(/\s/g, "").length < 40) {
        return res.status(422).json({
          success: false,
          message:
            "Resume ka readable text extract nahi ho saka. Please text-based PDF ya DOCX upload karein.",
        });
      }

      const analysis = analyzeResume(
        extractedText,
        jobDescription,
        jobRoleId,
        customRole,
        analysisMode
      );
      console.log("Resume score:", analysis.resumeScore);
console.log("Resume checks:", JSON.stringify(analysis.resumeChecks, null, 2));
console.log("Suggestions:", JSON.stringify(analysis.suggestions, null, 2)
);

      console.log("Resume:", req.file.originalname);
      console.log("Extraction method:", extractionMethod);
      console.log("Extracted characters:", extractedText.length);
      console.log("Detected skills:", analysis.resumeSkills);
      console.log("Job match:", analysis.matchPercentage);

      return res.json({
        success: true,
        message: "Resume analyzed successfully!",
        filename: req.file.originalname,
        extractedText,
        extractionMethod,
        analysis,
        analysisMode,
      });
    } catch (error) {
      console.error("Resume analysis error:", error);

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Resume analysis failed. Please try another PDF or DOCX.",
      });
    }
  });
});

app.use((error, req, res, next) => {
  console.error("Server error:", error.message);

  res.status(500).json({
    success: false,
    message: error.message || "Internal server error.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("AI Resume Analyzer Backend Started");
  console.log(`Server URL: http://localhost:${PORT}`);
});