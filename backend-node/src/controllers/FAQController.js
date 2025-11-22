const FAQ = require("../db/models/FAQ");
const FAQService = require("../services/FAQService");

module.exports = {

  // 🔍 Search FAQ
  searchFAQ: async (req, res) => {
    try {
      const q = req.query.q || "";
      const matches = await FAQService.search(q);
      return res.json(matches);
    } catch (err) {
      console.error("FAQ search error:", err);
      res.status(500).json({ error: "Search failed" });
    }
  },

  // ➕ Add new FAQ
  addFAQ: async (req, res) => {
    try {
      const { question, answer } = req.body;
      if (!question || !answer) {
        return res.status(400).json({ error: "Question and answer required" });
      }

      const faq = await FAQ.create({ question, answer });
      return res.json(faq);
    } catch (err) {
      console.error("Add FAQ error:", err);
      res.status(500).json({ error: "Failed to add FAQ" });
    }
  },

  // 📝 Update FAQ (OPTIONAL: frontend does delete + add, but good to have)
  updateFAQ: async (req, res) => {
    try {
      const { id } = req.params;
      const { question, answer } = req.body;

      const updated = await FAQ.findByIdAndUpdate(
        id,
        { question, answer },
        { new: true }
      );

      return res.json(updated);
    } catch (err) {
      console.error("Update FAQ error:", err);
      res.status(500).json({ error: "Failed to update FAQ" });
    }
  },

  // ❌ Delete FAQ
  deleteFAQ: async (req, res) => {
    try {
      const { id } = req.params;

      await FAQ.findByIdAndDelete(id);

      return res.json({ success: true });
    } catch (err) {
      console.error("Delete FAQ error:", err);
      res.status(500).json({ error: "Failed to delete FAQ" });
    }
  }
};
