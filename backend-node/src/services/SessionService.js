const Message = require("../db/models/Message");
const FAQ = require("../db/models/FAQ");

module.exports = {
  getLastMessages: async (sessionId, limit = 10) => {
    const msgs = await Message
      .find({ session_id: sessionId })
      .sort({ createdAt: -1 })
      .limit(limit);

    return msgs
      .reverse()
      .map(m => `${m.sender}: ${m.text}`);
  },

  getSummary: async (sessionId) => {
    const msgs = await Message.find({ session_id: sessionId });
    const text = msgs.map(m => m.text).join("\n");
    return text.slice(0, 500);
  },

  getFAQMatches: async (query) => {
    const faqs = await FAQ.find({});
    return faqs
      .filter(f => f.question.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(f => ({ q: f.question, a: f.answer }));
  }
};
