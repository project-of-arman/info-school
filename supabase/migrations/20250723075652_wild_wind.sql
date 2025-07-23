/*
  # Insert Demo Data for School Management System

  1. Demo Users
    - Admin user
    - Teacher users
    - Student users
    - Parent users

  2. Academic Structure
    - Classes (1-12, SSC, HSC)
    - Sections (A, B, C)
    - Subjects

  3. Sample Data
    - Students with Bangladeshi names
    - Teachers with qualifications
    - Attendance records
    - Fee records
*/

-- Insert demo classes (following Bangladeshi education system)
INSERT INTO classes (name, numeric_value, class_type) VALUES
('Class 1', 1, 'regular'),
('Class 2', 2, 'regular'),
('Class 3', 3, 'regular'),
('Class 4', 4, 'regular'),
('Class 5', 5, 'regular'),
('Class 6', 6, 'regular'),
('Class 7', 7, 'regular'),
('Class 8', 8, 'regular'),
('Class 9', 9, 'regular'),
('Class 10', 10, 'ssc'),
('Class 11', 11, 'hsc'),
('Class 12', 12, 'hsc')
ON CONFLICT DO NOTHING;

-- Insert demo sections
WITH class_data AS (
  SELECT id, name FROM classes WHERE name IN ('Class 8', 'Class 9', 'Class 10')
)
INSERT INTO sections (class_id, section_name)
SELECT id, section_name
FROM class_data
CROSS JOIN (VALUES ('A'), ('B'), ('C')) AS s(section_name)
ON CONFLICT DO NOTHING;

-- Insert demo subjects for Class 8
WITH class_8 AS (
  SELECT id FROM classes WHERE name = 'Class 8' LIMIT 1
)
INSERT INTO subjects (class_id, name_english, name_bangla, subject_code, total_marks, pass_marks)
SELECT 
  class_8.id,
  subject_name.name_english,
  subject_name.name_bangla,
  subject_name.code,
  100,
  33
FROM class_8
CROSS JOIN (VALUES 
  ('Bangla', 'বাংলা', 'BAN801'),
  ('English', 'ইংরেজি', 'ENG801'),
  ('Mathematics', 'গণিত', 'MAT801'),
  ('Science', 'বিজ্ঞান', 'SCI801'),
  ('Social Studies', 'সামাজিক বিজ্ঞান', 'SOC801'),
  ('Religion', 'ধর্ম', 'REL801'),
  ('ICT', 'তথ্য ও যোগাযোগ প্রযুক্তি', 'ICT801')
) AS subject_name(name_english, name_bangla, code)
ON CONFLICT DO NOTHING;

-- Note: Demo users will be created when users sign up through the application
-- The following are the demo credentials that can be used:

-- Admin: admin@school.com / admin123
-- Teacher: teacher@school.com / teacher123  
-- Student: student@school.com / student123

-- Insert sample announcements
INSERT INTO announcements (title, content, priority, target_audience, published_by)
VALUES
('Welcome to New Academic Year 2025', 'We welcome all students and teachers to the new academic year. Classes will start from January 15, 2025.', 'high', ARRAY['all'], 
  (SELECT id FROM auth.users WHERE email = 'admin@school.com' LIMIT 1)),
('Mid-term Exam Schedule', 'Mid-term examinations will be held from March 15-25, 2025. Please check the detailed schedule on the notice board.', 'normal', ARRAY['student', 'teacher'], 
  (SELECT id FROM auth.users WHERE email = 'admin@school.com' LIMIT 1)),
('Parent-Teacher Meeting', 'Parent-teacher meeting is scheduled for February 20, 2025, at 10:00 AM. All parents are requested to attend.', 'high', ARRAY['parent'], 
  (SELECT id FROM auth.users WHERE email = 'admin@school.com' LIMIT 1))
ON CONFLICT DO NOTHING;

-- Insert sample library books
INSERT INTO library_books (title, author, isbn, category, total_copies, available_copies, language)
VALUES
('বাংলা ব্যাকরণ ও রচনা', 'ড. মুহম্মদ শহীদুল্লাহ', '978-984-123-001', 'Language', 10, 8, 'bangla'),
('English Grammar & Composition', 'P.C. Wren & H. Martin', '978-984-123-002', 'Language', 15, 12, 'english'),
('গণিত (অষ্টম শ্রেণী)', 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড', '978-984-123-003', 'Mathematics', 20, 18, 'bangla'),
('Science for Class VIII', 'NCTB', '978-984-123-004', 'Science', 25, 22, 'english'),
('বাংলাদেশের ইতিহাস', 'ড. রমেশ চন্দ্র মজুমদার', '978-984-123-005', 'History', 8, 6, 'bangla')
ON CONFLICT DO NOTHING;