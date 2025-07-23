import React from 'react'
import { Mail, Phone, Award } from 'lucide-react'

const teachers = [
  {
    id: 1,
    name: 'মোঃ আব্দুল করিম',
    designation: 'প্রধান শিক্ষক',
    subject: 'বাংলা',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
    qualification: 'এম.এ (বাংলা), বি.এড',
    experience: '২৫ বছর'
  },
  {
    id: 2,
    name: 'মিসেস ফাতেমা খাতুন',
    designation: 'সহকারী প্রধান শিক্ষক',
    subject: 'ইংরেজি',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300',
    qualification: 'এম.এ (ইংরেজি), বি.এড',
    experience: '২০ বছর'
  },
  {
    id: 3,
    name: 'মোঃ রফিকুল ইসলাম',
    designation: 'সহকারী শিক্ষক',
    subject: 'গণিত',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    qualification: 'এম.এস.সি (গণিত), বি.এড',
    experience: '১৫ বছর'
  },
  {
    id: 4,
    name: 'মিসেস সালমা বেগম',
    designation: 'সহকারী শিক্ষক',
    subject: 'বিজ্ঞান',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
    qualification: 'এম.এস.সি (পদার্থবিজ্ঞান), বি.এড',
    experience: '১২ বছর'
  }
]

export default function OurTeachers() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">আমাদের শিক্ষকমণ্ডলী</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {teacher.name}
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-2">
                {teacher.designation}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-green-600" />
                  <span>{teacher.subject}</span>
                </div>
                <p className="text-xs">
                  <strong>যোগ্যতা:</strong> {teacher.qualification}
                </p>
                <p className="text-xs">
                  <strong>অভিজ্ঞতা:</strong> {teacher.experience}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors duration-200">
                  <Mail className="h-3 w-3 inline mr-1" />
                  ইমেইল
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-xs hover:bg-green-700 transition-colors duration-200">
                  <Phone className="h-3 w-3 inline mr-1" />
                  ফোন
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}