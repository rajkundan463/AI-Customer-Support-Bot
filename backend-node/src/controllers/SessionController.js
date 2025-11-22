const Session = require("../db/models/Session");

module.exports = {
  createSession: async (req, res) => {
    try {
      const { customerId } = req.body;

      
      const session = await Session.create({ customerId });

      return res.json({ sessionId: session._id });  

    } catch (err) {
      console.error("Create session error:", err);
      res.status(500).json({ error: "Failed to create session" });
    }
  },

  getSession: async (req, res) => {
    try {
      
      const session = await Session.findById(req.params.sessionId);

      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      return res.json(session);

    } catch (err) {
      console.error("Get session error:", err);
      res.status(500).json({ error: "Failed to get session" });
    }
  }
};
