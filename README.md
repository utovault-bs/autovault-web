# AutoVault — Used Car Marketplace

A full-stack used car marketplace connecting buyers and sellers. Built for the US market.

## Problem

Buying/selling cars privately is fragmented — Facebook Marketplace lacks structure, Craigslist lacks trust/payments, and dealers charge high fees. AutoVault provides a purpose-built platform with secure payments, direct messaging, and an admin oversight layer.

## Features

### Current (Backend Complete + Frontend Partial)

| Feature | Backend | Frontend |
|---|---|---|
| User registration & login (JWT) | ✅ | ✅ Login page |
| Browse cars with search/filter/sort/pagination | ✅ | ✅ Browse page + CarCard |
| Car detail view with photo gallery | ✅ | ❌ Not built |
| Create listing with image upload (Cloudinary) | ✅ | ❌ Not built |
| Contact seller via messaging | ✅ | ❌ Not built |
| Stripe checkout / purchase flow | ✅ | ❌ Not built |
| Admin dashboard (stats, manage listings/users/orders) | ✅ | ❌ Not built |
| Real-time messaging (Socket.io) | ⬜ API exists, Socket.io not wired | ❌ Not built |

### Planned

- Real-time buyer-seller chat via Socket.io
- User profiles / saved searches / favorites
- Email notifications for messages and purchases
- VIN decoding integration
- Car value estimates (market data)

## Tech Stack

```
Frontend (Vercel)         Backend (Render)          Database
┌──────────────┐          ┌──────────────┐          ┌──────────┐
│  React 18    │──REST──►  │  Express     │──SQL──►  │PostgreSQL│
│  Vite 5      │  JWT Auth │  Node.js 18  │          │          │
│  React Router│◄──JSON──  │  Stripe SDK  │◄──rows── │          │
│  Axios       │           │  Cloudinary  │          └──────────┘
│  CSS         │           │  JWT/bcrypt  │
└──────────────┘           │  Multer      │
                           └──────────────┘
```

- **Auth**: JWT tokens (7-day expiry), bcrypt password hashing, role-based guards (user/admin)
- **Payments**: Stripe PaymentIntents API — card element on frontend, webhook confirmation on backend
- **File Upload**: Multer (temp disk) → Cloudinary (transformed, CDN-delivered)
- **Database**: PostgreSQL with raw SQL, parameterized queries, migrations via `npm run migrate`

## Database Schema

6 tables — `users`, `cars`, `car_images`, `conversations`, `conversation_participants`, `messages`, `orders` — with indexes on `cars.status`, `cars.make`, `cars.price`.

## Project Structure

```
autovault/
├── backend/
│   ├── server.js          # Express app — all routes inline
│   ├── package.json
│   ├── db/
│   │   ├── migrate.js     # Runs SQL migrations
│   │   └── migrations/
│   │       └── 001_init.sql
│   └── autovault-api/     # Git remote target
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   ├── src/
│   │   ├── main.jsx       # Entry point
│   │   ├── App.jsx        # Router & auth provider
│   │   ├── api/
│   │   │   ├── client.js  # Axios instance + JWT interceptor
│   │   │   └── cars.js    # Car API functions
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state provider
│   │   ├── hooks/
│   │   │   └── useCars.js       # Car listing hook
│   │   ├── components/
│   │   │   └── CarCard.jsx      # Car card component
│   │   └── pages/
│   │       ├── BrowsePage.jsx   # Browse/search/filter
│   │       └── Login.jsx        # Login form
│   └── autovault-web/     # Git remote target
└── README.md
```

## Project Status

```
Backend API:     ████████████████░░  80%  (needs Socket.io wiring)
Frontend Pages:  ████░░░░░░░░░░░░░░  20%  (Browse + Login done)
CSS/Styling:     ██░░░░░░░░░░░░░░░░  10%  (only CarCard CSS exists)
```

### What's Missing (in order of priority)

1. `frontend/src/index.css` — **Missing, app will crash without it** (imported in `main.jsx`)
2. Car Detail page (`/cars/:id`) — linked from CarCard, no route or component
3. Registration page — `AuthContext` has `register()`, no UI form
4. Sell Car form — image upload + create listing
5. Checkout page — Stripe card element + payment flow
6. Messages UI — conversations list + chat view
7. Admin dashboard — stats, manage listings/users/orders
8. Socket.io integration — real-time message delivery
9. Placeholder car image — `CarCard` references `/placeholder-car.jpg`

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (local or cloud)
- Stripe account (API keys)
- Cloudinary account (API keys)

### Local Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in your keys
npm run migrate        # create tables
npm run dev            # starts on :5000

# Frontend (separate terminal)
cd frontend
npm install
cp .env.example .env   # fill in VITE_API_URL
npm run dev            # starts on :5173
```

### Environment Variables

**Backend (`.env`):**

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=123456
CLOUDINARY_API_SECRET=abc123
CLIENT_URL=http://localhost:5173
```

**Frontend (`.env`):**

```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Deployment

### Push to GitHub

```bash
# Backend
cd backend
git init && git add . && git commit -m "v1"
gh repo create autovault-api --public --source=. --push

# Frontend
cd ../frontend
git init && git add . && git commit -m "v1"
gh repo create autovault-web --public --source=. --push
```

### Deploy Backend (Render)

1. Create Web Service from `autovault-api` repo
2. Set environment: Node, Build: `npm install`, Start: `npm start`
3. Add environment variables (see above)
4. Add PostgreSQL database (free tier)
5. Deploy, then run `npm run migrate` via Shell tab

### Deploy Frontend (Vercel)

1. Import `autovault-web` repo
2. Framework: Vite
3. Add environment variables (see above)
4. Deploy

### Health Check

- Backend: `https://autovault-api-oa6j.onrender.com/health`
- Frontend: `https://autovault-web.vercel.app`
