/*
  # School Management System Initial Schema

  1. New Tables
    - `users` - Core user authentication and role management
    - `students` - Student profiles with Bangladeshi educational standards
    - `teachers` - Teacher profiles and qualifications
    - `classes` - Academic class structure (Class 1-12, SSC, HSC)
    - `sections` - Class sections (A, B, C, etc.)
    - `subjects` - Subject catalog
    - `attendance` - Daily attendance tracking
    - `exams` - Exam management
    - `results` - Student exam results
    - `fees` - Fee management and payments
    - `announcements` - School announcements
    - `library_books` - Library book catalog

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for role-based access
    - Ensure data isolation between institutions

  3. Bangladeshi Educational Standards
    - Support for SSC, HSC, JSC exam systems
    - Bengali grading system (A+, A, A-, B+, etc.)
    - Academic year structure
    - Local fee structure (BDT currency)
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_role CHECK (role IN ('admin', 'teacher', 'student', 'parent'))
);

-- Classes table (Class 1-12, SSC, HSC)
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  numeric_value INTEGER NOT NULL,
  class_type VARCHAR(20) DEFAULT 'regular',
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_class_type CHECK (class_type IN ('regular', 'ssc', 'hsc', 'jsc'))
);

-- Sections table
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  section_name VARCHAR(10) NOT NULL,
  teacher_id UUID REFERENCES users(id),
  max_students INTEGER DEFAULT 40,
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_english VARCHAR(100) NOT NULL,
  name_bangla VARCHAR(100) NOT NULL,
  subject_code VARCHAR(20),
  class_id UUID REFERENCES classes(id),
  total_marks INTEGER DEFAULT 100,
  pass_marks INTEGER DEFAULT 33,
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name_bangla TEXT NOT NULL,
  name_english TEXT NOT NULL,
  father_name_bangla TEXT,
  father_name_english TEXT,
  mother_name_bangla TEXT,
  mother_name_english TEXT,
  birth_certificate_no VARCHAR(50),
  nid_no VARCHAR(20),
  birth_date DATE,
  gender VARCHAR(10),
  blood_group VARCHAR(5),
  religion VARCHAR(20),
  nationality VARCHAR(20) DEFAULT 'Bangladeshi',
  present_address JSONB,
  permanent_address JSONB,
  guardian_id UUID REFERENCES users(id),
  class_id UUID REFERENCES classes(id),
  section_id UUID REFERENCES sections(id),
  student_id VARCHAR(20) UNIQUE,
  admission_date DATE DEFAULT CURRENT_DATE,
  admission_fee DECIMAL(10,2) DEFAULT 0,
  monthly_fee DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_gender CHECK (gender IN ('male', 'female', 'other')),
  CONSTRAINT valid_blood_group CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'graduated', 'transferred'))
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name_bangla TEXT NOT NULL,
  name_english TEXT NOT NULL,
  employee_id VARCHAR(20) UNIQUE,
  designation VARCHAR(100),
  qualification TEXT,
  experience_years INTEGER DEFAULT 0,
  subject_specialization TEXT[],
  joining_date DATE DEFAULT CURRENT_DATE,
  salary DECIMAL(10,2),
  birth_date DATE,
  gender VARCHAR(10),
  blood_group VARCHAR(5),
  nid_no VARCHAR(20),
  present_address JSONB,
  permanent_address JSONB,
  emergency_contact JSONB,
  status VARCHAR(20) DEFAULT 'active',
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_teacher_gender CHECK (gender IN ('male', 'female', 'other')),
  CONSTRAINT valid_teacher_blood_group CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  CONSTRAINT valid_teacher_status CHECK (status IN ('active', 'inactive', 'retired', 'terminated'))
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id),
  section_id UUID REFERENCES sections(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(10) NOT NULL DEFAULT 'present',
  marked_by UUID REFERENCES users(id),
  remarks TEXT,
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_attendance_status CHECK (status IN ('present', 'absent', 'late', 'leave')),
  UNIQUE(student_id, date)
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  exam_type VARCHAR(50) NOT NULL,
  class_id UUID REFERENCES classes(id),
  start_date DATE,
  end_date DATE,
  academic_year INTEGER,
  total_marks INTEGER,
  pass_marks INTEGER,
  status VARCHAR(20) DEFAULT 'scheduled',
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_exam_type CHECK (exam_type IN ('weekly_test', 'monthly_test', 'mid_term', 'final', 'ssc', 'hsc', 'jsc')),
  CONSTRAINT valid_exam_status CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled'))
);

-- Results table
CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  marks_obtained DECIMAL(5,2),
  total_marks DECIMAL(5,2),
  grade VARCHAR(3),
  grade_point DECIMAL(3,2),
  remarks TEXT,
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_grade CHECK (grade IN ('A+', 'A', 'A-', 'B+', 'B', 'C+', 'C', 'D', 'F')),
  UNIQUE(student_id, exam_id, subject_id)
);

-- Fees table
CREATE TABLE IF NOT EXISTS fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  fee_type VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE,
  paid_date DATE,
  paid_amount DECIMAL(10,2) DEFAULT 0,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  academic_year INTEGER,
  month INTEGER,
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_fee_type CHECK (fee_type IN ('tuition', 'admission', 'exam', 'library', 'transport', 'sports', 'other')),
  CONSTRAINT valid_payment_method CHECK (payment_method IN ('cash', 'bank', 'bkash', 'nagad', 'rocket', 'upay', 'card')),
  CONSTRAINT valid_fee_status CHECK (status IN ('pending', 'paid', 'partial', 'overdue', 'waived'))
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'normal',
  target_audience VARCHAR(50)[] DEFAULT ARRAY['all'],
  class_ids UUID[],
  published_by UUID REFERENCES users(id),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'active',
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  CONSTRAINT valid_announcement_status CHECK (status IN ('draft', 'active', 'expired', 'deleted'))
);

-- Library books table
CREATE TABLE IF NOT EXISTS library_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100),
  isbn VARCHAR(20),
  category VARCHAR(50),
  total_copies INTEGER DEFAULT 1,
  available_copies INTEGER DEFAULT 1,
  price DECIMAL(8,2),
  publication_year INTEGER,
  publisher VARCHAR(100),
  language VARCHAR(20) DEFAULT 'bangla',
  status VARCHAR(20) DEFAULT 'available',
  institution_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_book_language CHECK (language IN ('bangla', 'english', 'both')),
  CONSTRAINT valid_book_status CHECK (status IN ('available', 'maintenance', 'lost', 'damaged'))
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_books ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for students table
CREATE POLICY "Admins can manage all students" ON students
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Teachers can read students in their classes" ON students
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'teacher'
    )
  );

CREATE POLICY "Students can read own data" ON students
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for teachers table
CREATE POLICY "Admins can manage all teachers" ON teachers
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Teachers can read own data" ON teachers
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for classes table
CREATE POLICY "Authenticated users can read classes" ON classes
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage classes" ON classes
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- RLS Policies for sections table
CREATE POLICY "Authenticated users can read sections" ON sections
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage sections" ON sections
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- RLS Policies for subjects table
CREATE POLICY "Authenticated users can read subjects" ON subjects
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage subjects" ON subjects
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- RLS Policies for attendance table
CREATE POLICY "Teachers and admins can manage attendance" ON attendance
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'teacher')
    )
  );

CREATE POLICY "Students can read own attendance" ON attendance
  FOR SELECT TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'teacher')
    )
  );

-- RLS Policies for exams table
CREATE POLICY "Authenticated users can read exams" ON exams
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and teachers can manage exams" ON exams
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'teacher')
    )
  );

-- RLS Policies for results table
CREATE POLICY "Teachers and admins can manage results" ON results
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'teacher')
    )
  );

CREATE POLICY "Students can read own results" ON results
  FOR SELECT TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'teacher')
    )
  );

-- RLS Policies for fees table
CREATE POLICY "Admins can manage all fees" ON fees
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Students can read own fees" ON fees
  FOR SELECT TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- RLS Policies for announcements table
CREATE POLICY "Authenticated users can read announcements" ON announcements
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins and teachers can manage announcements" ON announcements
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'teacher')
    )
  );

-- RLS Policies for library_books table
CREATE POLICY "Authenticated users can read library books" ON library_books
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage library books" ON library_books
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_institution ON users(institution_id);
CREATE INDEX IF NOT EXISTS idx_students_class_section ON students(class_id, section_id);
CREATE INDEX IF NOT EXISTS idx_students_institution ON students(institution_id);
CREATE INDEX IF NOT EXISTS idx_teachers_institution ON teachers(institution_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_results_student_exam ON results(student_id, exam_id);
CREATE INDEX IF NOT EXISTS idx_fees_student_status ON fees(student_id, status);
CREATE INDEX IF NOT EXISTS idx_fees_due_date ON fees(due_date);

-- Create trigger for updating updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_students_updated_at 
  BEFORE UPDATE ON students 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_teachers_updated_at 
  BEFORE UPDATE ON teachers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();