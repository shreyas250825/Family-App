# Supabase Setup for FamZee

## 1. Create project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Copy **Project URL**, **anon key**, and **service_role key**.

## 2. Run migrations
In Supabase SQL Editor, run in order:
1. `migrations/001_initial_schema.sql`
2. `migrations/002_rls_policies.sql`

## 3. Create storage bucket (optional, for media uploads)
1. Storage → New bucket → name: `famzee-media` → Public bucket

## 4. Configure environment

**backend/.env**
```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=5000
CORS_ORIGINS=http://localhost:5173,http://localhost:8081,exp://
PUBLIC_API_URL=http://YOUR_LAN_IP:5000
```

**FamZee/.env** (use LAN IP for physical device)
```
API_URL=http://192.168.x.x:5000/api
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## 5. Demo tip
Disable email confirmation under Authentication → Email for faster demo signup.

## 6. Verify
```bash
curl http://localhost:5000/health
```
