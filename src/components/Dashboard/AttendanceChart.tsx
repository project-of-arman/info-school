import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useLanguage } from '../../contexts/LanguageContext'

const data = [
  { day: 'Mon', present: 1150, absent: 84 },
  { day: 'Tue', present: 1180, absent: 54 },
  { day: 'Wed', present: 1120, absent: 114 },
  { day: 'Thu', present: 1200, absent: 34 },
  { day: 'Fri', present: 1090, absent: 144 },
  { day: 'Sat', present: 1160, absent: 74 },
]

export default function AttendanceChart() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Weekly Attendance Overview
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar 
              dataKey="present" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Present"
            />
            <Bar 
              dataKey="absent" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              name="Absent"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}