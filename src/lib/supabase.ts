import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone?: string
          role: 'admin' | 'teacher' | 'student' | 'parent'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          phone?: string
          role: 'admin' | 'teacher' | 'student' | 'parent'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string
          role?: 'admin' | 'teacher' | 'student' | 'parent'
          created_at?: string
        }
      }
      students: {
        Row: {
          id: string
          name_bangla: string
          name_english: string
          birth_certificate_no?: string
          nid_no?: string
          blood_group?: string
          guardian_id?: string
          class_id?: string
          section_id?: string
          admission_date?: string
          created_at: string
        }
        Insert: {
          id: string
          name_bangla: string
          name_english: string
          birth_certificate_no?: string
          nid_no?: string
          blood_group?: string
          guardian_id?: string
          class_id?: string
          section_id?: string
          admission_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          name_bangla?: string
          name_english?: string
          birth_certificate_no?: string
          nid_no?: string
          blood_group?: string
          guardian_id?: string
          class_id?: string
          section_id?: string
          admission_date?: string
          created_at?: string
        }
      }
      teachers: {
        Row: {
          id: string
          name_bangla: string
          name_english: string
          designation?: string
          qualification?: string
          subject_specialization?: string[]
          joining_date?: string
          created_at: string
        }
        Insert: {
          id: string
          name_bangla: string
          name_english: string
          designation?: string
          qualification?: string
          subject_specialization?: string[]
          joining_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          name_bangla?: string
          name_english?: string
          designation?: string
          qualification?: string
          subject_specialization?: string[]
          joining_date?: string
          created_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          name: string
          numeric_value: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          numeric_value: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          numeric_value?: number
          created_at?: string
        }
      }
      sections: {
        Row: {
          id: string
          class_id: string
          section_name: string
          teacher_id?: string
          created_at: string
        }
        Insert: {
          id?: string
          class_id: string
          section_name: string
          teacher_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          class_id?: string
          section_name?: string
          teacher_id?: string
          created_at?: string
        }
      }
    }
  }
}