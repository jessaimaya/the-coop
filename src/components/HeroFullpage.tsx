'use client'

import React, { useEffect, useState, useRef } from 'react'

const HeroFullpage: React.FC = () => {
  const [activeHeading, setActiveHeading] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const headingsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const headings = [
    { text: 'Bienvenidos a <strong>coop</strong>', position: 'left' },
    { text: '<strong>coop</strong> se pronuncia \'kup\'', position: 'right' },
    { text: '<strong>coop</strong> es <strong>coop</strong>eración', position: 'left' },
    { text: 'y <strong>coop</strong> existe para tus ideas', position: 'right' },
    { text: '= ideas', position: 'left' },
    { text: 'ideas llenas de posibilidades', position: 'right' },
    { text: 'y queremos desarrollarlas contigo', position: 'left' },
  ]

  useEffect(() => {
    // Set dynamic height for the hero section to accommodate all headings
    if (headingsRef.current && sectionRef.current) {
      const headingCount = headings.length
      sectionRef.current.style.height = `${headingCount * 100}vh`
    }

    let animationStarted = false

    const handleScroll = (event: WheelEvent) => {
      if (!sectionRef.current) return

      // Only handle scroll when we're in the hero section
      const heroSection = sectionRef.current
      const rect = heroSection.getBoundingClientRect()
      
      // Check if hero section is currently visible
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        event.preventDefault()
        
        if (!animationStarted) {
          animationStarted = true
          startHeadingAnimation()
        }
      }
    }

    const startHeadingAnimation = () => {
      let currentIndex = 0
      const animationInterval = setInterval(() => {
        setActiveHeading(currentIndex)
        setHasScrolled(true)
        
        currentIndex++
        if (currentIndex >= headings.length) {
          clearInterval(animationInterval)
          // Allow progression to next section after animation
          setTimeout(() => {
            // Trigger fullpage.js to move to next section
            const fullpageApi = (window as any).fullpage_api
            if (fullpageApi) {
              fullpageApi.moveSectionDown()
            }
          }, 2000)
        }
      }, 1500) // 1.5 second intervals
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('wheel', handleScroll, { passive: false })
      
      return () => {
        section.removeEventListener('wheel', handleScroll)
      }
    }
  }, [headings.length])

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero-content">
        <div className="hero-fixed-image">
          <img
            src="/images/coop.svg"
            alt="coop logo"
            width="200"
            height="200"
            className={activeHeading > 0 ? 'white' : ''}
          />
        </div>

        <div ref={headingsRef} className="hero-headings">
          {headings.map((heading, index) => (
            <h1
              key={index}
              className={`hero-heading ${index === activeHeading ? 'active' : ''}`}
            >
              <span className={`text-${heading.position}`}>
                <span dangerouslySetInnerHTML={{ __html: heading.text }} />
              </span>
            </h1>
          ))}
        </div>

        <div className="scroll-message">
          <img
            src="/images/scroll.svg"
            alt="Scroll down"
            width="24"
            height="24"
            className="bounce-animation"
          />
          <div className="scroll-text">
            <span>scroll</span>
            <span>para conocer coop</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroFullpage