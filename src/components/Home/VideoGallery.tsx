import React, { useState } from 'react'
import { Play, X } from 'lucide-react'

const videos = [
  {
    id: 1,
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৪',
    thumbnail: 'https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'সাংস্কৃতিক অনুষ্ঠান ২০২ৄ',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'বিজ্ঞান মেলা ২০২৪',
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'পুরস্কার বিতরণী অনুষ্ঠান',
    thumbnail: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
]

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ভিডিও গ্যালারি</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedVideo(video.videoUrl)}
          >
            <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:bg-opacity-100 transition-all duration-300">
                  <Play className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {video.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={selectedVideo}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}