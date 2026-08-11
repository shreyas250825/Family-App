# FamZee Demo Setup Guide

Quick steps to run a client/investor demo with **website** (browser-only) and **mobile** (Supabase + backend).

---

## Website demo (ready now)

No backend required. Data lives in the browser (`localStorage`).

```bash
cd fam
npm install
npm run dev
```

1. Open `http://localhost:5173`
2. **Landing page** → explore features
3. Click **Launch Demo — The Sharma Family** on login, or use:
   - Email: `ananya@demo.famzee.app`
   - Password: `demo2026`
4. Walk through: Dashboard → Family → Events → Albums → Messages → Settings → Logout

**Fresh signup flow:** Register → Onboarding → Create family → empty dashboard (user builds their own data).

---

## Mobile demo (requires Supabase + backend)

### 1. Supabase
See [`supabase/README.md`](supabase/README.md):
- Create project
- Run `migrations/001_initial_schema.sql` then `002_rls_policies.sql`
- Create storage bucket `famzee-media` (optional, for image uploads)
- Disable email confirmation for faster demo signup

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with real Supabase keys
npm install
npm run dev
```

Verify: `curl http://localhost:5000/health`

Backend listens on `0.0.0.0:5000` so phones on the same Wi‑Fi can reach it.

### 3. Mobile app

```bash
cd FamZee
cp .env.example .env
```

Set in `.env` (use your PC's **LAN IP**, not `localhost`, for a physical phone):

```
API_URL=http://192.168.x.x:5000/api
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

```bash
npm install
npm start
# Scan QR with Expo Go, or build APK:
# npx eas build -p android --profile preview
```

### Mobile demo flow
Register → Create/join family → Feed → **+ Create Post** → Messages → Settings → Logout

---

## What is NOT real (by design)

- Google / Apple OAuth — removed or not shown
- Push notifications — UI only, marked "Coming soon"
- Website admin panel — removed from demo
- Website ↔ mobile data — **not synced** (different storage)

---

## Production deployment (remaining)

1. Deploy backend (Railway, Render, Fly.io, etc.) with env vars
2. Set `API_URL=https://your-backend.com/api` in mobile `.env` / EAS secrets
3. Run Supabase migrations on production project
4. Deploy website (`fam`: `npm run build` → Vercel/Netlify)
