import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout/Layout'
import Login from './components/Auth/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import AllNotices from './pages/AllNotices'
import NoticeDetail from './pages/NoticeDetail'
import AllForms from './pages/AllForms'
import FormApplication from './pages/FormApplication'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notices" element={<AllNotices />} />
      <Route path="/notices/:id" element={<NoticeDetail />} />
      <Route path="/forms" element={<AllForms />} />
      <Route path="/forms/:formId/apply" element={<FormApplication />} />
      <Route path="/login" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<div className="p-8 text-center text-gray-500">Classes page coming soon...</div>} />
        <Route path="attendance" element={<div className="p-8 text-center text-gray-500">Attendance page coming soon...</div>} />
        <Route path="exams" element={<div className="p-8 text-center text-gray-500">Exams page coming soon...</div>} />
        <Route path="fees" element={<div className="p-8 text-center text-gray-500">Fees page coming soon...</div>} />
        <Route path="library" element={<div className="p-8 text-center text-gray-500">Library page coming soon...</div>} />
        <Route path="settings" element={<div className="p-8 text-center text-gray-500">Settings page coming soon...</div>} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}