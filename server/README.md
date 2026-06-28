# HimShakti — Backend API (Week 4)

> **TBI-GEU SIP 2026** · AI-Assisted Full Stack Web Development Track  
> **Week 4 Deliverable:** REST API Backend

Express + MongoDB REST API serving product data for the HimShakti AI D2C Platform.

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Runtime    | Node.js             |
| Framework  | Express.js v4       |
| Database   | MongoDB Atlas       |
| ODM        | Mongoose v8         |

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

| Method | Endpoint                        | Description                        | Status |
|--------|---------------------------------|------------------------------------|--------|
| GET    | `/`                             | Health check                       | 200    |
| GET    | `/api/products`                 | Get all products                   | 200    |
| GET    | `/api/products?category=Snacks` | Filter by category                 | 200    |
| GET    | `/api/products/search?q=millet` | Search by name/description         | 200    |
| GET    | `/api/products/:id`             | Get single product by ID           | 200    |
| POST   | `/api/products`                 | Create new product                 | 201    |
| PUT    | `/api/products/:id`             | Full update of product             | 200    |
| PATCH  | `/api/products/:id`             | Partial update (e.g. price, stock) | 200    |
| DELETE | `/api/products/:id`             | Delete product                     | 200    |

---

## How to Run Backend Locally

### Prerequisites
- Node.js v18 or higher (`node -v` to check)
- A free MongoDB Atlas account and cluster at https://cloud.mongodb.com

### Step 1 — Clone the repo and navigate to server folder
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
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/himshakti?retryWrites=true&w=majority
NODE_ENV=development
```
Get your MongoDB URI from: Atlas Dashboard → Connect → Drivers → copy connection string.

### Step 4 — Seed the database (first time only)
```bash
node seed.js
```
This inserts 6 HimShakti products into your Atlas collection.

### Step 5 — Start the server
```bash
npm run dev
```
Server runs at: **http://localhost:5000**

Test it: open `http://localhost:5000` in your browser — you should see the health check JSON response.

### Step 6 — Test all endpoints
Import `W4_APICollection_TBI-26100016.json` into Postman or Thunder Client and run each request.

---

## Environment Variables

| Variable      | Description                          | Required |
|---------------|--------------------------------------|----------|
| `PORT`        | Port for the Express server          | No (default: 5000) |
| `MONGODB_URI` | MongoDB Atlas connection string      | Yes      |
| `NODE_ENV`    | `development` or `production`        | No (default: development) |

> ⚠ Never commit your `.env` file. It is listed in `.gitignore`.

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
| 400    | Bad request / validation error |
| 404    | Resource not found             |
| 409    | Duplicate key conflict         |
| 500    | Internal server error          |
