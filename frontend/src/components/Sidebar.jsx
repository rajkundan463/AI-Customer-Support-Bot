import React from "react";
import {
  FiMoon,
  FiMessageCircle,
  FiList,
  FiHome,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ onToggleTheme }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-72 p-6 border-r flex flex-col" style={{ background: "var(--panel)" }}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">AI Support</h2>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title="Toggle theme"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FiMoon />
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 text-[var(--muted)]">
        {/* Chat – always visible */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded ${
              isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`
          }
        >
          <FiHome /> Chat
        </NavLink>

        {/* Admin-only links */}
        {token && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <FiGrid /> Dashboard
            </NavLink>

            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <FiList /> FAQ Manager
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer Area */}
      <div className="mt-auto pt-6 text-xs text-[var(--muted)]">

        {!token ? (
          <NavLink
            to="/login"
            className="block text-sm underline hover:text-indigo-600"
          >
            Administrators 
          </NavLink>
        ) : (
          <button
            onClick={logout}
            className="mt-2 flex items-center gap-2 px-3 py-2 border rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiLogOut /> Logout
          </button>
        )}

        <div className="mt-4">
          AI Customer Support System
        </div>
      </div>
    </aside>
  );
}
