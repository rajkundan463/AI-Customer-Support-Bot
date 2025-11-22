import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [escalations, setEscalations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load both lists
  useEffect(() => {
    async function load() {
      try {
        // Fetch sessions (all)
        const s = await api.getAllSessions?.();
        if (s?.data) setSessions(s.data);

        // Fetch escalations
        const e = await api.getEscalations();
        setEscalations(e.data || []);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <span className="text-sm text-gray-500">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Sessions */}
      <div className="md:col-span-2 p-4 rounded border" style={{ background: "var(--panel)" }}>
        <h3 className="font-semibold mb-4">Sessions</h3>

        <div className="space-y-3">
          {sessions.length === 0 && (
            <div className="text-sm text-[var(--muted)]">No sessions available.</div>
          )}

          {sessions.map((s) => (
            <div
              key={s._id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <div className="text-sm font-medium">Session: {s._id}</div>
                <div className="text-xs text-[var(--muted)]">Customer: {s.customerId}</div>
                <div className="text-xs text-[var(--muted)]">
                  Created: {new Date(s.createdAt).toLocaleString()}
                </div>
              </div>

              <Link
                to={`/session/${s._id}`}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Open
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Escalations */}
      <div className="p-4 rounded border" style={{ background: "var(--panel)" }}>
        <h3 className="font-semibold mb-4">Escalations</h3>

        <div className="space-y-3">
          {escalations.length === 0 && (
            <div className="text-sm text-[var(--muted)]">No escalations recorded.</div>
          )}

          {escalations.map((e) => (
            <div
              key={e._id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <div className="text-sm font-medium">Session: {e.session_id}</div>
                <div className="text-xs text-[var(--muted)]">{e.reason}</div>
                <div className="text-xs text-[var(--muted)]">
                  Time: {new Date(e.createdAt).toLocaleString()}
                </div>
              </div>

              <Link
                to={`/session/${e.session_id}`}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Open
              </Link>
            </div>
          ))}
        </div>

        {/* Small help box */}
        <div className="mt-6 p-3 border rounded bg-gray-50 dark:bg-gray-900">
          <h4 className="font-semibold">FAQ Manager</h4>
          <p className="text-sm text-[var(--muted)]">
            Use the FAQ Manager page to add, edit & delete FAQs.
          </p>

          <h4 className="font-semibold mt-4">Escalation Panel</h4>
          <p className="text-sm text-[var(--muted)]">
            View & manage escalations here.
          </p>
        </div>
      </div>

    </div>
  );
}
