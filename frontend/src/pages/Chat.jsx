import React, { useEffect, useState } from "react";
import api from "../api/api";
import ChatWindow from "../components/ChatWindow";
import Composer from "../components/Composer";

const SESSION_KEY = "support_session_id";
const MEM_KEY = "support_local_mem";

export default function Chat() {
  const [sessionId, setSessionId] = useState(localStorage.getItem(SESSION_KEY));
  const [messages, setMessages] = useState(() => {
    const raw = localStorage.getItem(MEM_KEY);
    return raw ? JSON.parse(raw) : [];
  });
  const [loading, setLoading] = useState(false);
  const [statusBadge, setStatusBadge] = useState(null);
  const [faqList, setFaqList] = useState([]);

  // Fetch FAQs once
  useEffect(() => {
    api.searchFAQ("")
      .then((r) => setFaqList(r.data || []))
      .catch(() => {});
  }, []);

  // Store messages locally
  useEffect(() => {
    localStorage.setItem(MEM_KEY, JSON.stringify(messages));
  }, [messages]);

  // Create session or load messages
  useEffect(() => {
    if (!sessionId) {
      api
        .createSession("web_user")
        .then((res) => {
          setSessionId(res.data.sessionId);
          localStorage.setItem(SESSION_KEY, res.data.sessionId);
        })
        .catch(() => {});
    } else {
      api
        .getMessages(sessionId)
        .then((r) => setMessages(r.data || []))
        .catch(() => {});
    }
  }, [sessionId]);

  // Allow FAQ button to trigger send()
  useEffect(() => {
    const handler = (e) => {
      send(e.detail);
    };
    window.addEventListener("askFAQ", handler);
    return () => window.removeEventListener("askFAQ", handler);
  }, [sessionId, messages]);

  const send = async (text) => {
    if (!sessionId) return;

    const userMsg = {
      sender: "customer",
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.sendMessage(sessionId, text);
      const bot = res.data;

      const botMsg = {
        sender: "bot",
        text: bot.answer || String(bot),
        metadata: bot,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (bot.actions && bot.actions.includes("escalate")) {
        setStatusBadge("escalated");
        await api.escalate(sessionId, "auto: low confidence");
      } else {
        setStatusBadge(null);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Service error — try again.",
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setLoading(false);
  };

  // ✅ Clear chat + reset session + wipe local memory
  const clearChat = () => {
    localStorage.removeItem(MEM_KEY);
    localStorage.removeItem(SESSION_KEY);
    setMessages([]);
    setSessionId(null); // triggers new session creation
    setStatusBadge(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customer Chat</h3>
          <div>
            {statusBadge ? (
              <span className="text-sm text-red-500">Escalated</span>
            ) : (
              <span className="text-sm text-green-600">Bot</span>
            )}
          </div>
        </div>
        <ChatWindow messages={messages} loading={loading} onSend={send} />
      </div>

      <div className="space-y-6">
        {/* FAQ Panel */}
        <div className="p-4 rounded" style={{ background: "var(--panel)" }}>
          <h4 className="font-semibold mb-3">FAQs</h4>
          <div className="space-y-2">
            {faqList.map((f) => (
              <button
                key={f._id}
                className="w-full text-left p-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => send(f.question)}
              >
                {f.question}
              </button>
            ))}
          </div>
        </div>

        {/* Session History */}
        <div className="p-4 rounded" style={{ background: "var(--panel)" }}>
          <h4 className="font-semibold">Session History</h4>
          <p className="text-sm text-[var(--muted)]">
            Last {messages.length} messages stored locally.
          </p>

          <button
            className="mt-2 px-3 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={clearChat}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}
