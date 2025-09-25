import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import HeroStatic from '@/components/HeroStatic'
import Navbar from '@/components/Navbar'
import Carousel from '@/components/Carousel'
import TeHaPasado from '@/components/TeHaPasado'
import FullPageWrapper from '@/components/FullPageWrapper'
import AvatarMarquee from '@/components/AvatarMarquee'
import ClientesCarousel from '@/components/ClientesCarousel'
import Accordion from '@/components/Accordion'
import ContactTabs from '@/components/ContactTabs'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import ScrollManager from '@/components/ScrollManager'
import './styles.css'


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Sample carousel data based on your brand
  const coopSlides = [
    {
      id: 0,
      title: "somos una<br/> agencia de <br />marketing y <br/>publicidad",
      description: "somos un espacio de colaboración estratégica.<br />una <strong>estructura flexible</strong> que se arma a la medida<br /> de cada proyecto con <strong>estrategia, creatividad,<br /> criterio y <img src='/images/coop.svg' alt='coop' style='display: inline; height: 1em; vertical-align: baseline; margin: 0 0.1em;' /></strong>",
      cta: {
        title: "QUIERO SABER +",
        action: "/about"
      },
      backgroundImage: "/images/slide_1.jpeg"
    },
    {
      id: 1,
      title: "somos una<br/> agencia de <br />marketing y <br/>publicidad",
      description: "somos un espacio de colaboración estratégica.<br />una <strong>estructura flexible</strong> que se arma a la medida<br /> de cada proyecto con <strong>estrategia, creatividad,<br /> criterio y <img src='/images/coop.svg' alt='coop' style='display: inline; height: 1em; vertical-align: baseline; margin: 0 0.1em;' /></strong>",
      cta: {
        title: "QUIERO SABER +",
        action: "/about"
      },
      backgroundImage: "/images/slide_1.jpeg"
    },
    {
      id: 2,
      title: "somos una<br/> agencia de <br />marketing y <br/>publicidad",
      description: "somos un espacio de colaboración estratégica.<br />una <strong>estructura flexible</strong> que se arma a la medida<br /> de cada proyecto con <strong>estrategia, creatividad,<br /> criterio y <img src='/images/coop.svg' alt='coop' style='display: inline; height: 1em; vertical-align: baseline; margin: 0 0.1em;' /></strong>",
      cta: {
        title: "QUIERO SABER +",
        action: "/about"
      },
      backgroundImage: "/images/slide_1.jpeg"
    }, {
      id: 3,
      title: "somos una<br/> agencia de <br />marketing y <br/>publicidad",
      description: "somos un espacio de colaboración estratégica.<br />una <strong>estructura flexible</strong> que se arma a la medida<br /> de cada proyecto con <strong>estrategia, creatividad,<br /> criterio y <img src='/images/coop.svg' alt='coop' style='display: inline; height: 1em; vertical-align: baseline; margin: 0 0.1em;' /></strong>",
      cta: {
        title: "QUIERO SABER +",
        action: "/about"
      },
      backgroundImage: "/images/slide_1.jpeg"
    }
  ];

  const coopProjectsIdeas = [
    {
      id: 0,
      title: "tecnología",
      bullets: [
        "Web Development",
        "Aplicaciones",
        "AI",
        "eCommerce",
        "Landing Pages",
        "eMail marketing",
        "Webflow",
      ]
    },
    {
      id: 1,
      title: "estrategia",
      bullets: [
        "Estrategia de marketing Digital",
        "Consultoría",
        "Capacitación",
        "Business Development",
        "Branding",
        "Growth Strategy",
      ]
    }, {
      id: 2,
      title: "performance",
      bullets: [
        "Advertising",
        "Conversiones",
        "Analytics",
        "Tag Management",
        "Influencers",
        "SEO + SEM",
        "ROI",
        "Consulting",
      ]
    }, {
      id: 3,
      title: "producción",
      bullets: [
        "Diseño Gráfico",
        "Contenido",
        "UI/UX",
        "Producción Audiovisual",
        "Producción Editorial",
        "Social Media",
      ]
    },
  ];

  const teHaPasadoHeadings = [
    "— tienes una idea que no sabes bajar —",
    "— las otras agencias no terminan de sumar —",
    "— te falta tiempo para pensar —",
    "— mucho tiempo, poco impacto —",
    "— difitultad para traducir visión a estructura —",
    "— miedo a soltar el control —",
  ];
  const teHaPasadoSubheadings = [
    "...la tengo en la cabeza, pero cada día que intento explicarla, se enreda.",
    "...me entienden, pero no me leen. Todo lo tengo que detallar yo",
    "...quiero hacer las cosas bien, pero el día no me alcanza ni para pensarlas.",
    "...ya probé varias coas... pero sigo sin ver resultados que me convenzan.",
    "...sé lo que quiero, pero no sé cómo se ve, ni cómo se hace.",
    "no quiero que llegue alguien a mover todo. Solo que entienda y complemente."
  ];

  const dudas = [
    {
      pregunta: " ¿qué fue primero el huevo o la gallina?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    },
    {
      pregunta: " ¿cuál es la diferencia entre huevos rancheros y divorciados?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    }, {
      pregunta: " ¿son los huevos blancos o marrones más nutritivos?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    }, {
      pregunta: " ¿hay vida en otros planetas?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    }, {
      pregunta: " ¿cómo saber si un huevo está fresco?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    }, {
      pregunta: " ¿por qué los pilotos kamikaze llevaban casco protector?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    }, {
      pregunta: " ¿cuánto tiempo se deben hervir los huevos?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    }, {
      pregunta: " ¿por qué nos despertamos justo antes de que suene el despertador?",
      respuesta: "Obviamente el huevo. Pero, ¿entonces quien puso el huevo La gallina. Pero entonces, ¿cómo llegó la gallina Seguro de un huevo, pero ¿quién lo puso Una gallina, ¿no ¡Pero la gallina viene del huevo! Bueno, en coop primero es y será el huevo."
    },
  ];


  return (
    <div className="home">
      <Navbar />

      <ErrorBoundary>
        <ScrollManager
          heroComponent={<HeroStatic />}
          fullPageComponent={
            <FullPageWrapper>
              <div className="section" data-anchor="coop">
                <section className="content-section">
                  <div className="section-container">
                    <Carousel slides={coopSlides} />
                  </div>
                </section>
              </div>

              <div className="section" data-anchor="hacemos">
                <section className="content-section esto-hacemos">
                  <div className="esto-hacemos-content">
                    <div className="esto-hacemos-text">
                      <div className="esto-hacemos-description">
                        — esto decimos que hacemos —
                      </div>
                      <h2 className="esto-hacemos-title">projects & ideas <br />hatching</h2>
                      <div className="esto-hacemos-description">
                        nutrimos con trabajo (y algo más) proyectos de marketing que <br />
                        requieren del apoyo y acompañamiento de expertos en...
                      </div>
                    </div>
                    <div className="esto-hacemos-boxes">
                      {coopProjectsIdeas.map((project) => (
                        <div key={project.id} className="esto-hacemos-box">
                          <h3 className="box-title">{project.title}</h3>
                          <hr />
                          <ul className="box-list">
                            {project.bullets.map((bullet, index) => (
                              <li key={index}>{bullet}</li>
                            ))}
                          </ul>
                          <Image
                            src="/images/plus_icon.svg"
                            alt="Plus icon"
                            width={24}
                            height={24}
                            className="box-plus-icon"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className="section" data-anchor="pasado">
                <TeHaPasado headings={teHaPasadoHeadings} subheadings={teHaPasadoSubheadings} />
              </div>

              <div className="section" data-anchor="nosotros">
                <section className="content-section nosotros-section">
                  <div className="section-container">
                    <AvatarMarquee />
                    <div className='nosotros-contenido'>
                      <div className="nosotros-left">
                        <h2>trabaja <br /> con <br /> <span>coop</span></h2>
                      </div>
                      <div className="nosotros-right">
                        <p>somos una comunidad hecha por personas multidisciplinarias llenas de talento listas para ayudar</p>
                        <a href="#" title="contacto" className="nosotros-cta">Quiero platicar con ustedes</a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="section" data-anchor="clientes">
                <section className="content-section clientes-section">
                  <div className="section-container">
                    <div className='cliente-contenido'>
                      <div className="cliente-left">
                        <h2><span className='light init'>ya han</span> trabaja<span className='light do'>do</span><br />con <br /> <span>coop</span></h2>
                      </div>
                      <div className="cliente-right">
                        <div className='cliente-carousel'>
                          <ClientesCarousel />
                        </div>
                        <a href="#" title="contacto" className="cliente-cta"><span className='light'>AHORA </span>Quiero platicar + con ustedes</a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="section" data-anchor="dudas">
                <section className="content-section dudas-section">
                  <div className="dudas-container">
                    <div className="dudas-left">
                      {/* Left column - empty for now, background image will show */}
                    </div>
                    <div className="dudas-right">
                      <div className="dudas-box">
                        <h2>¿todavía <br />tienes dudas?</h2>
                        <Accordion items={dudas} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="section" data-anchor="contact">
                <section className="content-section contact-section">
                  <div className="section-container">
                    <h2>tu siguiente paso</h2>
                    <ContactTabs />
                  </div>
                  <Footer />
                </section>
              </div>
            </FullPageWrapper>
          }
        />
      </ErrorBoundary>
    </div>
  )
}
