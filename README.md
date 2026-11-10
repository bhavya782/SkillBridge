# 🚀 SkillBridge – AI-Powered Freelance Marketplace & Talent Intelligence Platform

> **Connecting Skills, Opportunities and Trusted Collaborations.**

SkillBridge is an enterprise-grade, production-quality freelance marketplace and talent intelligence platform built on the modern **MERN** stack (MongoDB, Express, React, Node.js) with Tailwind CSS, Framer Motion, and Socket.IO.

Unlike ordinary freelance job boards, SkillBridge incorporates **5 specialized intelligence engines**: transparent weighted AI talent matching, smart proposal quality analysis, interactive skill gap detection, multi-factor trust scores, and milestone-secured escrow contract tracking.

---

## 🌟 Unique AI Intelligence Differentiators

1. **AI Talent Match Engine**: Evaluates freelancer profile skills, experience tier, budget alignment, and reputation with a mathematical 4-factor scoring model.
2. **Smart Bid Analyzer**: Pre-evaluates proposal feasibility, pricing deviations, realistic delivery windows, and completeness before client review.
3. **Skill Gap Detector**: Pinpoints missing dependencies between a freelancer's verified skills and project requirements, offering curated documentation and learning pathways.
4. **Freelancer Trust Score**: Objective, non-arbitrary reputation score computed from completed deliverables, rating averages, on-time submissions, and verified portfolio URLs.
5. **Smart Deadline & Milestone Tracker**: Interactive phased milestone monitor with deliverable submission, client revision reviews, and simulated escrow payouts.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Framer Motion, Recharts, Axios, Socket.IO Client.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication, bcryptjs, Socket.IO, Express Rate Limit.
- **Security**: Strict CORS policies, bcrypt password salting, JWT token verification, route guards, ownership authorization checks, and rate-limiting.

---

## 📁 Project Structure

```
skillbridge/
  ├── client/
  │   ├── src/
  │   │   ├── components/      # Navbar, Footer, Glassmorphism UI
  │   │   ├── context/         # AuthContext with 1-click evaluator logins
  │   │   ├── pages/           # Landing, Dashboards, Contracts, Bidding
  │   │   ├── services/        # Axios API instances & Interceptors
  │   │   ├── App.jsx          # Protected route declarations
  │   │   └── main.jsx
  │   ├── tailwind.config.js
  │   ├── vite.config.js
  │   └── package.json
  │
  ├── server/
  │   ├── config/              # MongoDB connection & Atlas fallback
  │   ├── controllers/         # Auth, Projects, Proposals, Contracts, Admin
  │   ├── middleware/          # JWT protect & role authorization
  │   ├── models/              # User, Freelancer, Client, Contract, Milestone
  │   ├── routes/              # Express API route modules
  │   ├── services/            # IntelligenceEngine algorithm implementations
  │   ├── utils/               # Database seed scripts
  │   └── server.js            # Express & Socket.IO server initialization
  │
  ├── .gitignore
  ├── .env.example
  ├── LICENSE
  └── README.md
```

---

## ⚡ Quickstart & Local Installation

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v22.14.0)
- npm `v9+` or `v10+`
- MongoDB local instance OR free MongoDB Atlas cluster connection string

### 1. Backend Setup
```bash
cd server
npm install
# Configure server/.env (see server/.env.example)
npm start
```
*Backend runs at: `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`)*

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## 🔑 Demo Evaluator Accounts (1-Click Login Included)

SkillBridge features **1-Click Demo Evaluation buttons** right on the Landing Page and Login Page for seamless testing:

| Role | Email | Password | Key Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@skillbridge.io` | `password123` | Platform analytics, volume charts, user moderation |
| **Client** | `client@skillbridge.io` | `password123` | Project posting, proposal comparison, milestone approval |
| **Freelancer** | `freelancer@skillbridge.io` | `password123` | Skill gap analyzer, proposal bidding, milestone submissions |

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
1. Push repository to GitHub.
2. In Vercel, import the repository and set the **Root Directory** to `client`.
3. Set environment variable: `VITE_API_URL=https://<your-render-backend-url>/api`.
4. Deploy!

### Backend (Render)
1. In Render, create a new **Web Service** connected to your GitHub repo.
2. Set **Root Directory** to `server`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: Random 32+ character string.
   - `CLIENT_URL`: Your Vercel frontend URL.

---

## 📄 License
Released under the [MIT License](LICENSE).
