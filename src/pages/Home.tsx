import React from 'react'
import ImageCarousel from '../components/Home/ImageCarousel'
import Navbar from '../components/Home/Navbar'
import NoticeBoard from '../components/Home/NoticeBoard'
import MarqueeNotice from '../components/Home/MarqueeNotice'
import DynamicCards from '../components/Home/DynamicCards'
import VideoGallery from '../components/Home/VideoGallery'
import ImageGallery from '../components/Home/ImageGallery'
import OurTeachers from '../components/Home/OurTeachers'
import OurStudents from '../components/Home/OurStudents'
import SchoolLocation from '../components/Home/SchoolLocation'
import RightSidebar from '../components/Home/RightSidebar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Carousel */}
        <div className="mb-8">
          <ImageCarousel />
        </div>

        {/* Marquee Notice */}
        <MarqueeNotice />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Notice Board */}
            <NoticeBoard />

            {/* Dynamic Cards */}
            <DynamicCards />

            {/* Video Gallery */}
            <VideoGallery />

            {/* Image Gallery */}
            <ImageGallery />

            {/* Our Teachers */}
            <OurTeachers />

            {/* Our Students */}
            <OurStudents />

            {/* School Location */}
            <SchoolLocation />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">আদর্শ উচ্চ বিদ্যালয়</h3>
              <p className="text-gray-300 text-sm">
                শিক্ষার আলোয় আলোকিত করে তোলা আমাদের লক্ষ্য। আমরা প্রতিটি শিক্ষার্থীর 
                সর্বোচ্চ বিকাশে প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">দ্রুত লিংক</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">ভর্তি তথ্য</a></li>
                <li><a href="#" className="hover:text-white">পরীক্ষার ফলাফল</a></li>
                <li><a href="#" className="hover:text-white">নোটিশ বোর্ড</a></li>
                <li><a href="#" className="hover:text-white">যোগাযোগ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>১২৩ শিক্ষা সড়ক, ধানমন্ডি</p>
                <p>ঢাকা - ১২০৫, বাংলাদেশ</p>
                <p>ফোন: +৮৮০ ১৭১২-৩৪৫৬৭৮</p>
                <p>ইমেইল: info@idealschool.edu.bd</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; ২০২৫ আদর্শ উচ্চ বিদ্যালয়। সকল অধিকার সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  )
}