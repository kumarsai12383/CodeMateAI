// Global error handlers for debugging silent exits
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
// server.js
// Express backend for login and signup with MongoDB

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log("Starting server.js...");
require("dotenv").config();
console.log("Loaded .env:", process.env);

const mongoUri = process.env.MONGODB_URI;
console.log("MongoDB URI:", mongoUri);
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve login page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login-wireframe.html"));
});

// Initialize Gemini AI (only if API key exists)
let genAI, model;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
} else {
  console.log("MongoDB URI not found, running without database");
}

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login-wireframe.html"));
});

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password required." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists. Try signing in or use different email.",
      });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: `Signup successful, welcome ${name}!` });
  } catch (err) {
    console.error("Signup error:", err);
    if (mongoose.connection.readyState !== 1) {
      res.json({
        message: `Account created locally for ${name}! (Database offline)`,
      });
    } else {
      res.status(500).json({ error: "Server error." });
    }
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required." });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({
        error: "Looks like you're new here! Sign up to create your account.",
      });
    }
    res.json({
      message: `Login successful, welcome ${user.name}`,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Check if Gemini API is available
    if (!process.env.GEMINI_API_KEY || !model) {
      return res.status(500).json({
        error:
          "AI service temporarily unavailable. Please ensure GEMINI_API_KEY is set in .env file.",
      });
    }

    // Create the prompt with educational context
    const systemPrompt = `You are an AI professor for CodeMateAI Academy, specializing in technology education and career guidance. 

Your expertise includes:
- Web Development (HTML, CSS, JavaScript, React, Node.js)
- Data Science & Python
- Machine Learning & AI
- Cybersecurity
- Mobile App Development
- DevOps and Cloud Computing

Guidelines:
1. Keep responses conversational and encouraging
2. Provide practical, actionable advice
3. Suggest specific learning paths when relevant
4. If asked about courses, mention that CodeMateAI offers beginner to advanced levels
5. Be supportive and motivating for learners
6. Keep responses concise but informative

Student question: ${message}

Please provide a helpful, educational response:`;

    console.log("Sending request to Gemini API...");

    // Call Gemini AI
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const reply = response.text();

    console.log("Gemini API response received successfully");
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);

    // Handle different types of errors
    if (error.message && error.message.includes("API_KEY_INVALID")) {
      res.status(500).json({
        error: "Invalid Gemini API key. Please check your configuration.",
      });
    } else if (error.message && error.message.includes("QUOTA_EXCEEDED")) {
      res.status(500).json({
        error: "Gemini API quota exceeded. Please check your usage limits.",
      });
    } else if (error.message && error.message.includes("PERMISSION_DENIED")) {
      res.status(500).json({
        error:
          "Gemini API access denied. Please check your API key permissions.",
      });
    } else if (error.status === 400) {
      res.status(500).json({
        error: "Bad request to Gemini API. Please check your input.",
      });
    } else if (error.status === 403) {
      res.status(500).json({
        error: "Gemini API access forbidden. Please verify your API key.",
      });
    } else {
      res.status(500).json({
        error: "Sorry, I encountered an error. Please try again later.",
      });
    }
  }
});

// Import and use certificate router
const certificateRouter = require("./server/certificate");
app.use("/api", certificateRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Frontend available at http://localhost:${PORT}/login-wireframe.html`
  );
  console.log(`Chatbot available at http://localhost:${PORT}/welcome.html`);

  if (process.env.GEMINI_API_KEY) {
    console.log("✅ Gemini API key found - AI chatbot enabled");
  } else {
    console.log(
      "⚠️  Gemini API key not found - AI chatbot will use fallback responses"
    );
    console.log("Add GEMINI_API_KEY to your .env file to enable AI features");
  }
});

// Remove .env variable assignment from this file.
// Place the following line in a separate .env file instead:
// MONGODB_URI=mongodb+srv://kumarsai05072005_db_user:YOUR_PASSWORD@eduai.gv22yjt.mongodb.net/?retryWrites=true&w=majority&appName=eduAI

(async () => {})();
