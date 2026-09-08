-- ============================================================
-- VELA SHOOTZ — SUPABASE SCHEMA
-- Run this ONCE in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- Enable pg_cron for auto-expiry (required extension)
-- Supabase has pg_cron available via Database → Extensions
-- Enable it there first, then the cron.schedule call below works.

-- ============================================================
-- TABLE: packages
-- ============================================================
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  category_name TEXT,
  name TEXT NOT NULL,
  price INTEGER,
  is_custom BOOLEAN DEFAULT false,
  badge TEXT,
  featured BOOLEAN DEFAULT false,
  coverage_hours TEXT,
  reels_count TEXT,
  portraits_count TEXT,
  description TEXT,
  includes JSONB DEFAULT '[]',
  extra_addons JSONB DEFAULT '[]',
  cta TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  booking_reference TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  package_id TEXT,
  package_name TEXT,
  event_type TEXT,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  duration TEXT,
  location TEXT,
  people_count TEXT,
  instagram TEXT,
  requirements TEXT,
  reference_links TEXT,
  addons JSONB DEFAULT '[]',
  applied_promotion TEXT,
  total_amount INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Confirmed',
  payment_status TEXT DEFAULT 'Advance Received',
  assigned_to TEXT,
  reels_ready_url TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: blocked_slots
-- ============================================================
CREATE TABLE IF NOT EXISTS blocked_slots (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  slot TEXT NOT NULL,
  reason TEXT DEFAULT 'Admin Blocked',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, slot)
);

-- ============================================================
-- TABLE: enquiries
-- ============================================================
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  event_type TEXT,
  event_date DATE,
  location TEXT,
  expected_coverage TEXT,
  required_reels TEXT,
  required_portraits TEXT,
  budget_range TEXT,
  special_requirements TEXT,
  status TEXT DEFAULT 'New',
  notes TEXT DEFAULT 'Inquiry received via website.',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: promotions
-- ============================================================
CREATE TABLE IF NOT EXISTS promotions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  discount TEXT,
  original_price INTEGER,
  final_price INTEGER,
  target_package_id TEXT,
  valid_until TIMESTAMPTZ,
  description TEXT,
  terms TEXT,
  badge TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOOKING REFERENCE SEQUENCE (for unique VS-YYYY-NNNNN IDs)
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS booking_ref_seq START 127;

CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
  seq_val BIGINT;
  year_val TEXT;
BEGIN
  seq_val := nextval('booking_ref_seq');
  year_val := to_char(NOW(), 'YYYY');
  RETURN 'VS-' || year_val || '-' || LPAD(seq_val::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- AUTO-EXPIRY FUNCTION
-- Deletes bookings whose event date+time has passed
-- Also removes corresponding blocked_slots entries
-- ============================================================
CREATE OR REPLACE FUNCTION purge_expired_bookings()
RETURNS void AS $$
DECLARE
  expired_booking RECORD;
BEGIN
  FOR expired_booking IN
    SELECT id, date, start_time, booking_reference
    FROM bookings
    WHERE (date + start_time::TIME) < NOW() AT TIME ZONE 'Asia/Kolkata'
       OR date < (NOW() AT TIME ZONE 'Asia/Kolkata')::DATE
  LOOP
    -- Remove corresponding blocked slot if any
    DELETE FROM blocked_slots
    WHERE date = expired_booking.date
      AND slot = expired_booking.start_time;

    -- Remove the expired booking
    DELETE FROM bookings WHERE id = expired_booking.id;

    RAISE NOTICE 'Purged expired booking: %', expired_booking.booking_reference;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- CRON JOB: Run auto-expiry every hour
-- Requires pg_cron extension to be enabled first!
-- Go to Database → Extensions → enable pg_cron
-- Then uncomment and run the line below:
-- ============================================================
-- SELECT cron.schedule('purge-expired-bookings', '0 * * * *', 'SELECT purge_expired_bookings()');

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Allow public read + insert for bookings, enquiries
-- ============================================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public can read packages and promotions
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read promotions" ON promotions FOR SELECT USING (true);

-- Public can insert and read bookings (clients submitting)
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public update bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Public delete bookings" ON bookings FOR DELETE USING (true);

-- Public can read blocked_slots (for slot availability)
CREATE POLICY "Public read blocked_slots" ON blocked_slots FOR SELECT USING (true);
CREATE POLICY "Public insert blocked_slots" ON blocked_slots FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete blocked_slots" ON blocked_slots FOR DELETE USING (true);

-- Public can insert enquiries
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read enquiries" ON enquiries FOR SELECT USING (true);
CREATE POLICY "Public update enquiries" ON enquiries FOR UPDATE USING (true);

-- ============================================================
-- REALTIME: Enable live updates for bookings + blocked_slots
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE blocked_slots;

-- ============================================================
-- SEED: Initial Packages Data
-- ============================================================
INSERT INTO packages (id, category, category_name, name, price, is_custom, badge, featured, coverage_hours, reels_count, portraits_count, description, includes, extra_addons, cta)
VALUES
  ('pkg-quick-reels', 'on-spot', 'On-Spot Reels', 'Quick Reels', 999, false, 'QUICK START', false, '2', '2', '0',
   'Perfect for quick gatherings, personal moments, and casual events that need immediate reel delivery.',
   '["2 Hours Coverage","2 Polished Reels","On-location shooting","Professionally edited reels","iPhone 16 Pro 4K HDR capture","Same-day delivery turnaround"]',
   '[{"id":"extra-hour-reel","name":"+1 Extra Hour & +1 Extra Reel","price":550}]', 'BOOK QUICK REELS'),

  ('pkg-half-day', 'on-spot', 'On-Spot Reels', 'Half Day', 1499, false, 'MOST POPULAR', true, '4', '3', '5',
   'Our signature package for celebrations, parties, and vibrant events wanting comprehensive on-spot coverage.',
   '["4 Hours Coverage","3 High-Energy Reels","5 Specialized iPhone Portraits","On-location mobile production","Trending audio curation","Color graded for social platforms"]',
   '[{"id":"extra-reel","name":"Extra Reel","price":299}]', 'BOOK HALF DAY'),

  ('pkg-family-events', 'on-spot', 'On-Spot Reels', 'Family Events', null, true, 'TAILORED', false, 'Flexible', 'Custom', 'Custom',
   'Tell us what you''re planning and we''ll build the package around your event.',
   '["Birthdays & Anniversaries","Engagements & Naming ceremonies","Family functions & Celebrations","Custom hours & deliverables","Dedicated mobile cinematographer","Family group portraits & highlight reel"]',
   '[]', 'LET''S HAVE A TALK'),

  ('pkg-promotions', 'business', 'Business', 'Promotions', 2499, false, 'GROWTH', true, '3', '3', '10',
   'High-conversion, social-first reels tailored for brands, cafes, retail, and business promos.',
   '["3 Promotional Reels","On-location shooting","Product & ambiance highlight shots","Hook-driven narrative editing","Commercial-safe audio & sound design","Ready-to-upload delivery within 24 hours"]',
   '[{"id":"extra-biz-reel","name":"Additional Campaign Reel","price":699}]', 'BOOK PROMOTION PACKAGE'),

  ('pkg-custom-business', 'business', 'Business', 'Custom Business Package', null, true, 'ENTERPRISE', false, 'Custom', 'Custom', 'Custom',
   'Every business has different content requirements. Let''s build a package around yours.',
   '["Brand campaigns & Product launches","Corporate summits & Business events","Social media content retainers","Promotional ad videos","Multi-angle mobile crew","Dedicated creative direction"]',
   '[]', 'LET''S HAVE A TALK'),

  ('pkg-wedding-essentials', 'weddings', 'Weddings', 'Wedding Essentials', 12999, false, 'ESSENTIAL', false, '16', '10', '20',
   'Capturing candid wedding bliss without intrusion — instant reels delivered while the celebration is live.',
   '["Haldi + Marriage OR 2 Days Coverage","10 Dynamic Wedding Reels","20 Specialized Cinematic Portraits","On-location mobile cinematography","Fast-turnaround same-day edits","Share-ready private cloud gallery"]',
   '[{"id":"extra-wedding-day","name":"Additional Function Day","price":4999}]', 'BOOK WEDDING COVERAGE'),

  ('pkg-full-marriage', 'weddings', 'Weddings', 'Full Marriage', 59999, false, 'COMPLETE WEDDING', true, '36', '25', '45',
   'The ultimate royal coverage for 3-day luxury celebrations. Complete instant reel mastery.',
   '["3 Full Days Coverage (Mehendi, Sangeet, Wedding, Reception)","25 Cinematic Vertical Reels","45 Specialized High-Res Portraits","2 Dedicated Mobile Creators with Gimbals & Wireless Audio","Priority live-editing station on-site","VIP reel delivery for immediate guest posting"]',
   '[{"id":"drone-aerial","name":"Aerial 4K Reel Teasers","price":7500}]', 'BOOK FULL WEDDING'),

  ('pkg-custom-wedding', 'weddings', 'Weddings', 'Custom Wedding Package', null, true, 'BESPOKE', false, 'Bespoke', 'Bespoke', 'Bespoke',
   'Suitable for destination weddings, multi-city celebrations, and tailored deliverables.',
   '["Additional days & functions","Additional reels & specialized portraits","Multi-creator production crew","Customized music & editing aesthetics","Full destination travel readiness","VIP direct creative director access"]',
   '[]', 'LET''S HAVE A TALK')

ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED: Initial Promotions
-- ============================================================
INSERT INTO promotions (id, title, category, discount, original_price, final_price, target_package_id, valid_until, description, terms, badge, active)
VALUES
  ('promo-fest-2026', 'FESTIVAL SPECIAL: ₹500 OFF', 'Festival Offer', '₹500 OFF', 1499, 999, 'pkg-half-day',
   '2026-04-30T23:59:59Z', 'Celebrate your event with our Most Popular Half-Day reel package at an exclusive festive pricing.',
   'Valid on bookings completed before April 30. Applicable to on-spot events within city limits.', 'LIMITED TIME', true),

  ('promo-college-fest', 'COLLEGE CREATOR PASS', 'College Event Offer', 'FREE +1 EXTRA REEL', 1298, 999, 'pkg-quick-reels',
   '2026-05-15T23:59:59Z', 'Book Quick Reels for your college fest or club event and receive an additional edited reel absolutely free.',
   'Valid student ID must be presented during shoot.', 'STUDENT PASS', true),

  ('promo-wedding-early', 'WEDDING EARLY BIRD: ₹3,000 OFF', 'Wedding Offer', '₹3,000 OFF', 12999, 9999, 'pkg-wedding-essentials',
   '2026-05-31T23:59:59Z', 'Reserve your 2026 wedding dates 30+ days in advance and unlock flat ₹3,000 savings on Wedding Essentials.',
   'Requires advance deposit. Non-transferable.', 'EARLY BIRD', true)

ON CONFLICT (id) DO NOTHING;
