import { createClient } from '@supabase/supabase-js';

// Production fallback credentials for Vela Shootz Supabase project
// Ensures the application connects smoothly even if environment variables are not injected in hosting platforms (Vercel, Firebase Hosting, Netlify)
const DEFAULT_SUPABASE_URL = 'https://llwwykwjuqueqvecwnnm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsd3d5a3dqdXF1ZXF2ZWN3bm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4Nzc4NzQsImV4cCI6MjEwNDQ1Mzg3NH0.UlE6lV9bemI6og69v5IIMimyhy79E1nNRTlvUvUcHN0';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Warning: Missing Supabase URL or Anon Key. Using offline fallback.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

