import React from "react";
import { motion } from "framer-motion";

export default function MessageBubble({ message }) {
  const isUser = message.sender === "customer";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <motion.div initial={{ scale: 0.98 }} animate={{ scale:1 }} className={`max-w-[80%] p-3 rounded-lg ${isUser ? "bg-indigo-600 text-white" : "bg-[var(--bg)] border"}`}>
        <div className="text-sm">{message.text}</div>
        {message.metadata?.confidence!==undefined && <div className="text-xs mt-1 text-[var(--muted)]">confidence: {Number(message.metadata.confidence).toFixed(2)}</div>}
      </motion.div>
    </div>
  );
}
