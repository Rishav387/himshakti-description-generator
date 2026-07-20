# HimShakti — Backend API

> **TBI-GEU SIP 2026** · AI-Assisted Full Stack Web Development Track
> **Intern ID:** TBI-26100016

Express + MongoDB REST API serving product data for the HimShakti AI D2C Platform.

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Runtime    | Node.js             |
| Framework  | Express.js v4       |
| Database   | MongoDB (local)     |
| ODM        | Mongoose v8         |

---

## Database Choice — Why MongoDB?

MongoDB was chosen for this project for three reasons:

1. **Schema flexibility** — Product data for a small food business evolves quickly (new fields like `badge`, `emoji`, `features` were added iteratively). MongoDB's document model allowed adding these without migrations.
2. **JSON-native** — The frontend consumes product data as JSON. MongoDB stores documents as BSON (binary JSON), which means zero transformation overhead between database and API response.
3. **Mongoose ODM** — Mongoose adds schema validation, type casting, and middleware on top of MongoDB, giving the safety of a schema while keeping the flexibility of a document store.

> **Note on Atlas vs Local:** MongoDB Atlas was blocked at the network level on the development network (DNS lookup failed for the SRV record). MongoDB Community Server running locally (`mongodb://localhost:27017`) was used as the working solution. The `.env.example` shows both options.

---

## Schema Diagram

The platform currently has one collection: **Products**.

```
┌─────────────────────────────────────────────────┐
│                   products                       │
├──────────────┬──────────────┬───────────────────┤
│ Field        │ Type         │ Constraints        │
├──────────────┼──────────────┼───────────────────┤
│ _id          │ ObjectId     │ auto, primary key  │
│ name         │ String       │ required, max 100  │
│ category     │ String       │ required, enum     │
│ price        │ Number       │ required, min 0    │
│ weight       │ String       │ required           │
│ description  │ String       │ required, max 500  │
│ ingredients  │ String       │ required           │
│ features     │ [String]     │ default []         │
│ badge        │ String       │ nullable           │
│ emoji        │ String       │ default 🌿         │
│ inStock      │ Boolean      │ default true       │
│ whatsapp     │ String       │ default +91XXX     │
│ createdAt    │ Date         │ auto (timestamps)  │
│ updatedAt    │ Date         │ auto (timestamps)  │
└──────────────┴──────────────┴───────────────────┘

Category enum values:
  Snacks | Cold-Pressed Oils | Beverages |
  Pickles | Health Foods | Preserves | Other

Text index on: name, description (for search endpoint)
```

> See `W5_SchemaDiagram_TBI-26100016.png` for the visual diagram.

---

## Folder Structure

```
server/
├── models/
│   └── Product.js          ← Mongoose schema and model
├── routes/
│   └── products.js         ← All 7 product endpoints
├── middleware/
│   └── errorHandler.js     ← Global error handler + 404 handler
├── index.js                ← Server entry point
├── seed.js                 ← One-time DB seeder script
├── .env.example            ← Required environment variables
├── .gitignore              ← Excludes node_modules and .env
└── package.json
```

---

## API Endpoints

| Method | Endpoint                        | Description                | Status |
|--------|---------------------------------|----------------------------|--------|
| GET    | `/`                             | Health check               | 200    |
| GET    | `/api/products`                 | Get all products           | 200    |
| GET    | `/api/products?category=Snacks` | Filter by category         | 200    |
| GET    | `/api/products/search?q=millet` | Search products            | 200    |
| GET    | `/api/products/:id`             | Get single product by ID   | 200    |
| POST   | `/api/products`                 | Create new product         | 201    |
| PUT    | `/api/products/:id`             | Full update of product     | 200    |
| PATCH  | `/api/products/:id`             | Partial update             | 200    |
| DELETE | `/api/products/:id`             | Delete product             | 200    |

---

## How to Run Backend Locally

### Prerequisites
- Node.js v18 or higher
- MongoDB Community Server running locally OR a MongoDB Atlas account

### Step 1 — Clone and navigate
```bash
git clone https://github.com/Rishav387/himshakti-description-generator.git
cd himshakti-description-generator/server
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Set up environment variables
```bash
cp .env.example .env
```

Open `.env` and fill in:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/himshakti
NODE_ENV=development
```

### Step 4 — Set up the database

**Option A — Local MongoDB (recommended for development):**

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings — check "Install MongoDB as a Service"
3. Verify it's running: `sc query MongoDB` (should show STATE: 4 RUNNING)
4. Your `MONGODB_URI` should be: `mongodb://localhost:27017/himshakti`

**Option B — MongoDB Atlas (requires internet/no network restrictions):**

1. Create free cluster at https://cloud.mongodb.com
2. Go to Connect → Drivers → copy the connection string
3. Replace `<password>` with your database user password
4. Add `/himshakti` before the `?` in the URI
5. Go to Network Access → Add IP Address → Allow from Anywhere
6. Your `MONGODB_URI` should be: `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/himshakti?retryWrites=true&w=majority`

### Step 5 — Seed the database (first time only)
```bash
node seed.js
```
Expected output:
```
✓ 6 products seeded successfully
  - Himalayan Millet Crunch Bar
  - Wild Apricot Kernel Oil
  - Rhododendron Squash
  - Pahadi Aloo Pickle
  - Black Soybean Sattu
  - Kafal Berry Jam
```

### Step 6 — Start the server
```bash
npm run dev
```
Server runs at: **http://localhost:5000**

---

## Environment Variables

| Variable      | Description                     | Required |
|---------------|---------------------------------|----------|
| `PORT`        | Express server port             | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string       | Yes      |
| `NODE_ENV`    | `development` or `production`   | No       |

---

## Error Responses

All errors return consistent JSON:
```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

| Status | Meaning                        |
|--------|--------------------------------|
| 400    | Validation error / bad request |
| 404    | Resource not found             |
| 409    | Duplicate key conflict         |
| 500    | Internal server error          |
