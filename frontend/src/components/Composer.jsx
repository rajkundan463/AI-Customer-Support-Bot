import React, { useState } from "react";

export default function Composer({ onSend, disabled }) {
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };
  return (
    <div className="mt-4 flex items-center gap-2">
      <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder="Type your message..." className="flex-1 px-4 py-2 rounded bg-white/5 border" />
      <button onClick={submit} disabled={disabled} className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
    </div>
  );
}
