import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading, onSend }) {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[90vh] bg-[#0E1A2B] rounded-lg overflow-hidden">

      
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4"
        style={{ background: "var(--panel)" }}
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}

        {loading && (
          <div className="mt-2 inline-block px-3 py-2 rounded bg-slate-700 text-white">
            Bot is typing…
          </div>
        )}
      </div>

      
      <div className="bg-[#0E1A2B] border-t border-slate-700 p-3">
        <div className="flex gap-2">

          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 rounded bg-slate-700 text-white outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = inputRef.current.value.trim();
                if (value) {
                  onSend(value);
                  inputRef.current.value = "";
                }
              }
            }}
          />

          <button
            onClick={() => {
              const value = inputRef.current.value.trim();
              if (value) {
                onSend(value);
                inputRef.current.value = "";
              }
            }}
            className="px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}
