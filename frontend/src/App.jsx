import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import FAQManager from "./components/FAQManager";
import Sidebar from "./components/Sidebar";
import SessionViewer from "./pages/SessionViewer";
import MessageInspector from "./pages/MessageInspector";
import Login from "./pages/Login";
import Protected from "./components/Protected";

export default function App() {
  const location = useLocation();

  
  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "1");

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark ? "1" : "0");
  }, [dark]);

  
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">

      {!hideSidebar && <Sidebar onToggleTheme={() => setDark(d => !d)} />}

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">

          <Routes>

            
            <Route path="/login" element={<Login />} />

            
            <Route path="/" element={<Chat />} />

            
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />

            <Route
              path="/faqs"
              element={
                <Protected>
                  <FAQManager />
                </Protected>
              }
            />

            <Route
              path="/session/:sessionId"
              element={
                <Protected>
                  <SessionViewer />
                </Protected>
              }
            />

            <Route
              path="/inspect/:sessionId/:messageId"
              element={
                <Protected>
                  <MessageInspector />
                </Protected>
              }
            />

            
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </main>
    </div>
  );
}