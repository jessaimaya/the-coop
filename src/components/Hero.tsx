'use client'

import React, { useEffect, useState, useRef } from 'react'

const Hero: React.FC = () => {
  const [activeHeading, setActiveHeading] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward')
  const [updateCounter, setUpdateCounter] = useState(0) // Force re-render counter
  const headingsRef = useRef<HTMLDivElement>(null)
  const activeHeadingRef = useRef(0) // Track current value

  useEffect(() => {
    let isDisabled = false
    let rafId: number

    const handleScroll = () => {
      if (isDisabled) return

      // Use requestAnimationFrame for smoother updates
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        
        if (scrollY > 0 && !hasScrolled) {
          setHasScrolled(true)
        }

        const headingIndex = Math.floor(scrollY / windowHeight)
        const newActiveHeading = Math.max(0, Math.min(headingIndex, 6)) // Clamp between 0-6
        
        // Only update if actually different
        if (activeHeadingRef.current !== newActiveHeading) {
          activeHeadingRef.current = newActiveHeading
          setActiveHeading(newActiveHeading)
          setUpdateCounter(c => c + 1)
        }
      })
    }

    const handleDisableHero = () => {
      isDisabled = true
    }

    // Update hero height dynamically
    const updateHeroHeight = () => {
      const heroElement = document.querySelector('.hero') as HTMLElement
      if (heroElement) {
        const headingCount = 7 // We have 7 headings
        const newHeight = headingCount * 100
        heroElement.style.height = `${newHeight}vh`
      }
    }

    // Delay the height update to ensure DOM is ready
    setTimeout(updateHeroHeight, 100)
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('disableHeroScroll', handleDisableHero)
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('disableHeroScroll', handleDisableHero)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
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
