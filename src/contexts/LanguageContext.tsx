import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'bn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Auth
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.signout': 'Sign Out',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.role': 'Role',
    'auth.login': 'Login',
    'auth.register': 'Register',
    
    // Dashboard
    'dashboard.title': 'School Management System',
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Dashboard Overview',
    'dashboard.totalStudents': 'Total Students',
    'dashboard.totalTeachers': 'Total Teachers',
    'dashboard.totalClasses': 'Total Classes',
    'dashboard.attendance': 'Today\'s Attendance',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.students': 'Students',
    'nav.teachers': 'Teachers',
    'nav.classes': 'Classes',
    'nav.attendance': 'Attendance',
    'nav.exams': 'Exams',
    'nav.fees': 'Fees',
    'nav.library': 'Library',
    'nav.settings': 'Settings',
    
    // Roles
    'role.admin': 'Admin',
    'role.teacher': 'Teacher',
    'role.student': 'Student',
    'role.parent': 'Parent',
    
    // Students
    'students.title': 'Student Management',
    'students.add': 'Add New Student',
    'students.name.english': 'Name (English)',
    'students.name.bangla': 'Name (Bangla)',
    'students.birthCertificate': 'Birth Certificate No.',
    'students.bloodGroup': 'Blood Group',
    'students.class': 'Class',
    'students.section': 'Section',
    'students.admissionDate': 'Admission Date',
    
    // Teachers
    'teachers.title': 'Teacher Management',
    'teachers.add': 'Add New Teacher',
    'teachers.designation': 'Designation',
    'teachers.qualification': 'Qualification',
    'teachers.subjects': 'Subject Specialization',
    'teachers.joiningDate': 'Joining Date',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.language': 'Language',
  },
  bn: {
    // Auth
    'auth.signin': 'সাইন ইন',
    'auth.signup': 'সাইন আপ',
    'auth.signout': 'সাইন আউট',
    'auth.email': 'ইমেইল',
    'auth.password': 'পাসওয়ার্ড',
    'auth.role': 'ভূমিকা',
    'auth.login': 'লগইন',
    'auth.register': 'নিবন্ধন',
    
    // Dashboard
    'dashboard.title': 'স্কুল ম্যানেজমেন্ট সিস্টেম',
    'dashboard.welcome': 'স্বাগতম',
    'dashboard.overview': 'ড্যাশবোর্ড ওভারভিউ',
    'dashboard.totalStudents': 'মোট শিক্ষার্থী',
    'dashboard.totalTeachers': 'মোট শিক্ষক',
    'dashboard.totalClasses': 'মোট ক্লাস',
    'dashboard.attendance': 'আজকের উপস্থিতি',
    
    // Navigation
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.students': 'শিক্ষার্থীরা',
    'nav.teachers': 'শিক্ষকগণ',
    'nav.classes': 'ক্লাস',
    'nav.attendance': 'উপস্থিতি',
    'nav.exams': 'পরীক্ষা',
    'nav.fees': 'ফি',
    'nav.library': 'লাইব্রেরি',
    'nav.settings': 'সেটিংস',
    
    // Roles
    'role.admin': 'প্রশাসক',
    'role.teacher': 'শিক্ষক',
    'role.student': 'শিক্ষার্থী',
    'role.parent': 'অভিভাবক',
    
    // Students
    'students.title': 'শিক্ষার্থী ব্যবস্থাপনা',
    'students.add': 'নতুন শিক্ষার্থী যোগ করুন',
    'students.name.english': 'নাম (ইংরেজি)',
    'students.name.bangla': 'নাম (বাংলা)',
    'students.birthCertificate': 'জন্ম সনদ নম্বর',
    'students.bloodGroup': 'রক্তের গ্রুপ',
    'students.class': 'শ্রেণী',
    'students.section': 'বিভাগ',
    'students.admissionDate': 'ভর্তির তারিখ',
    
    // Teachers
    'teachers.title': 'শিক্ষক ব্যবস্থাপনা',
    'teachers.add': 'নতুন শিক্ষক যোগ করুন',
    'teachers.designation': 'পদবী',
    'teachers.qualification': 'যোগ্যতা',
    'teachers.subjects': 'বিষয় বিশেষত্ব',
    'teachers.joiningDate': 'যোগদানের তারিখ',
    
    // Common
    'common.save': 'সেভ করুন',
    'common.cancel': 'বাতিল',
    'common.edit': 'সম্পাদনা',
    'common.delete': 'মুছুন',
    'common.view': 'দেখুন',
    'common.search': 'অনুসন্ধান',
    'common.loading': 'লোড হচ্ছে...',
    'common.noData': 'কোন তথ্য নেই',
    'common.language': 'ভাষা',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}