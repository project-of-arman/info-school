/*
  # Create Forms System

  1. New Tables
    - `form_types`
      - `id` (uuid, primary key)
      - `name_english` (text)
      - `name_bangla` (text)
      - `description` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `form_submissions`
      - `id` (uuid, primary key)
      - `form_type_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `form_data` (jsonb)
      - `status` (text)
      - `submitted_at` (timestamp)
      - `processed_at` (timestamp)
      - `processed_by` (uuid, foreign key)
      - `remarks` (text)
      - `institution_id` (uuid)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create form_types table
CREATE TABLE IF NOT EXISTS form_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_english text NOT NULL,
  name_bangla text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type_id uuid REFERENCES form_types(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  form_data jsonb NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'approved', 'rejected')),
  submitted_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  processed_by uuid REFERENCES users(id),
  remarks text,
  institution_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE form_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for form_types
CREATE POLICY "Anyone can read active form types"
  ON form_types
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage form types"
  ON form_types
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  ));

-- Policies for form_submissions
CREATE POLICY "Users can read own submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own submissions"
  ON form_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all submissions"
  ON form_submissions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  ));

-- Insert default form types
INSERT INTO form_types (name_english, name_bangla, description) VALUES
('Admission Form', 'ভর্তির ফরম', 'নতুন শিক্ষার্থী ভর্তির জন্য আবেদন ফরম'),
('Scholarship Form', 'বৃত্তির ফরম', 'শিক্ষাবৃত্তির জন্য আবেদন ফরম'),
('Transfer Certificate Form', 'ছাড়পত্রের ফরম', 'স্কুল ছাড়পত্রের জন্য আবেদন ফরম'),
('Testimonial Form', 'প্রশংসাপত্রের ফরম', 'চারিত্রিক প্রশংসাপত্রের জন্য আবেদন ফরম');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON form_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type_id ON form_submissions(form_type_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON form_submissions(submitted_at);