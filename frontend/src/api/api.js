import axios from "axios";

const NODE_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: NODE_BASE,
});

// Automatically attach token for protected admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  // 🔐 AUTH
  login: (username, password) =>
    api.post(`/auth/login`, { username, password }),

  // 💬 SESSIONS
  createSession: (customerId) =>
    api.post(`/sessions`, { customerId }),

  getSession: (id) =>
    api.get(`/sessions/${id}`),

  // 📩 MESSAGES
  sendMessage: (sessionId, text) =>
    api.post(`/messages/${sessionId}`, { text }),

  getMessages: (sessionId) =>
    api.get(`/messages/${sessionId}`),

  getMessageDetails: (sessionId, messageId) =>
    api.get(`/messages/${sessionId}/${messageId}`),

  // ❓ FAQ
  addFAQ: (faq) =>
    api.post(`/faqs`, faq),

  searchFAQ: (q) =>
    api.get(`/faqs?q=${encodeURIComponent(q)}`),

  deleteFAQ: (id) =>
    api.delete(`/faqs/${id}`),

  // 🚨 ESCALATIONS
  getEscalations: () =>
    api.get(`/escalate`),

  escalate: (sessionId, reason) =>
    api.post(`/escalate/${sessionId}`, { reason }),

  // 🧩 QUICK ACTIONS (if backend supports)
  getQuickActions: () =>
    api.get(`/quick-actions`),

  addQuickAction: (text) =>
    api.post(`/quick-actions`, { text }),

  deleteQuickAction: (id) =>
    api.delete(`/quick-actions/${id}`),

  deleteAllQuickActions: () =>
    api.delete(`/quick-actions`),

  incrementQuickAction: (text) =>
    api.post(`/quick-actions/increment`, { text }),
};
