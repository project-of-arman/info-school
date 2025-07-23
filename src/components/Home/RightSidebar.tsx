import React from 'react'
import { Phone, Mail, ExternalLink, Calendar, Users, Award } from 'lucide-react'

const quickLinks = [
  {
    id: 1,
    title: 'অনলাইন ভর্তি',
    image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'ভর্তি বিভাগ',
    phone: '+৮৮০ ১৭১২-১১১১১১',
    url: 'https://admission.idealschool.edu.bd'
  },
  {
    id: 2,
    title: 'পরীক্ষার ফলাফল',
    image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'পরীক্ষা নিয়ন্ত্রক',
    phone: '+৮৮০ ১৭১২-২২২২২২',
    url: 'https://results.idealschool.edu.bd'
  },
  {
    id: 3,
    title: 'বৃত্তি আবেদন',
    image: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'বৃত্তি বিভাগ',
    phone: '+৮৮০ ১৭১২-৩৩৩৩৩৩',
    url: 'https://scholarship.idealschool.edu.bd'
  },
  {
    id: 4,
    title: 'অনলাইন ক্লাস',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'আইসিটি বিভাগ',
    phone: '+৮৮০ ১৭১২-৪৪৪৪৪৪',
    url: 'https://elearning.idealschool.edu.bd'
  },
  {
    id: 5,
    title: 'লাইব্রেরি সেবা',
    image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'গ্রন্থাগারিক',
    phone: '+৮৮০ ১৭১২-৫৫৫৫৫৫',
    url: 'https://library.idealschool.edu.bd'
  },
  {
    id: 6,
    title: 'ফি পেমেন্ট',
    image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'হিসাব বিভাগ',
    phone: '+৮৮০ ১৭১২-৬৬৬৬৬৬',
    url: 'https://payment.idealschool.edu.bd'
  },
  {
    id: 7,
    title: 'ছাত্রবৃত্তি তথ্য',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'একাডেমিক বিভাগ',
    phone: '+৮৮০ ১৭১২-৭৭৭৭৭৭',
    url: 'https://scholarship-info.idealschool.edu.bd'
  },
  {
    id: 8,
    title: 'ক্যারিয়ার গাইডেন্স',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
    name: 'কাউন্সেলিং বিভাগ',
    phone: '+৮৮০ ১৭১২-৮৮৮৮৮৮',
    url: 'https://career.idealschool.edu.bd'
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
    date: '৫ ফেব্রুয়ারি, ২০২৫',
    time: 'সকাল ৯:০০'
  },
  {
    id: 2,
    title: 'অভিভাবক সভা',
    date: '৩০ জানুয়ারি, ২০২৫',
    time: 'সকাল ১০:০০'
  },
  {
    id: 3,
    title: 'বিজ্ঞান মেলা',
    date: '১০ ফেব্রুয়ারি, ২০২৫',
    time: 'সকাল ৮:০০'
  }
]

const achievements = [
  {
    id: 1,
    title: 'জাতীয় বিজ্ঞান অলিম্পিয়াড',
    achievement: '৫টি স্বর্ণপদক',
    year: '২০২৪'
  },
  {
    id: 2,
    title: 'আন্তর্জাতিক গণিত অলিম্পিয়াড',
    achievement: '৩টি রৌপ্যপদক',
    year: '২০২৪'
  },
  {
    id: 3,
    title: 'জাতীয় বিতর্ক প্রতিযোগিতা',
    achievement: 'চ্যাম্পিয়ন',
    year: '২০২৪'
  }
]

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* Prime Minister Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white py-2 px-4">
          <h3 className="text-lg font-semibold text-center">সভাপতি মহোদয়</h3>
        </div>
        <div className="p-4">
          <div className="text-center">
            <div className="relative mx-auto w-52 h-56 mb-3">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="সভাপতি মহোদয়"
                className="w-full h-full object-cover object-top position-top rounded-lg shadow-md"
              />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              প্রফেসর মহাঃ তৌহিদুল ইসলাম
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              সভাপতি কুমরগঞ্জ দ্বিমুখী উচ্চ বিদ্যালয়
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ExternalLink className="mr-2 h-5 w-5 text-blue-600" />
          দ্রুত সেবা
        </h3>
        <div className="space-y-4">
          {quickLinks.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            >
              <img
                src={link.image}
                alt={link.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{link.title}</h4>
                <p className="text-xs text-gray-600">{link.name}</p>
                <div className="flex items-center mt-1">
                  <Phone className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-xs text-gray-500">{link.phone}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-green-600" />
          আসন্ন অনুষ্ঠান
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="border-l-4 border-green-500 pl-3 py-2 hover:bg-green-50 transition-colors duration-200"
            >
              <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
              <p className="text-xs text-gray-600">{event.date}</p>
              <p className="text-xs text-green-600">{event.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Statistics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="mr-2 h-5 w-5 text-purple-600" />
          পরিসংখ্যান
        </h3>
        <div className="space-y-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">১,২৩৪</div>
            <div className="text-sm text-gray-600">মোট শিক্ষার্থী</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">৮৭</div>
            <div className="text-sm text-gray-600">শিক্ষক</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">৪৫</div>
            <div className="text-sm text-gray-600">শ্রেণী</div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="mr-2 h-5 w-5 text-yellow-600" />
          সাম্প্রতিক অর্জন
        </h3>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border-l-4 border-yellow-500 pl-3 py-2 hover:bg-yellow-50 transition-colors duration-200"
            >
              <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
              <p className="text-xs text-yellow-600 font-medium">{achievement.achievement}</p>
              <p className="text-xs text-gray-500">{achievement.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">যোগাযোগ করুন</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span className="text-sm">+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span className="text-sm">info@idealschool.edu.bd</span>
          </div>
        </div>
        <button className="w-full mt-4 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
          আরো তথ্য
        </button>
      </div>
    </div>
  )
}