const EscalationService = require("../services/EscalationService");

module.exports = {
  escalateSession: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const reason = req.body.reason || "manual";

      const escalation = await EscalationService.createEscalation(sessionId, reason);
      res.json(escalation);
    } catch (err) {
      console.error("Escalate error:", err);
      res.status(500).json({ error: "Failed to escalate session" });
    }
  },

  getAllEscalations: async (req, res) => {
    try {
      const escalations = await EscalationService.getAll();
      res.json(escalations);
      
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ error: "Failed to load escalations" });
    }
  },

 
  resolveEscalation: async (req, res) => {
    try {
      const { id } = req.params;
      await EscalationService.remove(id);
      console.log(id);

      res.json({ success: true, message: "Escalation removed from database" });
    } catch (err) {
      console.error("Resolve error:", err);
      res.status(500).json({ error: "Failed to resolve escalation" });
    }
  },
};
