const express = require("express");
const router = express.Router();
const FAQController = require("../controllers/FAQController");


router.get("/", FAQController.searchFAQ);


router.post("/", FAQController.addFAQ);


router.put("/:id", FAQController.updateFAQ);


router.delete("/:id", FAQController.deleteFAQ);

module.exports = router;
