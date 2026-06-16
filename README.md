# HimShakti — AI-Enhanced D2C Food Product Platform

> **TBI-GEU SIP 2026** · AI-Assisted Full Stack Web Development Track  
> **Week 2 Deliverable:** Frontend Skeleton

A React + Tailwind CSS web platform for HimShakti Food Processing Unit, Uttarakhand — combining a D2C product landing page with an AI-powered description and marketing tool (coming in Week 3+).

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 + Vite                   |
| Styling    | Tailwind CSS v3                   |
| Routing    | React Router DOM v6               |
| AI (W3+)   | Gemini API (planned)              |
| Deployment | Vercel / Netlify (planned)        |

---

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx       ← Sticky nav with mobile hamburger
│   ├── Hero.jsx         ← Landing hero section
│   ├── ProductCard.jsx  ← Reusable product card with WhatsApp CTA
│   └── Footer.jsx       ← Site-wide footer
├── pages/
│   ├── Home.jsx         ← / (Navbar + Hero + Product Grid + Footer)
│   ├── About.jsx        ← /about
│   ├── Dashboard.jsx    ← /dashboard
│   └── Login.jsx        ← /login
├── App.jsx              ← Router setup
├── main.jsx             ← Entry point
└── index.css            ← Tailwind directives + global styles
```

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```
Opens at: **http://localhost:5173**

### 3. Build for production
```bash
npm run build
```

---

## Pages & Routes

| Route        | Page       | Description                          |
|-------------|------------|--------------------------------------|
| `/`          | Home       | Hero + 6 product cards               |
| `/about`     | About      | Brand story and values               |
| `/dashboard` | Dashboard  | Admin panel (AI tools — coming W3)   |
| `/login`     | Login      | Admin login (auth — coming later)    |

---

## Week 2 Checklist

- [x] Navbar, Hero, ProductCard, Footer in `/components`
- [x] 4 page routes with Navbar + Footer on each
- [x] ProductCard displayed 6× in responsive grid
- [x] Mobile responsive — no horizontal scroll
- [x] Tailwind CSS used throughout

## Roadmap

- **Week 3** — Gemini API: AI Product Description Generator
- **Week 4** — AI Marketing Caption Generator
- **Week 5** — Product Manager (CRUD via JSON/localStorage)
- **Week 6** — Deployment on Vercel + final polish
