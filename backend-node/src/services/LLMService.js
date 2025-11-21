const axios = require("axios");
const FLASK_URL = process.env.FLASK_LLM_URL;

module.exports = {
  callFlask: async (payload) => {
    try {
      const res = await axios.post(FLASK_URL, payload);
      return res.data;
    } catch (err) {
      console.error("Flask error:", err.message);
      return {
        answer: "AI service error, escalating...",
        confidence: 0.2,
        actions: ["escalate"]
      };
    }
  }
};
