import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const carouselImages = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'আমাদের বিদ্যালয়ের প্রধান ভবন',
    description: 'শিক্ষার আলোয় আলোকিত আমাদের প্রতিষ্ঠান'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'শিক্ষার্থীদের ক্রীড়া কার্যক্রম',
    description: 'খেলাধুলার মাধ্যমে শারীরিক ও মানসিক বিকাশ'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'আধুনিক শ্রেণীকক্ষ',
    description: 'প্রযুক্তি নির্ভর শিক্ষা ব্যবস্থা'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'বিজ্ঞান গবেষণাগার',
    description: 'হাতে-কলমে বিজ্ঞান শিক্ষা'
  }
]

export default function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'linear'
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg">
      <Slider {...settings}>
        {carouselImages.map((image) => (
          <div key={image.id} className="relative h-96 md:h-[500px]">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                <p className="text-lg opacity-90">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}