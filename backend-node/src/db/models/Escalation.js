const mongoose = require("mongoose");

const EscalationSchema = new mongoose.Schema({
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  reason: String,
  severity: { type: Number, default: 1 },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Escalation", EscalationSchema);
