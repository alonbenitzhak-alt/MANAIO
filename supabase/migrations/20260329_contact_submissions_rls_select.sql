-- Allow admin to SELECT all contact_submissions
CREATE POLICY "Admin can view all contact submissions"
  ON contact_submissions
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Allow users to SELECT their own submissions (so buyer dashboard can show them)
CREATE POLICY "Users can view their own contact submissions"
  ON contact_submissions
  FOR SELECT
  USING (user_id = auth.uid());
