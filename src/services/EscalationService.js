const { Escalation, Session } = require("../db");

module.exports = {
  createEscalation: async (sessionId, reason) => {
    const esc = await Escalation.create({ session_id: sessionId, reason });

    await Session.update(
      { status: "escalated" },
      { where: { id: sessionId } }
    );

    return esc;
  },

  getAll: async () => {
    return Escalation.findAll({ order: [["createdAt", "DESC"]] });
  }
};
