'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface CarouselSlide {
  id: number
  title: string
  description: string
  content?: string
}

interface CarouselProps {
  slides: CarouselSlide[]
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        speed={600}
        className="coop-carousel"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="carousel-slide">
              <div className="slide-content">
                <h3 className="slide-title">{slide.title}</h3>
                <p className="slide-description">{slide.description}</p>
                {slide.content && (
                  <div className="slide-text">{slide.content}</div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev-custom">
        <Image
          src="/images/side_arrow.svg"
          alt="Previous"
          width={24}
          height={128}
          className="arrow-prev"
        />
      </div>
      <div className="swiper-button-next-custom">
        <Image
          src="/images/side_arrow.svg"
          alt="Next"
          width={24}
          height={128}
          className="arrow-next"
        />
      </div>
    </div>
  )
}

export default Carousel