import React from 'react'
import { ExternalLink } from 'lucide-react'

const cardData = [
  {
    id: 1,
    title: 'শিক্ষা মন্ত্রণালয়',
    image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'https://www.moedu.gov.bd',
    description: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের শিক্ষা মন্ত্রণালয়'
  },
  {
    id: 2,
    title: 'মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর',
    image: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'https://www.dshe.gov.bd',
    description: 'মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড'
  },
  {
    id: 3,
    title: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড',
    image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.nctb.gov.bd',
    description: 'পাঠ্যপুস্তক ও শিক্ষাক্রম উন্নয়ন'
  },
  {
    id: 4,
    title: 'শিক্ষা বোর্ড ঢাকা',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'https://www.dhakaeducationboard.gov.bd',
    description: 'ঢাকা শিক্ষা বোর্ডের অফিসিয়াল ওয়েবসাইট'
  },
  {
    id: 5,
    title: 'বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়',
    image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.bou.edu.bd',
    description: 'দূরশিক্ষণ ও উন্মুক্ত শিক্ষা ব্যবস্থা'
  },
  {
    id: 6,
    title: 'প্রাথমিক শিক্ষা অধিদপ্তর',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.dpe.gov.bd',
    description: 'প্রাথমিক শিক্ষা ব্যবস্থাপনা ও উন্নয়ন'
  },
  {
    id: 7,
    title: 'কারিগরি শিক্ষা বোর্ড',
    image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.bteb.gov.bd',
    description: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড'
  },
  {
    id: 8,
    title: 'মাদ্রাসা শিক্ষা বোর্ড',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.bmeb.gov.bd',
    description: 'বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড'
  },
  {
    id: 9,
    title: 'বিশ্ববিদ্যালয় মঞ্জুরি কমিশন',
    image: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.ugc.gov.bd',
    description: 'উচ্চশিক্ষার মান নিয়ন্ত্রণ ও উন্নয়ন'
  },
  {
    id: 10,
    title: 'শিক্ষক নিবন্ধন ও প্রত্যয়ন কর্তৃপক্ষ',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.ntrca.gov.bd',
    description: 'শিক্ষক নিবন্ধন ও যোগ্যতা প্রত্যয়ন'
  },
  {
    id: 11,
    title: 'শিক্ষা প্রকৌশল অধিদপ্তর',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.ded.gov.bd',
    description: 'শিক্ষা অবকাঠামো উন্নয়ন ও রক্ষণাবেক্ষণ'
  },
  {
    id: 12,
    title: 'বাংলা একাডেমি',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    url: 'http://www.banglaacademy.org.bd',
    description: 'বাংলা ভাষা ও সাহিত্যের উন্নয়ন'
  }
]

export default function DynamicCards() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">গুরুত্বপূর্ণ লিংক</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute top-4 right-4">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {card.description}
              </p>
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                ভিজিট করুন
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}