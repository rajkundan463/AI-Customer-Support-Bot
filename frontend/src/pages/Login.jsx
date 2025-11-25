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
  <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
    <div className="p-8 rounded-xl shadow-lg w-96 bg-[var(--panel)] border border-white/10">
      <h2 className="text-2xl font-semibold mb-6 text-white">Admin Login</h2>

      {error && (
        <div className="text-red-400 text-sm mb-4 bg-red-500/10 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-400 border border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);
}
