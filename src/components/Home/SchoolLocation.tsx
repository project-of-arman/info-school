import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function SchoolLocation() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">আমাদের অবস্থান</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0977!2d90.4125181!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjQnNDUuMSJF!5e0!3m2!1sen!2sbd!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">যোগাযোগের তথ্য</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">ঠিকানা</p>
                <p className="text-gray-600 text-sm">
                  আদর্শ উচ্চ বিদ্যালয়<br />
                  ১২৩ শিক্ষা সড়ক, ধানমন্ডি<br />
                  ঢাকা - ১২০৫, বাংলাদেশ
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">ফোন</p>
                <p className="text-gray-600 text-sm">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">ইমেইল</p>
                <p className="text-gray-600 text-sm">info@idealschool.edu.bd</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-5 w-5 text-purple-600 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-900">অফিস সময়</p>
                <div className="text-gray-600 text-sm">
                  <p>রবিবার - বৃহস্পতিবার: ৮:০০ - ৪:০০</p>
                  <p>শুক্রবার: ৮:০০ - ১২:০০</p>
                  <p>শনিবার: বন্ধ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">জরুরি যোগাযোগ</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>প্রধান শিক্ষক: +৮৮০ ১৭১২-১১১১১১</p>
              <p>ভাইস প্রিন্সিপাল: +৮৮০ ১৭১২-২২২২২২</p>
              <p>অফিস: +৮৮০ ১৭১২-৩৩৩৩৩৩</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}