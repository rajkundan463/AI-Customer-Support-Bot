const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    answer: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

FAQSchema.index({ question: "text", answer: "text" });

module.exports = mongoose.model("FAQ", FAQSchema);
