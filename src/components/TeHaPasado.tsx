'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface TeHaPasadoProps {
  headings: string[]
  subheadings: string[]
}

const TeHaPasado: React.FC<TeHaPasadoProps> = ({ headings, subheadings }) => {
  return (
    <div className="te-ha-pasado-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.te-ha-pasado-button-next-custom',
          prevEl: '.te-ha-pasado-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        loop={true}
        className="te-ha-pasado-swiper"
      >
        {headings.map((heading, index) => (
          <SwiperSlide key={index}>
            <div className="te-ha-pasado-content">
              <div className="te-ha-pasado-text">
                <div className="te-ha-pasado-description">
                  {heading}
                </div>
                <div className="te-ha-pasado-headings">
                  <h2 className="te-ha-pasado-heading" dangerouslySetInnerHTML={{
                    __html: subheadings[index]
                  }} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="te-ha-pasado-button-prev-custom">
        <Image
          src="/images/side_arrow.svg"
          alt="Previous"
          width={24}
          height={128}
          className="arrow-prev"
        />
      </div>
      <div className="te-ha-pasado-button-next-custom">
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

export default TeHaPasado
