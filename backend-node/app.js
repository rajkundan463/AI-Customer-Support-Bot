require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Load MongoDB connection
require("./src/config/dbconfig");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API Routes
const sessionRoutes = require("./src/routes/sessions");
const messageRoutes = require("./src/routes/messages");
const faqRoutes = require("./src/routes/faqs");
const escalationRoutes = require("./src/routes/escalation");
const authRoutes = require("./src/routes/auth");

app.use("/sessions", sessionRoutes);
app.use("/messages", messageRoutes);
app.use("/faqs", faqRoutes);
app.use("/escalate", escalationRoutes);
app.use("/auth", authRoutes);

// Health Route  keep before SPA fallback
app.get("/health", (req, res) => {
  res.json({ status: "Node backend running" });
});

//  Serve React build folder
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

//  SPA fallback — works in Express 5
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

module.exports = app;
