-- 1. Make property_id nullable in conversations (admin chats have no specific property)
ALTER TABLE conversations ALTER COLUMN property_id DROP NOT NULL;

-- 2. Add conversation link + lead pipeline status to contact_submissions
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS lead_status TEXT CHECK (lead_status IN ('open', 'closed'));

-- 3. Admin RLS for conversations
CREATE POLICY "Admin can create any conversation" ON conversations
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin can view all conversations" ON conversations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. Admin RLS for messages
CREATE POLICY "Admin can send messages" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin can read all messages" ON messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin can mark messages read" ON messages
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
