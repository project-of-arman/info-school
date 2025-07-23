import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  CreditCard,
  Library,
  Settings,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'

const navigation = [
  { name: 'nav.dashboard', href: '/', icon: Home, roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'nav.students', href: '/students', icon: Users, roles: ['admin', 'teacher'] },
  { name: 'nav.teachers', href: '/teachers', icon: GraduationCap, roles: ['admin'] },
  { name: 'nav.classes', href: '/classes', icon: BookOpen, roles: ['admin', 'teacher'] },
  { name: 'nav.attendance', href: '/attendance', icon: Calendar, roles: ['admin', 'teacher'] },
  { name: 'nav.exams', href: '/exams', icon: FileText, roles: ['admin', 'teacher'] },
  { name: 'nav.fees', href: '/fees', icon: CreditCard, roles: ['admin'] },
  { name: 'nav.library', href: '/library', icon: Library, roles: ['admin', 'teacher', 'student'] },
  { name: 'nav.settings', href: '/settings', icon: Settings, roles: ['admin'] },
]

export default function Sidebar() {
  const { userRole, signOut } = useAuth()
  const { t } = useLanguage()

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole as string)
  )

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-0 z-40 border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">
                {t('dashboard.title')}
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {t(item.name)}
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-4 py-4 border-t border-gray-200">
          <button
            onClick={signOut}
            className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            {t('auth.signout')}
          </button>
        </div>
      </div>
    </div>
  )
}