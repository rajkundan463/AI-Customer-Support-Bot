
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Load MongoDB connection
require("./src/config/dbconfig")

// Routes
const sessionRoutes = require("./src/routes/sessions");
const messageRoutes = require("./src/routes/messages");
const faqRoutes = require("./src/routes/faqs");
const escalationRoutes = require("./src/routes/escalation");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/sessions", sessionRoutes);
app.use("/messages", messageRoutes);
app.use("/faqs", faqRoutes);
app.use("/escalate", escalationRoutes);

const authRoutes = require("./src/routes/auth");
app.use("/auth", authRoutes);



// Health Route
app.get("/", (req, res) => {
  res.json({ status: "Node backend running" });
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT + " ");
});

module.exports = app;
