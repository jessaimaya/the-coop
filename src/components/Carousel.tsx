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
  title?: string | React.ElementType
  description?: string | React.ElementType
  content?: string | React.ElementType
  cta?: {
    title: string
    action: string
  }
  backgroundImage: string
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
          dynamicBullets: false
        }}
        autoplay={false}
        loop={true}
        speed={600}
        className="coop-carousel"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="carousel-slide"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="slide-content">
                {slide.title && (
                  typeof slide.title === "string" ? (
                    <h3 className="slide-title" dangerouslySetInnerHTML={{ __html: slide.title }} />
                  ) : (
                    React.createElement(slide.title as React.ElementType)
                  )
                )}
                {slide.description && (
                  typeof slide.description === "string" ? (
                    <div className="slide-description" dangerouslySetInnerHTML={{ __html: slide.description }} />
                  ) : (
                    <div className="slide-description">
                      {React.createElement(slide.description as React.ElementType)}
                    </div>
                  )
                )}
                {slide.content && (
                  typeof slide.content === "string" ? (
                    <div className="slide-text">{slide.content}</div>
                  ) : (
                    React.createElement(slide.content as React.ElementType)
                  )
                )}
                {slide.cta && (
                  <button className="slide-cta" onClick={() => window.location.href = slide.cta!.action}>
                    {slide.cta.title}
                  </button>
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
