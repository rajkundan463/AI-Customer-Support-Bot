const EscalationService = require("../services/EscalationService");

module.exports = {
  escalateSession: async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const reason = req.body.reason || "manual";

      // Mongoose service call
      const result = await EscalationService.createEscalation(sessionId, reason);

      return res.json(result);

    } catch (err) {
      console.error("Escalate error:", err);
      res.status(500).json({ error: "Failed to escalate session" });
    }
  },

  getAllEscalations: async (req, res) => {
    try {
      // Get all escalations, sorted
      const escalations = await EscalationService.getAll();

      return res.json(escalations);

    } catch (err) {
      console.error("Fetch escalations error:", err);
      res.status(500).json({ error: "Failed to load escalations" });
    }
  }
};
