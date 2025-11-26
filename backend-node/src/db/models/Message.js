const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  sender: { type: String, required: true }, 
  text: { type: String, required: true },
  metadata: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
