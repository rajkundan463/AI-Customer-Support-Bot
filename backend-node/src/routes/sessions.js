const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/SessionController");

// ✅ Create a new session
router.post("/", SessionController.createSession);

// ✅ Get ALL sessions (required for Dashboard)
router.get("/", SessionController.getAllSessions);

// ✅ Get a single session by ID
router.get("/:sessionId", SessionController.getSession);

module.exports = router;
