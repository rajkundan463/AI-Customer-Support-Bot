const { Message } = require("../db");
const SessionService = require("../services/SessionService");
const LLMService = require("../services/LLMService");

module.exports = {
  processMessage: async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const userMsg = req.body.text;

      // Save user message
      await Message.create({
        session_id: sessionId,
        sender: "customer",
        text: userMsg
      });

      // Gather context
      const history = await SessionService.getLastMessages(sessionId);
      const summary = await SessionService.getSummary(sessionId);
      const faqMatches = await SessionService.getFAQMatches(userMsg);

      // Send to Flask LLM microservice
      const botResponse = await LLMService.callFlask({
        user_message: userMsg,
        session_summary: summary,
        history,
        faq: faqMatches
      });

      // Save bot reply
      await Message.create({
        session_id: sessionId,
        sender: "bot",
        text: botResponse.answer,
        metadata: botResponse
      });

      return res.json(botResponse);

    } catch (err) {
      console.error("Process msg error:", err);
      res.status(500).json({ error: "Failed to process message" });
    }
  },

  getMessages: async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const messages = await Message.findAll({
        where: { session_id: sessionId },
        order: [["createdAt", "ASC"]]
      });
      return res.json(messages);

    } catch (err) {
      console.error("Get messages error:", err);
      res.status(500).json({ error: "Failed to load messages" });
    }
  }
};
