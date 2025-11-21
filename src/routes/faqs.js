const express = require("express");
const router = express.Router();
const FAQController = require("../controllers/FAQController");

router.get("/", FAQController.searchFAQ);
router.post("/", FAQController.addFAQ);

module.exports = router;
