'use client'

import React, { useEffect, useState, useRef } from 'react'

interface TeHaPasadoProps {
  headings: string[]
  subheadings: string[]
}

const TeHaPasado: React.FC<TeHaPasadoProps> = ({ headings, subheadings }) => {
  const [activeHeading, setActiveHeading] = useState(0)
  const headingsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!headingsRef.current || !sectionRef.current) return

      const section = sectionRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Check if we're in this section
      if (scrollY >= sectionTop - windowHeight / 2 && scrollY < sectionTop + sectionHeight - windowHeight / 2) {
        // Calculate which heading should be active based on scroll position within section
        const sectionProgress = (scrollY - sectionTop + windowHeight / 2) / sectionHeight
        const headingIndex = Math.min(Math.floor(sectionProgress * headings.length), headings.length - 1)
        setActiveHeading(Math.max(0, headingIndex))
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings, subheadings])

  return (
    <section ref={sectionRef} id="te-ha-pasado" className="content-section te-ha-pasado">
      <div className="te-ha-pasado-content">
        <div className="te-ha-pasado-text">
          <div className="te-ha-pasado-description">
            {headings[activeHeading]}
          </div>
          <div ref={headingsRef} className="te-ha-pasado-headings">
            {subheadings.map((subheading, index) => (
              <h2 
                key={index} 
                className={`te-ha-pasado-heading ${index === activeHeading ? 'active' : ''}`}
                dangerouslySetInnerHTML={{ __html: subheading }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeHaPasado