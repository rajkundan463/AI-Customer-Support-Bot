import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function FAQManager() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  
  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const res = await api.searchFAQ("");
      setList(res.data);
    } catch (err) {
      console.error("FAQ load failed", err);
    }
  };

  const add = async () => {
    if (!q.trim() || !a.trim()) return;
    const res = await api.addFAQ({ question: q, answer: a });
    setList((prev) => [res.data, ...prev]);
    setQ("");
    setA("");
  };

  const startEdit = (f) => {
    setEditing(f);
    setQ(f.question);
    setA(f.answer);
  };

  const saveEdit = async () => {
    try {
      await api.updateFAQ(editing._id, { question: q, answer: a });
      loadFAQs();
      setEditing(null);
      setQ("");
      setA("");
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    await api.deleteFAQ(id);
    setList((prev) => prev.filter((x) => x._id !== id));
  };

  const askBot = (q) =>
    window.dispatchEvent(new CustomEvent("askFAQ", { detail: q }));

  return (
    <div className="space-y-8 p-4">

      
      <div className="flex gap-3 items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs"
          className="flex-1 px-4 py-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] border border-[var(--input-border)] focus:border-indigo-500 outline-none"
        />

        <button
          onClick={async () => {
            const r = await api.searchFAQ(search);
            setList(r.data);
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          Search
        </button>

        <button
          onClick={() => {
            setSearch("");
            loadFAQs();
          }}
          className="px-4 py-2 border border-[var(--input-border)] hover:bg-white/10 text-white rounded-lg transition"
        >
          Reset
        </button>
      </div>

      
      <div className="p-6 rounded-xl border border-white/10 bg-[var(--panel)] shadow space-y-4">
        <h3 className="text-lg font-semibold text-white">
          {editing ? "Edit FAQ" : "Add FAQ"}
        </h3>

        <input
          className="w-full px-4 py-2 rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] border border-[var(--input-border)] focus:border-indigo-500 outline-none"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Question"
        />

        <textarea
          className="w-full px-4 py-2 rounded-lg min-h-[90px] bg-[var(--input-bg)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] border border-[var(--input-border)] focus:border-indigo-500 outline-none"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Answer"
        />

        {editing ? (
          <div className="flex gap-3">
            <button
              onClick={saveEdit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(null);
                setQ("");
                setA("");
              }}
              className="px-4 py-2 border border-[var(--input-border)] hover:bg-white/10 text-white rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={add}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Add FAQ
          </button>
        )}
      </div>

     
      <div className="space-y-4">
        {list.map((f) => (
          <div
            key={f._id}
            className="p-4 rounded-xl border border-white/10 bg-[var(--panel)] shadow flex justify-between items-start"
          >
            <div className="space-y-1">
              <h4 className="font-medium text-white">{f.question}</h4>
              <p className="text-gray-400 text-sm">{f.answer}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => askBot(f.question)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition"
              >
                Ask Bot
              </button>

              <button
                onClick={() => startEdit(f)}
                className="px-3 py-1 border border-[var(--input-border)] hover:bg-white/10 text-white rounded-lg text-xs transition"
              >
                Edit
              </button>

              <button
                onClick={() => remove(f._id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-gray-400 text-center text-sm">No FAQs found.</p>
        )}
      </div>
    </div>
  );
}
