import React from 'react'
import { Bell } from 'lucide-react'

const marqueeNotices = [
  'নতুন শিক্ষাবর্ষ ২০২৫ এর ভর্তি কার্যক্রম ১ ফেব্রুয়ারি থেকে শুরু',
  'বার্ষিক পরীক্ষার ফলাফল ৩১ জানুয়ারি প্রকাশিত হবে',
  'সকল শিক্ষার্থীদের জন্য বিনামূল্যে স্বাস্থ্য পরীক্ষা ক্যাম্প ২৮ জানুয়ারি',
  'আগামী সপ্তাহে শিক্ষক-অভিভাবক মিটিং অনুষ্ঠিত হবে'
]

export default function MarqueeNotice() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg shadow-lg mb-6">
      <div className="flex items-center">
        <div className="flex items-center bg-white text-red-600 px-3 py-1 rounded-full mr-4 flex-shrink-0">
          <Bell className="h-4 w-4 mr-1" />
          <span className="font-semibold text-sm">জরুরি</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee whitespace-nowrap">
            {marqueeNotices.map((notice, index) => (
              <span key={index} className="inline-block mr-12">
                • {notice}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}