const Escalation = require("../db/models/Escalation");
const Session = require("../db/models/Session");

module.exports = {
  
  createEscalation: async (sessionId, reason) => {
    
    const escalation = await Escalation.create({
      session_id: sessionId,
      reason,
    });

    
    Session.findByIdAndUpdate(sessionId, { status: "escalated" }).catch(
      (err) => console.error("Failed to update session status:", err)
    );

    return escalation;
  },

  
  getAll: () => {
    return Escalation.find().sort({ createdAt: -1 });
  },

  
  remove: (id) => {
    return Escalation.findByIdAndDelete(id);
  },
};
