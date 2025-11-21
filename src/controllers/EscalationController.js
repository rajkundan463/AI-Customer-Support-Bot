const EscalationService = require("../services/EscalationService");

module.exports = {
  escalateSession: async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const reason = req.body.reason || "manual";

      const result = await EscalationService.createEscalation(sessionId, reason);
      return res.json(result);

    } catch (err) {
      console.error("Escalate error:", err);
      res.status(500).json({ error: "Failed to escalate" });
    }
  },

  getAllEscalations: async (req, res) => {
    try {
      const escalations = await EscalationService.getAll();
      return res.json(escalations);
    } catch (err) {
      console.error("Fetch escalations error:", err);
      res.status(500).json({ error: "Failed to load escalations" });
    }
  }
};
