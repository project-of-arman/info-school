import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Calendar, User, Eye } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Notice {
  id: string
  title: string
  content: string
  priority: string
  published_at: string
  published_by: string
  target_audience: string[]
  download_url?: string
}

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>()
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      fetchNotice(id)
    }
  }, [id])

  const fetchNotice = async (noticeId: string) => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          id,
          title,
          content,
          priority,
          published_at,
          target_audience,
          users!announcements_published_by_fkey(email)
        `)
        .eq('id', noticeId)
        .single()

      if (error) throw error
      
      setNotice({
        ...data,
        published_by: data.users?.email || 'Unknown',
        download_url: `https://example.com/downloads/notice-${noticeId}.pdf` // Mock download URL
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'জরুরি'
      case 'high': return 'গুরুত্বপূর্ণ'
      case 'normal': return 'সাধারণ'
      case 'low': return 'কম গুরুত্বপূর্ণ'
      default: return 'সাধারণ'
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

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">নোটিশ পাওয়া যায়নি</h2>
          <p className="text-gray-600 mb-4">{error || 'এই নোটিশটি খুঁজে পাওয়া যায়নি।'}</p>
          <Link
            to="/notices"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            সকল নোটিশ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            to="/notices"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            সকল নোটিশে ফিরে যান
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">নোটিশ বিস্তারিত</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(notice.priority)}`}>
              {getPriorityText(notice.priority)}
            </span>
          </div>
        </div>
      </div>

      {/* Notice Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Notice Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold mb-4">{notice.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {new Date(notice.published_at).toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">{notice.published_by}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {notice.target_audience.includes('all') ? 'সকলের জন্য' : notice.target_audience.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Notice Body */}
          <div className="p-6">
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </div>
            </div>

            {/* Download Section */}
            {notice.download_url && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">সংযুক্তি</h3>
                <a
                  href={notice.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  নোটিশ ডাউনলোড করুন
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  PDF ফরম্যাটে নোটিশটি ডাউনলোড করুন
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                প্রকাশিত: {new Date(notice.published_at).toLocaleString('bn-BD')}
              </p>
              <Link
                to="/notices"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                আরো নোটিশ দেখুন →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}