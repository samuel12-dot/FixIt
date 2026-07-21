# FixIt

Verified-artisan marketplace for Lagos — Next.js frontend, Express/Node backend, MongoDB.

## Project structure

- `frontend/` — Next.js (App Router, TypeScript, Tailwind CSS)
- `backend/` — Express + MongoDB (Mongoose), JWT auth

## Getting started

From the project root:

```bash
npm run install:all   # installs backend + frontend dependencies
npm run seed          # seeds MongoDB with categories, artisans, blog/help content
npm run dev           # runs backend (:4000) and frontend (:3000) together
```

Requires a running local MongoDB instance (`mongodb://127.0.0.1:27017/fixit` by default — see `backend/.env.example`) and `backend/.env` / `frontend/.env.local` configured from their `.env.example` files.

Then open [http://localhost:3000](http://localhost:3000).

## Other scripts

- `npm run dev:backend` / `npm run dev:frontend` — run just one side
- `npm run build` — production build of the frontend
- `npm run start:backend` / `npm run start:frontend` — run production builds
