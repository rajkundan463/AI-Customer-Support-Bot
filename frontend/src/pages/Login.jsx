import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.login(username, password);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="p-6 rounded shadow-md w-80" style={{ background: "var(--panel)" }}>
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        {error && (
          <div className="text-red-500 text-sm mb-3">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full px-3 py-2 bg-indigo-600 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
