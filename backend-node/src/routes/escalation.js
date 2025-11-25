const express = require("express");
const router = express.Router();
const EscalationController = require("../controllers/EscalationController");

router.post("/:sessionId", EscalationController.escalateSession);
router.get("/", EscalationController.getAllEscalations);
router.delete("/:id", EscalationController.resolveEscalation);

module.exports = router;
