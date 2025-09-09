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
      id: 1,
      title: "Un modelo propio",
      description: "No somos agencia ni estudio ni colectivo. Somos una estructura estratégica, creativa y con una manera muy nuestra de hacer las cosas.",
      content: "Profesionales sin rigidez, ingeniosos sin sobreactuar, flexibles sin perder foco."
    },
    {
      id: 2,
      title: "Equipos compactos pero poderosos",
      description: "Seleccionamos talento con precisión. Sin desperdicios, sin jerarquías de más y sin trajes forzados.",
      content: "Conectamos los talentos correctos para lograr cosas que nadie podría hacer solo."
    },
    {
      id: 3,
      title: "Inteligencia, creatividad y cooperación",
      description: "Soñamos con un ecosistema donde reemplacen el ruido, la burocracia y los egos.",
      content: "Una referencia para quienes buscan una forma más inteligente y honesta de hacer las cosas."
    },
    {
      id: 4,
      title: "Estrategia, creatividad y huevos",
      description: "Lo esencial para que las ideas crezcan. Con profesionalismo, con ingenio... y con un toque de actitud.",
      content: "Lo nuestro es resolver, proponer, ejecutar."
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
