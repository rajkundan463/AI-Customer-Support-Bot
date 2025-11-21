const express = require("express");
const router = express.Router();
const EscalationController = require("../controllers/EscalationController");

router.post("/:sessionId", EscalationController.escalateSession);
router.get("/", EscalationController.getAllEscalations);

module.exports = router;
