const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.post("/:sessionId", MessageController.processMessage);
router.get("/:sessionId", MessageController.getMessages);

module.exports = router;
