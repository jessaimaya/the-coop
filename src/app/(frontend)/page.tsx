import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import ScrollSnap from '@/components/ScrollSnap'
import Carousel from '@/components/Carousel'
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
  ]

  return (
    <div className="home">
      <Hero />
      <Navbar />

      <ScrollSnap>
        <main>
          <section id="esto-es-coop" className="content-section">
            <div className="section-container">
              <Carousel slides={coopSlides} />
            </div>
          </section>

          <section id="esto-hacemos" className="content-section">
            <div className="section-container">
              <h2>Esto hacemos</h2>
              <p>Content coming soon...</p>
            </div>
          </section>

          <section id="esto-decimos" className="content-section">
            <div className="section-container">
              <h2>Esto decimos</h2>
              <p>Content coming soon...</p>
            </div>
          </section>
        </main>
      </ScrollSnap>
    </div>
  )
}
