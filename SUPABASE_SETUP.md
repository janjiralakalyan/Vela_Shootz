# Vela Shootz — Supabase Setup Guide

This guide walks you through activating the real-time Supabase backend for slot booking.

---

## Step 1 — Create Your Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **New project**
3. Fill in your project name and password
4. Wait ~2 minutes for the project to be ready

---

## Step 2 — Run the Database Schema

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open the file `supabase/schema.sql` from this project
4. **Paste** the entire contents into the SQL Editor
5. Click **Run** (or press `Ctrl+Enter`)

You should see: `Success. No rows returned.`

---

## Step 3 — Enable pg_cron (for Auto-Expiry)

For automatic slot expiry after event dates pass:

1. In your Supabase dashboard, go to **Database → Extensions**
2. Search for `pg_cron`
3. Click **Enable**
4. Then go back to **SQL Editor** and run:

```sql
SELECT cron.schedule(
  'purge-expired-bookings',
  '0 * * * *',
  'SELECT purge_expired_bookings()'
);
```

This runs the cleanup every hour automatically.

---

## Step 4 — Configure Environment Variables

Create a `.env` file in the project root (already done) with:

```
VITE_SUPABASE_URL=https://llwwykwjuqueqvecwnnm.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

> ⚠️ **Never commit `.env` to git.** It is already added to `.gitignore`.

---

## Step 5 — Start the Dev Server

```bash
npm run dev
```

---

## What Gets Stored in Supabase

| Table | What it holds |
|---|---|
| `bookings` | All confirmed slot bookings (purged after event date) |
| `blocked_slots` | Admin-blocked date/time slots |
| `packages` | Photography packages and pricing |
| `promotions` | Active discount codes and promotions |
| `enquiries` | Custom package inquiry form submissions |

---

## How Auto-Expiry Works

When a booking's event date has passed, the `purge_expired_bookings()` PostgreSQL function:
1. Finds all bookings where `date < TODAY`
2. Removes them from `bookings` table
3. Removes their corresponding `blocked_slots` entries
4. Runs automatically every hour via `pg_cron`

This means the slot picker always shows real, up-to-date availability.

---

## Realtime Slot Availability

The booking wizard's time slot picker (`Step 4`) subscribes to Supabase Realtime:
- **Postgres Changes** on `bookings` and `blocked_slots` tables
- When any booking is created on any device, all other browsers update the slot UI **instantly**
- No page refresh needed — it's live

---

## Admin Dashboard

Navigate to `/#admin` and log in. The admin dashboard:
- Loads all bookings, enquiries, packages, promotions from Supabase
- Updates in real-time as new bookings come in
- Block/unblock calendar slots → immediately reflected in the booking wizard

---

## Unique Booking Reference IDs

Every booking gets a unique ID generated server-side via a PostgreSQL sequence:
```
VS-2026-00127
VS-2026-00128
VS-2026-00129
...
```

These are guaranteed unique — no race conditions, no duplicates.
