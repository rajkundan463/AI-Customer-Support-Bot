import axios from "axios";


const api = axios.create({
  baseURL: "/", 
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  
  login: (username, password) =>
    api.post("auth/login", { username, password }),

  
  createSession: (customerId) =>
    api.post("sessions", { customerId }),

  getSession: (id) =>
    api.get(`sessions/${id}`),

  getAllSessions: () =>
    api.get("sessions"),

  
  sendMessage: (sessionId, text) =>
    api.post(`messages/${sessionId}`, { text }),

  getMessages: (sessionId) =>
    api.get(`messages/${sessionId}`),

  getMessageDetails: (sessionId, messageId) =>
    api.get(`messages/${sessionId}/${messageId}`),

  
  addFAQ: (faq) =>
    api.post("faqs", faq),

  searchFAQ: (q) =>
    api.get(`faqs?q=${encodeURIComponent(q)}`),

  deleteFAQ: (id) =>
    api.delete(`faqs/${id}`),

  updateFAQ: (id, faq) =>
    api.put(`faqs/${id}`, faq),

  
  getEscalations: () =>
    api.get("escalate"),

  escalate: (sessionId, reason) =>
    api.post(`escalate/${sessionId}`, { reason }),

  resolveEscalation: (id) =>
    api.delete(`escalate/${id}`),
};
