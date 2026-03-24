-- Migration: Add ip_address column for DB-based rate limiting
-- Run this in your Supabase SQL editor

ALTER TABLE leads ADD COLUMN IF NOT EXISTS ip_address TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS ip_address TEXT;

-- Index for fast rate-limit queries
CREATE INDEX IF NOT EXISTS idx_leads_ip_created ON leads(ip_address, created_at);
CREATE INDEX IF NOT EXISTS idx_contact_ip_created ON contact_submissions(ip_address, created_at);
