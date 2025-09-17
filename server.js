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

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // In production, hash passwords!
});
const User = mongoose.model("User", userSchema);

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required." });
  }
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Signup successful please login." });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: "Email already exists, please login." });
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
        error: "Looks like you’re new here! Sign up to create your account.",
      });
    }
    res.json({ message: `Login successful, welcome ${user.name}` });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// Import and use certificate router
const certificateRouter = require("./server/certificate");
app.use("/api", certificateRouter);

// Start server
// Endpoint to list available Gemini models for debugging

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Frontend available at http://localhost:${PORT}/login-wireframe.html`
  );
});

// Remove .env variable assignment from this file.
// Place the following line in a separate .env file instead:
// MONGODB_URI=mongodb+srv://kumarsai05072005_db_user:YOUR_PASSWORD@eduai.gv22yjt.mongodb.net/?retryWrites=true&w=majority&appName=eduAI

(async () => {})();
