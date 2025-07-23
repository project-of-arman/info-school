import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface FormType {
  id: string
  name_english: string
  name_bangla: string
  description: string
}

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'file'
  required: boolean
  options?: string[]
}

const formFields: Record<string, FormField[]> = {
  'Admission Form': [
    { name: 'student_name_bangla', label: 'শিক্ষার্থীর নাম (বাংলা)', type: 'text', required: true },
    { name: 'student_name_english', label: 'শিক্ষার্থীর নাম (ইংরেজি)', type: 'text', required: true },
    { name: 'father_name', label: 'পিতার নাম', type: 'text', required: true },
    { name: 'mother_name', label: 'মাতার নাম', type: 'text', required: true },
    { name: 'birth_date', label: 'জন্ম তারিখ', type: 'date', required: true },
    { name: 'birth_certificate', label: 'জন্ম নিবন্ধন নম্বর', type: 'text', required: true },
    { name: 'gender', label: 'লিঙ্গ', type: 'select', required: true, options: ['পুরুষ', 'মহিলা'] },
    { name: 'blood_group', label: 'রক্তের গ্রুপ', type: 'select', required: false, options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    { name: 'religion', label: 'ধর্ম', type: 'text', required: true },
    { name: 'nationality', label: 'জাতীয়তা', type: 'text', required: true },
    { name: 'present_address', label: 'বর্তমান ঠিকানা', type: 'textarea', required: true },
    { name: 'permanent_address', label: 'স্থায়ী ঠিকানা', type: 'textarea', required: true },
    { name: 'guardian_phone', label: 'অভিভাবকের ফোন', type: 'tel', required: true },
    { name: 'guardian_email', label: 'অভিভাবকের ইমেইল', type: 'email', required: false },
    { name: 'previous_school', label: 'পূর্ববর্তী স্কুল', type: 'text', required: false },
    { name: 'desired_class', label: 'ভর্তিচ্ছু শ্রেণী', type: 'select', required: true, options: ['৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'] },
  ],
  'Scholarship Form': [
    { name: 'student_name', label: 'শিক্ষার্থীর নাম', type: 'text', required: true },
    { name: 'student_id', label: 'শিক্ষার্থী আইডি', type: 'text', required: true },
    { name: 'class_name', label: 'শ্রেণী', type: 'select', required: true, options: ['৬ষ্ঠ', '৭ম', '৮ম', '৯ম', '১০ম'] },
    { name: 'section', label: 'বিভাগ', type: 'text', required: true },
    { name: 'roll_number', label: 'রোল নম্বর', type: 'text', required: true },
    { name: 'father_name', label: 'পিতার নাম', type: 'text', required: true },
    { name: 'father_occupation', label: 'পিতার পেশা', type: 'text', required: true },
    { name: 'monthly_income', label: 'মাসিক আয়', type: 'text', required: true },
    { name: 'family_members', label: 'পরিবারের সদস্য সংখ্যা', type: 'text', required: true },
    { name: 'previous_result', label: 'পূর্ববর্তী পরীক্ষার ফলাফল', type: 'text', required: true },
    { name: 'scholarship_type', label: 'বৃত্তির ধরন', type: 'select', required: true, options: ['মেধাবৃত্তি', 'সাধারণ বৃত্তি', 'দরিদ্র বৃত্তি'] },
    { name: 'reason', label: 'বৃত্তির প্রয়োজনীয়তার কারণ', type: 'textarea', required: true },
  ],
  'Transfer Certificate Form': [
    { name: 'student_name', label: 'শিক্ষার্থীর নাম', type: 'text', required: true },
    { name: 'student_id', label: 'শিক্ষার্থী আইডি', type: 'text', required: true },
    { name: 'class_name', label: 'শ্রেণী', type: 'text', required: true },
    { name: 'section', label: 'বিভাগ', type: 'text', required: true },
    { name: 'roll_number', label: 'রোল নম্বর', type: 'text', required: true },
    { name: 'admission_date', label: 'ভর্তির তারিখ', type: 'date', required: true },
    { name: 'father_name', label: 'পিতার নাম', type: 'text', required: true },
    { name: 'mother_name', label: 'মাতার নাম', type: 'text', required: true },
    { name: 'birth_date', label: 'জন্ম তারিখ', type: 'date', required: true },
    { name: 'reason_for_leaving', label: 'স্কুল ছাড়ার কারণ', type: 'textarea', required: true },
    { name: 'new_school', label: 'নতুন স্কুলের নাম', type: 'text', required: false },
    { name: 'guardian_phone', label: 'অভিভাবকের ফোন', type: 'tel', required: true },
  ],
  'Testimonial Form': [
    { name: 'student_name', label: 'শিক্ষার্থীর নাম', type: 'text', required: true },
    { name: 'student_id', label: 'শিক্ষার্থী আইডি', type: 'text', required: true },
    { name: 'class_name', label: 'শ্রেণী', type: 'text', required: true },
    { name: 'section', label: 'বিভাগ', type: 'text', required: true },
    { name: 'roll_number', label: 'রোল নম্বর', type: 'text', required: true },
    { name: 'session', label: 'শিক্ষাবর্ষ', type: 'text', required: true },
    { name: 'father_name', label: 'পিতার নাম', type: 'text', required: true },
    { name: 'mother_name', label: 'মাতার নাম', type: 'text', required: true },
    { name: 'birth_date', label: 'জন্ম তারিখ', type: 'date', required: true },
    { name: 'conduct', label: 'আচরণ', type: 'select', required: true, options: ['অতি উত্তম', 'উত্তম', 'ভাল', 'সন্তোষজনক'] },
    { name: 'purpose', label: 'প্রশংসাপত্রের উদ্দেশ্য', type: 'textarea', required: true },
    { name: 'guardian_phone', label: 'অভিভাবকের ফোন', type: 'tel', required: true },
  ]
}

export default function FormApplication() {
  const { formId } = useParams<{ formId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [formType, setFormType] = useState<FormType | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (formId) {
      fetchFormType(formId)
    }
  }, [formId])

  const fetchFormType = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('form_types')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setFormType(data)
    } catch (error) {
      console.error('Error fetching form type:', error)
      setError('ফরম লোড করতে সমস্যা হয়েছে')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formType || !user) return

    setSubmitting(true)
    setError('')

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          form_type_id: formType.id,
          user_id: user.id,
          form_data: formData,
          status: 'pending'
        })

      if (error) throw error

      navigate('/forms', { 
        state: { message: 'আপনার আবেদন সফলভাবে জমা দেওয়া হয়েছে' }
      })
    } catch (error: any) {
      setError(error.message || 'আবেদন জমা দিতে সমস্যা হয়েছে')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">লোড হচ্ছে...</span>
      </div>
    )
  }

  if (!formType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ফরম পাওয়া যায়নি</h2>
          <p className="text-gray-600 mb-4">এই ফরমটি খুঁজে পাওয়া যায়নি।</p>
          <button
            onClick={() => navigate('/forms')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ফরমস পেজে ফিরে যান
          </button>
        </div>
      </div>
    )
  }

  const fields = formFields[formType.name_english] || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/forms')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ফরমস পেজে ফিরে যান
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{formType.name_bangla}</h1>
          <p className="text-gray-600 mt-2">{formType.description}</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">নির্বাচন করুন</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : field.type === 'file' ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">ফাইল আপলোড করুন</p>
                        <input
                          type="file"
                          required={field.required}
                          onChange={(e) => handleInputChange(field.name, e.target.files?.[0])}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  * চিহ্নিত ক্ষেত্রগুলি বাধ্যতামূলক
                </p>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/forms')}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'জমা দেওয়া হচ্ছে...' : 'আবেদন জমা দিন'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}