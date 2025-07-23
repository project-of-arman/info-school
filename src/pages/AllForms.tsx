import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, Clock, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface FormType {
  id: string
  name_english: string
  name_bangla: string
  description: string
  is_active: boolean
}

interface FormSubmission {
  id: string
  form_type_id: string
  status: 'pending' | 'processing' | 'approved' | 'rejected'
  submitted_at: string
  processed_at?: string
  remarks?: string
  form_types: {
    name_bangla: string
    name_english: string
  }
}

export default function AllForms() {
  const [formTypes, setFormTypes] = useState<FormType[]>([])
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'available' | 'submitted'>('available')
  const { user } = useAuth()

  useEffect(() => {
    fetchFormTypes()
    if (user) {
      fetchSubmissions()
    }
  }, [user])

  const fetchFormTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('form_types')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) throw error
      setFormTypes(data || [])
    } catch (error) {
      console.error('Error fetching form types:', error)
    }
  }

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select(`
          *,
          form_types (
            name_bangla,
            name_english
          )
        `)
        .eq('user_id', user?.id)
        .order('submitted_at', { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'অপেক্ষমাণ'
      case 'processing': return 'প্রক্রিয়াধীন'
      case 'approved': return 'অনুমোদিত'
      case 'rejected': return 'প্রত্যাখ্যাত'
      default: return 'অজানা'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'processing': return <AlertCircle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">সকল ফরমস</h1>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              হোমে ফিরে যান
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('available')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === 'available'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              উপলব্ধ ফরমস
            </button>
            <button
              onClick={() => setActiveTab('submitted')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === 'submitted'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              জমাদানকৃত ফরমস ({submissions.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'available' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formTypes.map((formType) => (
              <div
                key={formType.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-3 mx-auto">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white text-center">
                    {formType.name_bangla}
                  </h3>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    {formType.description}
                  </p>
                  
                  <div className="space-y-2">
                    <Link
                      to={`/forms/${formType.id}/apply`}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      আবেদন করুন
                    </Link>
                    
                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                      <Download className="h-4 w-4 mr-2" />
                      নমুনা ডাউনলোড
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">কোন ফরম জমা দেওয়া হয়নি</h3>
                <p className="text-gray-600">আপনি এখনো কোন ফরম জমা দেননি।</p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {submission.form_types.name_bangla}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>জমাদানের তারিখ: </span>
                        <span className="ml-1">
                          {new Date(submission.submitted_at).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {submission.processed_at && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span>প্রক্রিয়াকরণের তারিখ: </span>
                          <span className="ml-1">
                            {new Date(submission.processed_at).toLocaleDateString('bn-BD', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(submission.status)}`}>
                        {getStatusIcon(submission.status)}
                        <span className="ml-1">{getStatusText(submission.status)}</span>
                      </span>
                    </div>
                  </div>

                  {submission.remarks && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">মন্তব্য:</h4>
                      <p className="text-sm text-gray-700">{submission.remarks}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      আবেদন নম্বর: {submission.id.slice(0, 8)}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        বিস্তারিত দেখুন
                      </button>
                      {submission.status === 'approved' && (
                        <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          ডাউনলোড
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}