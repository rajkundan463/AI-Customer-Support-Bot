const Message = require("../db/models/Message");
const SessionService = require("../services/SessionService");
const LLMService = require("../services/LLMService");

module.exports = {
  processMessage: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { text } = req.body;

      // Save user message
      await Message.create({
        session_id: sessionId,
        sender: "customer",
        text
      });

      const history = await SessionService.getLastMessages(sessionId);
      const summary = await SessionService.getSummary(sessionId);
      const faqMatches = await SessionService.getFAQMatches(text);

      const botResponse = await LLMService.callFlask({
        user_message: text,
        session_summary: summary,
        history,
        faq: faqMatches
      });

      await Message.create({
        session_id: sessionId,
        sender: "bot",
        text: botResponse.answer,
        metadata: botResponse
      });

      res.json(botResponse);

    } catch (err) {
      console.error("Message error:", err);
      res.status(500).json({ error: "Failed to process message" });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { sessionId } = req.params;

      const messages = await Message.find({ session_id: sessionId }).sort({
        createdAt: 1
      });

      res.json(messages);

    } catch (err) {
      console.error("Get messages error:", err);
      res.status(500).json({ error: "Failed to get messages" });
    }
  }
};


module.exports.getMessageDetails = async (req, res) => {
  try {
    const { sessionId, messageId } = req.params;

    const msg = await Message.findOne({ _id: messageId, sessionId });

    if (!msg) return res.status(404).json({ error: "Not found" });

    return res.json(msg);
  } catch (err) {
    console.error("Message inspector error:", err);
    res.status(500).json({ error: "Failed to load message" });
  }
};

