# 🌿 HimShakti — AI-Enhanced D2C Food Product Platform

> A full-stack Direct-to-Consumer platform for HimShakti Food Processing Unit, Uttarakhand — featuring a product catalog, WhatsApp ordering, JWT + Google OAuth authentication, user-scoped CRUD dashboard, and an AI-powered product description generator using Groq Llama.

---

## 🌐 Live Demo

**Frontend:** https://himshakti-description-generator.vercel.app

**Backend API:** https://himshakti-api.onrender.com

> ⚠️ Backend runs on Render free tier — first request after 15 min idle takes 30-60 sec to wake up.

---

## 🎥 Demo Video

> [YouTube Unlisted Link — to be added after recording]

---

## 📸 Screenshots

### Home Page — Product Catalog
![Home Page](https://himshakti-description-generator.vercel.app/og-home.png)

### AI Generator — Product Description
![AI Generator](https://himshakti-description-generator.vercel.app/og-ai.png)

### Dashboard — CRUD Management
![Dashboard](https://himshakti-description-generator.vercel.app/og-dashboard.png)

---

## ✨ Features

- **Product Catalog** — 6+ Himalayan food products with real images, category filtering, WhatsApp order CTAs
- **AI Description Generator** — Enter product details, choose a tone (Premium / Traditional / Health-Focused), get AI-generated e-commerce copy powered by Groq Llama
- **Authentication** — Register, login, logout with JWT sessions + Google OAuth
- **Protected Dashboard** — Full CRUD (create, read, update, delete) scoped to logged-in user only
- **Dark / Light Mode** — Persisted in localStorage across sessions
- **Responsive** — Works on mobile (375px), tablet (768px), desktop (1440px)
- **Error Boundary** — Catches unexpected React errors gracefully

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (M0 Free) + Mongoose v8 |
| Auth | JWT + bcryptjs + Passport.js (Google OAuth) |
| AI | Groq Inference API (llama-3.3-70b-versatile) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Community Server OR MongoDB Atlas account
- Groq API key (free at console.groq.com)

### 1. Clone the repository
```bash
git clone https://github.com/Rishav387/himshakti-description-generator.git
cd himshakti-description-generator
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd server
npm install
```

### 4. Configure environment variables
```bash
cp server/.env.example server/.env
```

Fill in `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/himshakti
NODE_ENV=development
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_EXPIRES_IN=7d
GROQ_API_KEY=your_groq_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SERVER_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

Create `.env` in project root:
```
VITE_API_URL=http://localhost:5000/api
```

### 5. Seed the database
```bash
cd server
node seed.js
```

### 6. Start both servers
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

---

## 📡 API Documentation

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| POST | `/api/auth/logout` | Required | Logout |
| GET | `/api/auth/me` | Required | Get current user |
| GET | `/api/auth/google` | Public | Google OAuth redirect |

**Login Request:**
```json
POST /api/auth/login
{ "email": "user@example.com", "password": "password123" }
```
**Login Response:**
```json
{ "success": true, "token": "eyJhbGci...", "user": { "id": "...", "name": "Rishav", "email": "..." } }
```

### Product Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | Public | All products (home page) |
| GET | `/api/products/my/list` | Required | My products only (dashboard) |
| POST | `/api/products` | Required | Create product |
| PUT | `/api/products/:id` | Required | Update product (owner only) |
| DELETE | `/api/products/:id` | Required | Delete product (owner only) |

### AI Endpoint

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/ai/generate-description` | Public | Generate AI product description |

**AI Request:**
```json
{
  "productName": "Himalayan Millet Crunch Bar",
  "ingredients": "Finger millet, jaggery, sesame, ghee",
  "weight": "200g pack of 6",
  "features": "No preservatives, handmade, rich in iron",
  "tone": "health-focused"
}
```
**AI Response:**
```json
{
  "success": true,
  "description": "When clean nutrition meets Himalayan tradition...",
  "wordCount": 89,
  "tone": "health-focused"
}
```

---

## 🗂️ Folder Structure

```
himshakti-description-generator/
├── src/                          # React frontend
│   ├── components/               # Navbar, Footer, ProductCard, ErrorBoundary
│   │   └── ui/                   # Button, Input, Modal, Toast, Loader
│   ├── context/                  # ThemeContext, AuthContext
│   ├── pages/                    # Home, Dashboard, Login, Register, AIGenerator
│   ├── utils/api.js              # Centralized fetch utility
│   └── assets/images/            # Local product photographs
├── server/                       # Express backend
│   ├── models/                   # Product.js, User.js (Mongoose schemas)
│   ├── routes/                   # products.js, auth.js, ai.js
│   ├── middleware/               # auth.js (JWT protect), errorHandler.js
│   ├── config/passport.js        # Google OAuth strategy
│   ├── seed.js                   # Database seeder
│   └── index.js                  # Server entry point
├── PROMPTS.md                    # AI prompt engineering log
├── vercel.json                   # React Router catch-all rewrite
└── README.md
```

---

## ⚠️ Known Limitations

| Issue | Detail |
|---|---|
| Render cold start | Backend spins down after 15 min idle — first request takes 30-60 sec |
| MongoDB Atlas M0 | 512MB storage limit, shared cluster |
| Groq free tier | 30 requests/minute, 14,400/day on llama-3.3-70b |
| Google OAuth | Redirect URIs must be updated for any new deployment URL |
| No image upload | Product images are local assets — no file upload feature yet |

---

## 🙏 Credits & Acknowledgements

- **TBI-GEU SIP 2026** — Structured internship programme framework
- **Mentor:** Mr. Harsh Vardhan Singh Rawat, Incubator Manager, TBI-GEU
- **Groq** — Free LLM inference API (llama-3.3-70b-versatile)
- **Unsplash** — Free food photography for fallback product images
- **Tailwind CSS** — Utility-first CSS framework
- **AI Assistance** — Claude (Anthropic) used for code generation and documentation throughout the project

---

> **TBI-GEU SIP 2026** · Rishav Kumar · TBI-26100016 · B.Tech CSE · Graphic Era University
