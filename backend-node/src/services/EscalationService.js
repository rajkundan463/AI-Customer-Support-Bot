const Escalation = require("../db/models/Escalation");
const Session = require("../db/models/Session");

module.exports = {
  createEscalation: async (sessionId, reason) => {
    // Create escalation entry
    const esc = await Escalation.create({
      session_id: sessionId,
      reason
    });

    // Update session status
    await Session.findByIdAndUpdate(
      sessionId,
      { status: "escalated" }
    );

    return esc;
  },

  getAll: async () => {
    // Sort using MongoDB syntax
    return await Escalation.find().sort({ createdAt: -1 });
  }
};
