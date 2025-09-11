// server.js
// Express backend for login and signup with MongoDB

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve login page at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login-wireframe.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { tls: true });

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
      return res.status(401).json({ error: "Invalid credentials." });
    }
    res.json({ message: `Login successful, welcome ${user.name}` });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Frontend available at http://localhost:${PORT}/login-wireframe.html`
  );
});
