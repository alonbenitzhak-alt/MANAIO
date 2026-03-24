-- Migration: Security & data integrity fixes
-- Run this in Supabase SQL Editor on existing databases

-- 1. Add ip_address to leads table (used for rate limiting and audit)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS ip_address TEXT;
CREATE INDEX IF NOT EXISTS idx_leads_ip_address ON leads(ip_address);

-- 2. Add ip_address to contact_submissions table (used for rate limiting)
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS ip_address TEXT;
CREATE INDEX IF NOT EXISTS idx_contact_ip_address ON contact_submissions(ip_address);

-- 3. Fix RLS profile update policy — remove fragile subquery from WITH CHECK
--    (old policy could reject all updates if subquery returned NULL)
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
