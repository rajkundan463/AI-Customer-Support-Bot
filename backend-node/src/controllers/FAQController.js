const FAQ = require("../db/models/FAQ");
const FAQService = require("../services/FAQService");

module.exports = {
  searchFAQ: async (req, res) => {
    try {
      const q = req.query.q || "";
      
      // search using FAQService (Mongoose-based)
      const matches = await FAQService.search(q);
      
      return res.json(matches);

    } catch (err) {
      console.error("FAQ search error:", err);
      res.status(500).json({ error: "Search failed" });
    }
  },

  addFAQ: async (req, res) => {
    try {
      // Mongoose create
      const faq = await FAQ.create(req.body);
      return res.json(faq);

    } catch (err) {
      console.error("Add FAQ error:", err);
      res.status(500).json({ error: "Failed to add FAQ" });
    }
  }
};
