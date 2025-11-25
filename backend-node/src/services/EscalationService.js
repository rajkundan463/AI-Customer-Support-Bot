const Escalation = require("../db/models/Escalation");
const Session = require("../db/models/Session");

module.exports = {
  // Create a new escalation + update session status
  createEscalation: async (sessionId, reason) => {
    // Create escalation entry
    const escalation = await Escalation.create({
      session_id: sessionId,
      reason,
    });

    // Update related session status (non-blocking)
    Session.findByIdAndUpdate(sessionId, { status: "escalated" }).catch(
      (err) => console.error("Failed to update session status:", err)
    );

    return escalation;
  },

  // Get ALL escalations sorted newest first
  getAll: () => {
    return Escalation.find().sort({ createdAt: -1 });
  },

  // ✅ Permanently delete escalation
  remove: (id) => {
    return Escalation.findByIdAndDelete(id);
  },
};
