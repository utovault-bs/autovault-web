# AutoVault Launch Playbook

When the user says "launch it" or "make it live", follow these steps.

## Phase 1: Prepare the Code

- [ ] Install backend dependencies: `cd backend && npm install`
- [ ] Install frontend dependencies: `cd frontend && npm install`
- [ ] Create `backend/.env` from `backend/.env.example` (ask user for Stripe + Cloudinary keys + JWT secret)
- [ ] Create `frontend/.env` from `frontend/.env.example` (ask user for Stripe publishable key)
- [ ] Create `frontend/src/index.css` (basic styles — app will crash without it)
- [ ] Verify frontend builds: `cd frontend && npm run build`

## Phase 2: Git & Push

- [ ] `git init` in root or per-repo (backend + frontend as separate repos)
- [ ] Create `.gitignore` files (node_modules, .env, uploads/)
- [ ] Commit all code
- [ ] Create GitHub repos via `gh repo create`
- [ ] Push both repos

## Phase 3: Deploy Backend (Render)

- [ ] User creates a Render account (if needed)
- [ ] Create Web Service from `autovault-api` repo
- [ ] Set environment variables from `.env`
- [ ] Add PostgreSQL database (free tier)
- [ ] Deploy
- [ ] Run migrations: `npm run migrate` via Render Shell
- [ ] Verify: `GET /health` returns ok

## Phase 4: Deploy Frontend (Vercel)

- [ ] User creates a Vercel account (if needed)
- [ ] Import `autovault-web` repo
- [ ] Set framework: Vite
- [ ] Set environment variables
- [ ] Deploy
- [ ] Verify site loads without errors

## Phase 5: Verify

- [ ] Backend health endpoint responds
- [ ] Frontend loads in browser
- [ ] Login/register flow works
- [ ] Browse page loads cars (empty state ok)
- [ ] Tell the user the URLs and what's working
