import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [escalations, setEscalations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const s = await api.getAllSessions();
        setSessions(s.data || []);

        const e = await api.getEscalations();
        setEscalations(e.data || []);
      } catch (err) {
        console.error("Dashboard load failed:", err);
      }
      setLoading(false);
    }

    load();
  }, []);

  const resolve = async (id) => {
    if (!window.confirm("Resolve this escalation?")) return;
    try {
      await api.resolveEscalation(id);
      setEscalations((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert("Unable to resolve. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl shadow bg-indigo-600 text-white">
          <h3 className="text-sm opacity-80">Total Sessions</h3>
          <p className="text-3xl font-bold mt-1">{sessions.length}</p>
        </div>

        <div className="p-5 rounded-xl shadow bg-orange-500 text-white">
          <h3 className="text-sm opacity-80">Active Escalations</h3>
          <p className="text-3xl font-bold mt-1">{escalations.length}</p>
        </div>

        <div className="p-5 rounded-xl shadow bg-green-600 text-white">
          <h3 className="text-sm opacity-80">Bot Confidence</h3>
          <p className="text-3xl font-bold mt-1">92%</p>
        </div>
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sessions List */}
        <div className="rounded-xl border shadow bg-[var(--panel)] p-5 flex flex-col h-[75vh]">
          <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>

          <div className="overflow-y-auto space-y-4">
            {sessions.length === 0 && (
              <p className="text-sm text-gray-400">No sessions found.</p>
            )}

            {sessions.map((s) => (
              <div
                key={s._id}
                className="border rounded-lg p-4 bg-white/5 backdrop-blur hover:bg-white/10 transition"
              >
                <div className="font-medium text-sm">Session: {s._id}</div>
                <div className="text-xs text-gray-400">Customer: {s.customerId}</div>
                <div className="text-xs text-gray-400 mb-3">
                  {new Date(s.createdAt).toLocaleString()}
                </div>

                <Link
                  to={`/session/${s._id}`}
                  className="text-indigo-500 text-sm font-medium hover:underline"
                >
                  View Conversation →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Escalations List */}
        <div className="rounded-xl border shadow bg-[var(--panel)] p-5 flex flex-col h-[75vh]">
          <h3 className="text-lg font-semibold mb-4">Escalations</h3>

          <div className="overflow-y-auto space-y-4">
            {escalations.length === 0 && (
              <p className="text-sm text-gray-400">No escalations recorded.</p>
            )}

            {escalations.map((e) => (
              <div
                key={e._id}
                className="border rounded-lg p-4 bg-white/5 backdrop-blur hover:bg-white/10 transition"
              >
                <div className="font-medium text-sm">
                  Session: {e.session_id?._id || e.session_id}
                </div>
                <div className="text-xs text-gray-400">{e.reason}</div>
                <div className="text-xs text-gray-400 mb-3">
                  {new Date(e.createdAt).toLocaleString()}
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/session/${e.session_id}`}
                    className="text-indigo-500 text-sm font-medium hover:underline"
                  >
                    Open
                  </Link>

                  <button
                    onClick={() => resolve(e._id)}
                    className="text-green-500 text-sm font-medium hover:underline"
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
