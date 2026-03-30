-- Ensure status column exists with proper constraints
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Add constraint if it doesn't exist
ALTER TABLE properties
DROP CONSTRAINT IF EXISTS status_check CASCADE;

ALTER TABLE properties
ADD CONSTRAINT status_check CHECK (status IN ('active', 'closed'));

-- Create index if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
