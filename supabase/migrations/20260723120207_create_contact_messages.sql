/*
# Create contact_messages table (single-tenant, no auth)

1. Purpose
   Stores messages submitted from the public contact form on Dayan Khan's
   portfolio site. The site has no sign-in screen, so submissions come from
   anonymous visitors using the anon key.

2. New Tables
   - `contact_messages`
     - `id`          (uuid, primary key, default gen_random_uuid())
     - `name`        (text, not null)            — sender's name
     - `email`       (text, not null)            — sender's reply-to email
     - `subject`     (text, not null)            — message subject line
     - `message`     (text, not null)            — full message body
     - `read`        (boolean, default false)    — admin read-flag
     - `created_at`  (timestamptz, default now())— submission timestamp

3. Security
   - Enable RLS on `contact_messages`.
   - INSERT only for anon + authenticated: anyone can submit a message,
     but no one can read, update, or delete rows through the anon key.
     This keeps submitted messages private to the project owner (via the
     Supabase dashboard / service role) while still allowing the public
     form to function.
   - No SELECT / UPDATE / DELETE policies are granted to anon/authenticated,
     so the table is effectively write-only from the frontend.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
