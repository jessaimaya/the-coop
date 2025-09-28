'use client'

import React, { useState, useEffect, useRef } from 'react'

const HeroStatic: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeHeading, setActiveHeading] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [heroComplete, setHeroComplete] = useState(false)
  const activeHeadingRef = useRef(0)
  const lastChangeTimeRef = useRef(0)
  const heroRef = useRef<HTMLDivElement>(null)

  const headings = [
    { left: "Bienvenidos a ", leftBold: "coop", right: "" },
    { left: "", leftBold: "coop", right: "se pronuncia \"kup\"" },
    { left: "", leftBold: "coop", right: "es ", rightBold: "coop", rightContinue: "eración" },
    { left: "y ", leftBold: "coop", right: "existe para tus ideas." },
    { left: "", right: "= ideas." },
    { left: "", right: "ideas llenas de posibilidades." },
    { left: "y queremos", right: "desarrollarlas contigo." }
  ]

  // Reset hero state when returning from FullPage
  useEffect(() => {
    const handleBackToHero = () => {
      setActiveHeading(headings.length - 1) // Start from last heading when returning
      activeHeadingRef.current = headings.length - 1
      setHeroComplete(false)
      setIsTransitioning(false)
    }

    window.addEventListener('backToHero', handleBackToHero)
    
    return () => {
      window.removeEventListener('backToHero', handleBackToHero)
    }
  }, [headings.length])

  // Function to advance to next heading (used by both wheel and click)
  const advanceToNextHeading = () => {
    if (heroComplete || isTransitioning) return

    const currentTime = Date.now()
    
    // Prevent too rapid changes (minimum 600ms between changes)
    if (currentTime - lastChangeTimeRef.current < 600) {
      return
    }

    let newActiveHeading = activeHeading

    if (activeHeading < headings.length - 1) {
      // Advance to next heading
      newActiveHeading = activeHeading + 1
    } else {
      // Already on last heading, trigger completion
      setHeroComplete(true)
      // Dispatch event to notify that hero is complete
      const event = new CustomEvent('heroComplete')
      window.dispatchEvent(event)
      return
    }

    lastChangeTimeRef.current = currentTime
    setIsTransitioning(true)

    // Fade out, then change text, then fade in
    setTimeout(() => {
      activeHeadingRef.current = newActiveHeading
      setActiveHeading(newActiveHeading)
      setIsTransitioning(false)

      // Check if we reached the last heading
      if (newActiveHeading === headings.length - 1) {
        // Don't auto-advance from last heading anymore - let user click
      }
    }, 300)
  }

  useEffect(() => {
    let scrollAccumulator = 0
    const scrollThreshold = 100 // Amount of scroll needed to advance to next heading

    const handleWheel = (e: WheelEvent) => {
      if (heroComplete) {
        return // Allow normal scrolling if hero is complete
      }

      e.preventDefault() // Prevent normal scrolling
      
      scrollAccumulator += e.deltaY

      // Check if we've accumulated enough scroll to change heading
      if (Math.abs(scrollAccumulator) >= scrollThreshold) {
        const currentTime = Date.now()
        
        // Prevent too rapid changes (minimum 600ms between changes)
        if (currentTime - lastChangeTimeRef.current < 600) {
          scrollAccumulator = 0
          return
        }

        let newActiveHeading = activeHeading

        if (scrollAccumulator > 0 && activeHeading < headings.length - 1) {
          // Scrolling down - advance to next heading
          newActiveHeading = activeHeading + 1
        } else if (scrollAccumulator > 0 && activeHeading === headings.length - 1) {
          // Scrolling down on last heading - trigger completion
          lastChangeTimeRef.current = currentTime
          scrollAccumulator = 0
          setHeroComplete(true)
          // Dispatch event to notify that hero is complete
          const event = new CustomEvent('heroComplete')
          window.dispatchEvent(event)
          return
        } else if (scrollAccumulator < 0 && activeHeading > 0) {
          // Scrolling up - go to previous heading
          newActiveHeading = activeHeading - 1
        }

        if (newActiveHeading !== activeHeading) {
                lastChangeTimeRef.current = currentTime
          setIsTransitioning(true)
          scrollAccumulator = 0 // Reset accumulator

          // Fade out, then change text, then fade in
          setTimeout(() => {
            activeHeadingRef.current = newActiveHeading
            setActiveHeading(newActiveHeading)
            setIsTransitioning(false)

            // Check if we reached the last heading
            if (newActiveHeading === headings.length - 1) {
              // Don't auto-advance from last heading anymore - let user click
            }
          }, 300)
        } else {
          // Reset accumulator if we can't advance further
          scrollAccumulator = 0
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [activeHeading, heroComplete, headings.length])

  return (
    <div 
      ref={heroRef}
      className="hero-static-container"
    >
      <div className={`hero-fixed-image ${activeHeading > 0 ? 'white' : ''}`}>
        <img src="/images/coop.svg" alt="coop logo" />
      </div>

      <div className="hero-static-content">
        <div className="hero-heading active" style={{
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}>
          <span className="text-left">
            {headings[activeHeading].left}
            {headings[activeHeading].leftBold && <strong>{headings[activeHeading].leftBold}</strong>}
          </span>
          <span className="text-right">
            {headings[activeHeading].right}
            {headings[activeHeading].rightBold && <strong>{headings[activeHeading].rightBold}</strong>}
            {headings[activeHeading].rightContinue}
          </span>
        </div>
      </div>

      {!heroComplete && (
        <div 
          className="scroll-message hero-static-scroll-message" 
          onClick={advanceToNextHeading}
          style={{ 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img src="/images/down_arrow.svg" alt="scroll down" className="bounce-animation" />
          <div className="scroll-text">
            {activeHeading === headings.length - 1 ? (
              <>
                <span>¡Haz click aquí!</span>
                <span>- vamos para allá -</span>
              </>
            ) : (
              <>
                <span>¿escrollea? ¿scrollea?</span>
                <span>- échale pa&apos;bajo -</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="hero-static-progress">
        {headings.map((_, index) => (
          <div
            key={index}
            className={`hero-static-progress-dot ${index === activeHeading ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroStatic
