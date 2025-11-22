import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function SessionViewer() {
  const { sessionId } = useParams();  // <-- more explicit than "id"

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

  // --------------------
  // RENDER STATES
  // --------------------

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Loading session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-4">
        <p className="text-red-500 font-semibold">Session not found.</p>
        <Link
          className="mt-3 inline-block px-3 py-1 border rounded"
          to="/dashboard"
        >
          Back
        </Link>
      </div>
    );
  }

  // --------------------
  // MAIN VIEW
  // --------------------

  return (
    <div className="space-y-6">

      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Session Viewer</h2>
        <Link className="px-3 py-1 border rounded" to="/dashboard">
          Back
        </Link>
      </div>

      {/* Session Info */}
      <div className="p-4 rounded border" style={{ background: "var(--panel)" }}>
        <h3 className="text-lg font-semibold mb-2">Session Info</h3>

        <p><strong>ID:</strong> {session._id}</p>
        <p><strong>Customer:</strong> {session.customerId}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`ml-2 px-2 py-1 rounded text-white ${
              session.status === "escalated" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {session.status}
          </span>
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Created: {new Date(session.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Message History */}
      <div className="p-4 rounded border" style={{ background: "var(--panel)" }}>
        <h3 className="text-lg font-semibold mb-4">Message History</h3>

        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`p-3 rounded border ${
                m.sender === "customer" ? "bg-white" : "bg-green-50"
              }`}
            >
              {/* Sender */}
              <div className="font-medium">{m.sender.toUpperCase()}</div>

              {/* Text */}
              <div className="mb-2">{m.text}</div>

              {/* Metadata */}
              {m.metadata && (
                <pre className="text-xs bg-gray-200 p-2 rounded overflow-x-auto">
                  {JSON.stringify(m.metadata, null, 2)}
                </pre>
              )}

              {/* Timestamp */}
              <div className="text-xs text-gray-400 mt-1">
                {new Date(m.createdAt).toLocaleString()}
              </div>

              {/* Inspect Button */}
              {m.sender === "bot" && (
                <Link
                  to={`/inspect/${sessionId}/${m._id}`}
                  className="text-xs text-blue-600 underline mt-2 inline-block"
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
