import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function SessionViewer() {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const s = await api.getSession(sessionId);
        const m = await api.getMessages(sessionId);

        setSession(s.data);
        setMessages(m.data || []);
      } catch (err) {
        console.error("Failed to load session", err);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-400">
        Loading session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400 text-lg font-semibold">Session not found.</p>
        <Link
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          to="/dashboard"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Session Viewer</h2>
        <Link
          className="px-4 py-2 border border-white/20 rounded text-white hover:bg-white/10 transition"
          to="/dashboard"
        >
          ← Back
        </Link>
      </div>

      {/* Session Details */}
      <div className="p-6 rounded-xl border border-white/10 bg-[var(--panel)] shadow">
        <h3 className="text-lg font-semibold text-white mb-3">Session Info</h3>

        <p className="text-gray-300">
          <strong className="text-white">ID:</strong> {session._id}
        </p>

        <p className="text-gray-300">
          <strong className="text-white">Customer:</strong> {session.customerId}
        </p>

        <p className="text-gray-300">
          <strong className="text-white">Status:</strong>{" "}
          <span
            className={`ml-2 px-2 py-1 rounded text-xs font-medium ${session.status === "escalated"
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
              }`}
          >
            {session.status}
          </span>
        </p>

        <p className="text-xs text-gray-500 mt-2">
          Created: {new Date(session.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Messages */}
      <div className="p-6 rounded-xl border border-white/10 bg-[var(--panel)] shadow h-[75vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Message History</h3>

        <div className="space-y-5">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`p-4 rounded-lg border transition ${m.sender === "customer"
                  ? "bg-[#1E293B] border-white/10 text-white"
                  : "bg-[#0F172A] border-indigo-500/40 text-indigo-200"
                }`}
            >
              {/* Sender */}
              <div className="font-semibold text-sm opacity-80 mb-1">
                {m.sender.toUpperCase()}
              </div>

              {/* Message Text */}
              <div className="text-base leading-relaxed whitespace-pre-wrap">
                {m.text}
              </div>

              {m.metadata && (
                <div className="mt-3 text-sm space-y-1 border border-white/10 rounded p-3 bg-black/20">
                  {m.metadata.answer && (
                    <p>
                      <span className="font-semibold text-indigo-300">AI Response:</span>{" "}
                      {m.metadata.answer}
                    </p>
                  )}

                  {m.metadata.confidence !== undefined && (
                    <p>
                      <span className="font-semibold text-yellow-300">Confidence:</span>{" "}
                      {(m.metadata.confidence * 100).toFixed(0)}%
                    </p>
                  )}

                  {m.metadata.actions && m.metadata.actions.length > 0 && (
                    <p>
                      <span className="font-semibold text-red-300">Actions:</span>{" "}
                      {m.metadata.actions.join(", ")}
                    </p>
                  )}
                </div>
              )}


              {/* Timestamp */}
              <div className="text-[10px] text-gray-400 mt-3">
                {new Date(m.createdAt).toLocaleString()}
              </div>

              {/* Inspect Link */}
              {m.sender === "bot" && (
                <Link
                  to={`/inspect/${sessionId}/${m._id}`}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline mt-2 inline-block"
                >
                  Inspect AI Response
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
