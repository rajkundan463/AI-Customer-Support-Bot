const mongoose = require("mongoose");

const EscalationSchema = new mongoose.Schema(
  {
    session_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true, // ✅ faster lookup in dashboard
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ["pending", "resolved"], // ✅ avoid invalid values
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

// ✅ Sort newest first automatically
EscalationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Escalation", EscalationSchema);
