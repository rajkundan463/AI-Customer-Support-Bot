const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  status: { type: String, default: "active" }, // active | escalated | closed
}, { timestamps: true });

module.exports = mongoose.model("Session", SessionSchema);

