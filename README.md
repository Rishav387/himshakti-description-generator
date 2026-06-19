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
│   ├── Navbar.jsx       ← Sticky nav with mobile hamburger + theme toggle
│   ├── Hero.jsx         ← Landing hero section
│   ├── ProductCard.jsx  ← Reusable product card with WhatsApp CTA
│   ├── Footer.jsx       ← Site-wide footer
│   ├── ThemeToggle.jsx  ← Dark/light mode toggle button
│   └── ui/              ← Component library (Week 3)
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Toast.jsx
│       ├── Loader.jsx
│       └── index.js     ← Barrel export
├── context/
│   └── ThemeContext.jsx ← Dark/light mode provider (localStorage persisted)
├── pages/
│   ├── Home.jsx         ← / (Navbar + Hero + Product Grid + Footer)
│   ├── About.jsx        ← /about
│   ├── Dashboard.jsx    ← /dashboard
│   ├── Login.jsx        ← /login
│   └── UIShowcase.jsx   ← /ui-showcase — demo of all 5 UI components
├── App.jsx              ← Router + ThemeProvider + ToastProvider
├── main.jsx             ← Entry point
└── index.css            ← Tailwind directives + global styles + toast animation
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

| Route          | Page         | Description                          |
|----------------|--------------|---------------------------------------|
| `/`            | Home         | Hero + 6 product cards                |
| `/about`       | About        | Brand story and values                |
| `/dashboard`   | Dashboard    | Admin panel (AI tools — coming W3+)   |
| `/login`       | Login        | Admin login (auth — coming later)     |
| `/ui-showcase` | UI Showcase  | Live demo of the component library    |

---

## Week 2 Checklist

- [x] Navbar, Hero, ProductCard, Footer in `/components`
- [x] 4 page routes with Navbar + Footer on each
- [x] ProductCard displayed 6× in responsive grid
- [x] Mobile responsive — no horizontal scroll
- [x] Tailwind CSS used throughout

## Week 3 Checklist

- [x] Figma lo-fi wireframes — 5+ screens (see Figma link in submission)
- [x] Component library in `/components/ui/`: Button, Input, Modal, Toast, Loader
- [x] `index.js` barrel export for clean imports
- [x] JSDoc prop documentation on every component
- [x] All 5 components used together on `/ui-showcase` demo page
- [x] Dark/light mode toggle — Tailwind `dark:` classes + React Context + localStorage
- [x] Responsive verified at 375px / 768px / 1440px

## Roadmap

- **Week 4** — Gemini API: AI Product Description Generator
- **Week 5** — AI Marketing Caption Generator
- **Week 6** — Product Manager (CRUD via JSON/localStorage)
- **Week 7** — Deployment on Vercel + final polish
