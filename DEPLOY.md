# Tilt Shift Estimator — Deployment Guide
## Supabase (database) + Vercel (hosting)

Estimated time: **45–60 minutes**, no prior experience needed.

---

## Part 1 — Supabase (Database Setup)

### 1.1 Create a Supabase account
1. Go to [supabase.com](https://supabase.com) and click **Start your project**
2. Sign up with GitHub (easiest) or email
3. Click **New Project**
   - Name it: `tiltshift-estimator`
   - Set a strong database password (save it somewhere — you won't need it often)
   - Region: **US West** (or closest to Bellingham, WA)
   - Click **Create new project** — takes ~2 minutes to spin up

### 1.2 Create the database tables
1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Paste the following SQL and click **Run**:

```sql
-- Table for storing estimates
CREATE TABLE estimates (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER estimates_updated_at
  BEFORE UPDATE ON estimates
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at();

-- Table for shared config (materials, labor rates, lists)
CREATE TABLE config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- Enable Row Level Security (keeps data private)
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE config ENABLE ROW LEVEL SECURITY;

-- Allow full access via the anon key (your password gate handles auth)
CREATE POLICY "anon full access estimates"
  ON estimates FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "anon full access config"
  ON config FOR ALL USING (true) WITH CHECK (true);
```

4. You should see "Success. No rows returned" — that means it worked.

### 1.3 Get your API keys
1. In the left sidebar click **Settings** → **API**
2. Copy two values:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon / public** key — a long string starting with `eyJ...`
3. Keep these handy for the next steps

---

## Part 2 — GitHub (Version Control)

### 2.1 Create a GitHub account (if you don't have one)
Go to [github.com](https://github.com) and sign up — free.

### 2.2 Create a new repository
1. Click the **+** icon → **New repository**
2. Name it: `tiltshift-estimator`
3. Set it to **Private** ← important, keeps your code private
4. Click **Create repository**

### 2.3 Upload the project files
1. On the new repo page, click **uploading an existing file**
2. Drag the entire `tiltshift-estimator` folder contents into the upload area
   - Include: `src/`, `index.html`, `package.json`, `vite.config.js`, `.gitignore`, `.env.example`
   - Do **NOT** upload: `node_modules/` (if it exists), `.env.local`
3. Click **Commit changes**

---

## Part 3 — Vercel (Hosting)

### 3.1 Create a Vercel account
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → **Continue with GitHub**
3. Authorize Vercel to access your GitHub

### 3.2 Import your project
1. On the Vercel dashboard click **Add New…** → **Project**
2. Find `tiltshift-estimator` in the list and click **Import**
3. Framework should auto-detect as **Vite** — leave all defaults
4. **Before clicking Deploy**, open the **Environment Variables** section:

Add these three variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | Your Supabase Project URL from step 1.3 |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key from step 1.3 |
| `VITE_TEAM_PASSWORD` | A password your team will use to log in (e.g. `TiltShift2025!`) |

5. Click **Deploy**
6. Wait ~60 seconds — Vercel builds and deploys automatically

### 3.3 Your app is live!
Vercel gives you a URL like `tiltshift-estimator.vercel.app`. Share this with your team.

---

## Part 4 — Custom Domain (Optional but recommended)

If you want `estimator.tiltshiftdesign.com`:

1. In Vercel, open your project → **Settings** → **Domains**
2. Type `estimator.tiltshiftdesign.com` and click **Add**
3. Vercel shows you a DNS record to add
4. Log into wherever your domain is registered (GoDaddy, Namecheap, etc.)
5. Add the CNAME record Vercel shows you
6. Wait up to 24 hrs for DNS to propagate (usually under an hour)

---

## Part 5 — Sharing with Your Team

1. Send teammates the URL (e.g. `tiltshift-estimator.vercel.app`)
2. They enter the team password you set in `VITE_TEAM_PASSWORD`
3. They're in — all estimates, materials, and labor rates are **shared in real time**

**Note on simultaneous editing:** Two people editing the same estimate at the same time will have their changes overwrite each other — whoever saves last wins. Best practice: one person works an estimate at a time (the sidebar shows who's working what via the status badges).

---

## Making Updates Later

Any time you want to update the app (after Claude makes changes):
1. Re-upload the changed files to GitHub (drag-and-drop over the existing files)
2. Vercel automatically detects the new commit and redeploys in ~60 seconds
3. Your team sees the update on next page refresh — no downtime

---

## Troubleshooting

**"Saving…" never goes away** → Check that your Supabase URL and anon key are correct in Vercel environment variables. Redeploy after fixing.

**Blank white screen** → Open browser dev tools (F12) → Console. Usually a missing env variable.

**Data not loading** → In Supabase SQL Editor run `SELECT * FROM estimates;` to confirm the table exists and has rows.

**Forgot team password** → Update `VITE_TEAM_PASSWORD` in Vercel → Settings → Environment Variables → Redeploy.

---

## Costs

| Service | Free tier | Paid starts at |
|---------|-----------|----------------|
| Supabase | 500MB database, unlimited API calls | $25/mo |
| Vercel | Unlimited deploys, 100GB bandwidth | $20/mo |

For a 2–5 person internal tool, you will almost certainly never need to pay anything.
