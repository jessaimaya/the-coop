'use client'

import React, { useEffect, useState, useRef } from 'react'

const Hero: React.FC = () => {
  const [activeHeading, setActiveHeading] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward')
  const headingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for direction flag from ScrollSnap
    const checkDirection = () => {
      const direction = sessionStorage.getItem('heroDirection')
      if (direction === 'backwards') {
        setScrollDirection('backward')
        setActiveHeading(6) // Start at last heading
        sessionStorage.removeItem('heroDirection') // Clear flag
      } else if (direction === 'forward') {
        setScrollDirection('forward')
        setActiveHeading(0) // Start at first heading
        sessionStorage.removeItem('heroDirection') // Clear flag
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      if (scrollY > 0 && !hasScrolled) {
        setHasScrolled(true)
      }

      // Check for direction changes from ScrollSnap
      checkDirection()

      let headingIndex: number

      if (scrollDirection === 'backward') {
        // When scrolling backwards, calculate index in reverse
        const totalHeadings = headingsRef.current?.children.length || 7
        const reverseIndex = Math.floor(scrollY / windowHeight)
        headingIndex = Math.max(0, totalHeadings - 1 - reverseIndex)
      } else {
        // Normal forward scrolling
        headingIndex = Math.floor(scrollY / windowHeight)
      }
      
      setActiveHeading(Math.max(0, headingIndex))
    }

    // Update hero height dynamically
    const updateHeroHeight = () => {
      if (headingsRef.current) {
        const headingCount = headingsRef.current.children.length
        const heroElement = headingsRef.current.closest('.hero') as HTMLElement
        if (heroElement) {
          heroElement.style.height = `${headingCount * 100}vh`
        }
      }
    }

    updateHeroHeight()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="hero">
      <div className={`hero-fixed-image ${activeHeading > 0 ? 'white' : ''}`}>
        <img src="/images/coop.svg" alt="coop logo" />
      </div>
      <div className="hero-content" ref={headingsRef}>
        <div className={`hero-heading ${activeHeading === 0 ? 'active' : ''}`}>
          <span className="text-left">Bienvenidos a <strong>coop</strong></span>
          <span className="text-right"></span>
        </div>
        <div className={`hero-heading ${activeHeading === 1 ? 'active' : ''}`}>
          <span className="text-left"><strong>coop</strong></span>
          <span className="text-right">se pronuncia &quot;kup&quot;</span>
        </div>
        <div className={`hero-heading ${activeHeading === 2 ? 'active' : ''}`}>
          <span className="text-left"><strong>coop</strong></span>
          <span className="text-right">es <strong>coop</strong>eración</span>
        </div>
        <div className={`hero-heading ${activeHeading === 3 ? 'active' : ''}`}>
          <span className="text-left">y <strong>coop</strong></span>
          <span className="text-right">existe para tus ideas.</span>
        </div>
        <div className={`hero-heading ${activeHeading === 4 ? 'active' : ''}`}>
          <span className="text-left"></span>
          <span className="text-right">= ideas.</span>
        </div>
        <div className={`hero-heading ${activeHeading === 5 ? 'active' : ''}`}>
          <span className="text-left"></span>
          <span className="text-right">ideas llenas de posibilidades.</span>
        </div>
        <div className={`hero-heading ${activeHeading === 6 ? 'active' : ''}`}>
          <span className="text-left">y queremos</span>
          <span className="text-right">desarrollarlas contigo.</span>
        </div>
      </div>
      <div className="scroll-message">
        <img src="/images/down_arrow.svg" alt="scroll down" className={!hasScrolled ? 'bounce-animation' : ''} />
        <div className="scroll-text">
          <span>¿escrollea? ¿scrollea?</span>
          <span>- échale pa&apos;bajo -</span>
        </div>
      </div>
    </div>
  )
}

export default Hero
