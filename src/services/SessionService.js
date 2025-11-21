const { Message, FAQ, Session, Escalation } = require("../db");

module.exports = {
  getLastMessages: async (sessionId, limit = 10) => {
    const msgs = await Message.findAll({
      where: { session_id: sessionId },
      order: [["createdAt", "DESC"]],
      limit
    });

    return msgs
      .reverse()
      .map(m => `${m.sender}: ${m.text}`)
      .join("\n");
  },

  getSummary: async (sessionId) => {
    const msgs = await Message.findAll({
      where: { session_id: sessionId },
      order: [["createdAt", "ASC"]]
    });

    const lastText = msgs.map(m => m.text).join("\n");
    return lastText.slice(0, 500);
  },

  getFAQMatches: async (query) => {
    // simplest: keyword search
    const all = await FAQ.findAll();

    return all
      .filter(f => f.question.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(f => ({ q: f.question, a: f.answer }));
  }
};
