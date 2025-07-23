import React from 'react'
import { Trophy, Star, Medal } from 'lucide-react'

const students = [
  {
    id: 1,
    name: 'তানিয়া আক্তার',
    class: 'দশম শ্রেণী',
    achievement: 'বিজ্ঞান অলিম্পিয়াড - স্বর্ণপদক',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300',
    grade: 'জিপিএ ৫.০০'
  },
  {
    id: 2,
    name: 'মোঃ রাহুল ইসলাম',
    class: 'নবম শ্রেণী',
    achievement: 'গণিত অলিম্পিয়াড - রৌপ্যপদক',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    grade: 'জিপিএ ৪.৮৮'
  },
  {
    id: 3,
    name: 'সাদিয়া খান',
    class: 'অষ্টম শ্রেণী',
    achievement: 'বাংলা রচনা প্রতিযোগিতা - প্রথম স্থান',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
    grade: 'জিপিএ ৪.৯৫'
  },
  {
    id: 4,
    name: 'মোঃ কামাল হোসেন',
    class: 'সপ্তম শ্রেণী',
    achievement: 'ক্রীড়া প্রতিযোগিতা - চ্যাম্পিয়ন',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
    grade: 'জিপিএ ৪.৭৫'
  }
]

export default function OurStudents() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">আমাদের মেধাবী শিক্ষার্থীরা</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-yellow-500 text-white p-2 rounded-full">
                  <Trophy className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {student.name}
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-2">
                {student.class}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <Medal className="h-4 w-4 mr-2 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">{student.achievement}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-xs font-medium">{student.grade}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded text-xs text-center font-medium">
                  মেধাবী শিক্ষার্থী
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}