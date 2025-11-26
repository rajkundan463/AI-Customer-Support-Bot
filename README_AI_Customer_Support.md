#  AI Customer Support System

An intelligent full-stack customer support platform featuring real-time chat, AI-powered responses, FAQ automation, session tracking, and admin management — built with **React, Node.js, Express & MongoDB** (optional Flask LLM microservice supported).

---

## Live Demo
 **Frontend + Backend Hosted Together on Render**  
(https://ai-customer-support-bot-tg24.onrender.com/)


## Features

### Customer Chat Interface
- Real-time messaging
- AI-generated responses
- Click-to-ask FAQs
- Auto session creation
- Chat history & context memory
- Clear chat & start new conversation
- Light/Dark theme support

### Admin Dashboard
- Secure login (JWT Auth)
- View all user sessions
- Open conversation history
- Manage FAQs (Add, Edit, Delete, Search)
- Monitor escalations
- Resolve escalations
- Inspect AI responses

### System Capabilities
- REST API architecture
- MongoDB persistent storage
- LocalStorage-based chat caching
- Auto-escalation on low-confidence replies
- Single-server deployment supported

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Optional AI Service | Flask + Python |
| Deployment | Render |

---

## Project Structure
Ai_Customer_Support/
│
├── backend-node/
│   ├── app.js
│   ├── dist/              # React build served by Express
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       └── db/
│
├── backend-flask/ (optional)
│   ├── app.py
│   ├── services/
│   └── requirements.txt
│
└── frontend/
    └── src/


---

## Local Development Setup

### Clone Repo

```bash
git clone https://github.com/rajkundan463/AI-Customer-Support-Bot
cd Ai_Customer_Support
```

### Install & Run Node Backend
cd backend-node
npm install
npm run dev

Backend URL:
http://localhost:5000


### Install & Run React Frontend
cd frontend
npm install
npm run dev

Frontend URL:
http://localhost:5173

### Optional — Start Flask AI Service
cd backend-flask
pip install -r requirements.txt
python app.py

---

## Environment Variables

### backend-node (.env)

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000

### frontend (.env) — Only if deployed separately
VITE_API_BASE=https://your-backend-url.onrender.com

_Not needed in single-server deployment._ (very important)

---

## Production Deployment (Recommended)
# Build React inside backend-node:

cd frontend
npm run build
mv dist ../backend-node/

# Start Node server:

node app.js
Express will automatically serve UI + APIs.

---

## Core API Endpoints (Postman se check kro )

### Sessions
POST /sessions
GET  /sessions
GET  /sessions/:id

### Messages
POST /messages/:sessionId
GET  /messages/:sessionId

### FAQs
GET    /faqs?q=
POST   /faqs
PUT    /faqs/:id
DELETE /faqs/:id

### Escalations
POST   /escalate/:sessionId
GET    /escalate
DELETE /escalate/:id

### Auth
POST /auth/login
---

## Admin Login Credentials (Development)

```
username: admin
password: admin123
```

*(change in production)*

---

## Future Enhancements

- WebSockets live chat
- Chat analytics dashboard
- Multi-agent escalation routing
- File upload & attachments
- Email notifications
- Multi-language support

---

## Contribution 
 
 -My friends
 -some short of chatgpt


## License
MIT — free to use & modify.
---

##  Author

**Kundan Kumar**

---

