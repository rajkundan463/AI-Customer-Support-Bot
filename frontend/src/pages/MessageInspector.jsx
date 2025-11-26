import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function MessageInspector() {
  const { sessionId, messageId } = useParams();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await api.getMessageDetails(sessionId, messageId);
        setMsg(r.data);
      } catch (err) {
        console.error("Message inspector failed", err);
      }
      setLoading(false);
    }

    load();
  }, [sessionId, messageId]);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <span className="text-sm text-[var(--muted)]">Loading message...</span>
      </div>
    );
  }

  if (!msg) {
    return (
      <div className="p-4">
        <p className="text-red-500 mb-4">Message not found.</p>
        <Link to={`/session/${sessionId}`} className="px-3 py-2 border rounded">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Message Inspector</h2>
        <Link to={`/session/${sessionId}`} className="px-3 py-1 border rounded">
          Back
        </Link>
      </div>

      
      <div className="p-4 rounded border" style={{ background: "var(--panel)" }}>
        <h3 className="font-semibold mb-2">Message Info</h3>

        <p><strong>ID:</strong> {msg._id}</p>
        <p><strong>Sender:</strong> {msg.sender}</p>
        <p><strong>Time:</strong> {new Date(msg.createdAt).toLocaleString()}</p>

        {msg.metadata?.confidence && (
          <p>
            <strong>Confidence:</strong>{" "}
            <span className={msg.metadata.confidence < 0.4 ? "text-red-500" : "text-green-600"}>
              {msg.metadata.confidence}
            </span>
          </p>
        )}

        {msg.metadata?.actions?.length > 0 && (
          <p>
            <strong>Actions:</strong>{" "}
            {msg.metadata.actions.join(", ")}
          </p>
        )}
      </div>

      
      {msg.metadata?.prompt && (
        <div className="p-4 rounded border" style={{ background: "var(--panel)" }}>
          <h3 className="font-semibold mb-2">LLM Prompt</h3>
          <pre className="bg-gray-200 p-2 rounded overflow-x-auto text-sm">
            {msg.metadata.prompt}
          </pre>
        </div>
      )}

      
      {msg.metadata?.raw && (
        <div className="p-4 rounded border" style={{ background: "var(--panel)" }}>
          <h3 className="font-semibold mb-2">Raw LLM Response</h3>
          <pre className="bg-gray-200 p-2 rounded overflow-x-auto text-sm">
            {JSON.stringify(msg.metadata.raw, null, 2)}
          </pre>
        </div>
      )}

      
      {msg.metadata?.error && (
        <div className="p-4 rounded border bg-red-50 border-red-300">
          <h3 className="font-semibold mb-2 text-red-600">Error</h3>
          <pre className="bg-red-100 p-2 rounded overflow-x-auto text-sm">
            {msg.metadata.error}
          </pre>
        </div>
      )}

    </div>
  );
}
