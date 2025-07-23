import React from 'react'
import { Calendar, ArrowRight } from 'lucide-react'

const notices = [
  {
    id: 1,
    title: 'নতুন শিক্ষাবর্ষ ২০২৫ এর ভর্তি বিজ্ঞপ্তি',
    date: '২৫ জানুয়ারি, ২০২৫',
    description: 'আগামী ১ ফেব্রুয়ারি থেকে নতুন শিক্ষাবর্ষের ভর্তি কার্যক্রম শুরু হবে।'
  },
  {
    id: 2,
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৫',
    date: '২০ জানুয়ারি, ২০২৫',
    description: 'আগামী ৫ ফেব্রুয়ারি বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে।'
  },
  {
    id: 3,
    title: 'অভিভাবক সভা আয়োজন',
    date: '১৮ জানুয়ারি, ২০২৫',
    description: 'আগামী ৩০ জানুয়ারি সকাল ১০টায় অভিভাবক সভা অনুষ্ঠিত হবে।'
  },
  {
    id: 4,
    title: 'বিজ্ঞান মেলা ২০২৫',
    date: '১৫ জানুয়ারি, ২০২৫',
    description: 'আগামী ১০ ফেব্রুয়ারি বিজ্ঞান মেলার আয়োজন করা হবে।'
  },
  {
    id: 5,
    title: 'সাংস্কৃতিক অনুষ্ঠান',
    date: '১২ জানুয়ারি, ২০২৫',
    description: 'আগামী ২৫ ফেব্রুয়ারি সাংস্কৃতিক অনুষ্ঠান অনুষ্ঠিত হবে।'
  }
]

export default function NoticeBoard() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-blue-600" />
          নোটিশ বোর্ড
        </h2>
        <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          আরো নোটিশ
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {notice.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {notice.description}
                </p>
                <span className="text-xs text-gray-500">
                  {notice.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}