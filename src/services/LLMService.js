const axios = require("axios");
const FLASK_URL = process.env.FLASK_LLM_URL || "http://localhost:5001/generate";

module.exports = {
  callFlask: async (payload) => {
    try {
      const res = await axios.post(FLASK_URL, payload, {
        headers: { "Content-Type": "application/json" }
      });

      return res.data;

    } catch (err) {
      console.error("Flask LLM error:", err.message);

      return {
        answer: "AI service not available. Escalating...",
        confidence: 0.3,
        actions: ["escalate"]
      };
    }
  }
};
