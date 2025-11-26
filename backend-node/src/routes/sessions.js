const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/SessionController");


router.post("/", SessionController.createSession);
router.get("/", SessionController.getAllSessions);
router.get("/:sessionId", SessionController.getSession);

module.exports = router;
