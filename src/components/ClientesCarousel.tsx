'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const clientesData = [
  // Slide 1
  [
    { id: 1, name: 'Fundación Origen', logo: '/images/cliente_1.png' },
    { id: 2, name: 'Artman', logo: '/images/cliente_2.png' },
    { id: 3, name: 'C8', logo: '/images/cliente_3.png' },
    { id: 4, name: 'McDonalds', logo: '/images/cliente_4.png' },
    { id: 5, name: 'VendeTuAuto', logo: '/images/cliente_5.png' },
    { id: 6, name: 'Riot Games', logo: '/images/cliente_6.png' },
    { id: 7, type: 'placeholder', name: 'espacio disponible' },
    { id: 8, name: 'Jarritos', logo: '/images/cliente_7.png' },
  ],
  // Slide 2
  [
    { id: 9, name: 'Fundación Origen', logo: '/images/cliente_1.png' },
    { id: 10, name: 'Artman', logo: '/images/cliente_2.png' },
    { id: 11, name: 'C8', logo: '/images/cliente_3.png' },
    { id: 12, name: 'McDonalds', logo: '/images/cliente_4.png' },
    { id: 13, name: 'VendeTuAuto', logo: '/images/cliente_5.png' },
    { id: 14, name: 'Riot Games', logo: '/images/cliente_6.png' },
    { id: 15, name: 'Jarritos', logo: '/images/cliente_7.png' },
    { id: 16, type: 'placeholder', name: 'espacio disponible' },
  ],
  // Slide 3
  [
    { id: 17, name: 'Jarritos', logo: '/images/cliente_7.png' },
    { id: 18, name: 'Fundación Origen', logo: '/images/cliente_1.png' },
    { id: 19, name: 'Artman', logo: '/images/cliente_2.png' },
    { id: 20, name: 'C8', logo: '/images/cliente_3.png' },
    { id: 21, name: 'McDonalds', logo: '/images/cliente_4.png' },
    { id: 22, name: 'VendeTuAuto', logo: '/images/cliente_5.png' },
    { id: 23, name: 'Riot Games', logo: '/images/cliente_6.png' },
    { id: 24, type: 'placeholder', name: 'espacio disponible' },
  ]
]

export default function ClientesCarousel() {
  return (
    <>
      <Swiper
        direction="vertical"
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.clientes-button-up-custom',
        }}
        className="clientes-swiper"
      >
        {clientesData.map((slideData, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="clientes-columns">
              <div className="clientes-column">
                {slideData.slice(0, 4).map((client, index) => (
                  <div key={`${client.id}-${index}`} className={`cliente-item ${client.type === 'placeholder' ? 'cliente-placeholder' : ''}`}>
                    {client.type === 'placeholder' ? (
                      <div className="placeholder-content">
                        <span className="placeholder-text">espacio<br/>disponible</span>
                      </div>
                    ) : (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="cliente-logo"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="clientes-column">
                {slideData.slice(4, 8).map((client, index) => (
                  <div key={`${client.id}-${index}`} className={`cliente-item ${client.type === 'placeholder' ? 'cliente-placeholder' : ''}`}>
                    {client.type === 'placeholder' ? (
                      <div className="placeholder-content">
                        <span className="placeholder-text">espacio<br/>disponible</span>
                      </div>
                    ) : (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="cliente-logo"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom up arrow */}
      <div className="clientes-button-up-custom">
        <img
          src="/images/side_arrow.svg"
          alt="Up arrow"
          width={24}
          height={24}
          className="arrow-up"
        />
      </div>
    </>
  )
}
