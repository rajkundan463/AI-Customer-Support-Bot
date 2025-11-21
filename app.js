require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Import DB
const { sequelize } = require("./src/db/models");

// Import Routes
const sessionRoutes = require("./src/routes/sessions");
const messageRoutes = require("./src/routes/messages");
const faqRoutes = require("./src/routes/faqs");
const escalationRoutes = require("./src/routes/escalation");

const app = express();


// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes

app.use("/sessions", sessionRoutes);
app.use("/messages", messageRoutes);
app.use("/faqs", faqRoutes);
app.use("/escalate", escalationRoutes);


// error handling middleware

app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to DB
    await sequelize.authenticate();
    console.log("PostgreSQL connected!");

    app.listen(PORT, () => {
      console.log(`Node.js API running on port ${PORT} 🚀`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
