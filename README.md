# HimShakti — AI-Enhanced D2C Food Product Platform

> **TBI-GEU SIP 2026** · AI-Assisted Full Stack Web Development Track
> **Intern:** Rishav Kumar · **ID:** TBI-26100016

A full-stack Direct-to-Consumer web platform for HimShakti Food Processing Unit, Uttarakhand — featuring a product catalog, WhatsApp ordering, JWT authentication, Google OAuth, and an AI-powered product description generator using Groq Llama.

---

## 🌐 Live Deployment

| Layer | URL |
|---|---|
| **Frontend (Vercel)** | https://himshakti.vercel.app *(update after deployment)* |
| **Backend API (Render)** | https://himshakti-api.onrender.com *(update after deployment)* |
| **GitHub Repository** | https://github.com/Rishav387/himshakti-description-generator |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (M0 Free Tier) |
| ODM | Mongoose v8 |
| Auth | JWT + bcryptjs + Passport.js (Google OAuth) |
| AI | Groq Inference API (llama-3.3-70b-versatile) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Features

- **D2C Landing Page** — product catalog with real images, category filtering, WhatsApp order CTAs
- **Product Catalog** — 6+ Himalayan food products with ingredients, features, pricing
- **Authentication** — register, login, logout, Google OAuth, JWT-protected routes
- **Product Dashboard** — full CRUD (create, read, update, delete) scoped to logged-in user
- **AI Description Generator** — generates tone-aware e-commerce copy using Groq Llama model
- **Dark / Light Mode** — persisted in localStorage
- **Responsive** — works on mobile (375px), tablet (768px), and desktop (1440px)

---

## How to Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Community Server (local) OR MongoDB Atlas account

### Frontend
```bash
git clone https://github.com/Rishav387/himshakti-description-generator.git
cd himshakti-description-generator
npm install
npm run dev
```
Opens at: http://localhost:5173

### Backend
```bash
cd server
npm install
cp .env.example .env
# Fill in MONGODB_URI, JWT_SECRET, GROQ_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
npm run dev
```
Runs at: http://localhost:5000

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | Public | All products |
| GET | `/api/products/search?q=` | Public | Search products |
| GET | `/api/products/my/list` | Required | My products only |
| POST | `/api/products` | Required | Create product |
| PUT | `/api/products/:id` | Required | Update product |
| DELETE | `/api/products/:id` | Required | Delete product |
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Required | Get profile |
| GET | `/api/auth/google` | Public | Google OAuth |
| POST | `/api/ai/generate-description` | Public | Generate AI description |

---

## Environment Variables

### Backend (`server/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
JWT_SECRET=...
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GROQ_API_KEY=...
SERVER_URL=https://your-api.onrender.com
CLIENT_URL=https://your-app.vercel.app
```

### Frontend (`.env` or Vercel dashboard)
```
VITE_API_URL=https://your-api.onrender.com/api
```

---

## Known Limitations on Free Tier

| Service | Limitation |
|---|---|
| **Render (backend)** | Free tier spins down after 15 minutes of inactivity. First request after idle takes 30–60 seconds to wake up. |
| **MongoDB Atlas M0** | 512MB storage limit, shared cluster, no dedicated RAM. |
| **Groq API** | Free tier allows 30 requests/minute and 14,400 requests/day on llama-3.3-70b-versatile. |
| **Vercel** | 100GB bandwidth/month on free tier — more than sufficient for this project. |

---

## Week-by-Week Development

| Week | Focus | Key Deliverable |
|---|---|---|
| 1 | Project planning | Brief, sector selection |
| 2 | Frontend skeleton | React + Tailwind + 4 pages |
| 3 | UI/UX & components | Component library + dark mode |
| 4 | REST API | 7 CRUD endpoints |
| 5 | Database integration | Full CRUD dashboard |
| 6 | Authentication | JWT + Google OAuth |
| 7 | AI integration | Groq Llama description generator |
| 8 | Frontend polish | Images, empty states, error boundary |
| 9 | Deployment | Vercel + Render + MongoDB Atlas |
