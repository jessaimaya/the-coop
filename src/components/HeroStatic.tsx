'use client'

import React, { useState, useEffect, useRef } from 'react'

const HeroStatic: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeHeading, setActiveHeading] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const activeHeadingRef = useRef(0)
  const lastChangeTimeRef = useRef(0)

  const headings = [
    { left: "Bienvenidos a ", leftBold: "coop", right: "" },
    { left: "", leftBold: "coop", right: "se pronuncia \"kup\"" },
    { left: "", leftBold: "coop", right: "es ", rightBold: "coop", rightContinue: "eración" },
    { left: "y ", leftBold: "coop", right: "existe para tus ideas." },
    { left: "", right: "= ideas." },
    { left: "", right: "ideas llenas de posibilidades." },
    { left: "y queremos", right: "desarrollarlas contigo." }
  ]

  useEffect(() => {
    const handleScrollOverflow = (event: CustomEvent) => {
      const { position } = event.detail
      setScrollPosition(position)

      // Prevent too rapid changes (minimum 800ms between changes)
      const currentTime = Date.now()
      if (currentTime - lastChangeTimeRef.current < 800) {
        return
      }

      // Custom spacing: first heading changes at 120px, then every 250px after that
      let headingIndex = 0
      if (position >= 120) {
        headingIndex = 1 + Math.floor((position - 120) / 250)
      }
      const newActiveHeading = Math.max(0, Math.min(headingIndex, headings.length - 1))

      if (newActiveHeading !== activeHeadingRef.current) {
        lastChangeTimeRef.current = currentTime
        setIsTransitioning(true)

        // Fade out, then change text, then fade in
        setTimeout(() => {
          activeHeadingRef.current = newActiveHeading
          setActiveHeading(newActiveHeading)
          setIsTransitioning(false)
        }, 300)
      }
    }

    window.addEventListener('heroScrollOverflow', handleScrollOverflow as EventListener)

    return () => {
      window.removeEventListener('heroScrollOverflow', handleScrollOverflow as EventListener)
    }
  }, [])

  return (
    <div style={{ height: '250vh', position: 'relative' }}>
      <div className={`hero-fixed-image ${activeHeading > 0 ? 'white' : ''}`}>
        <img src="/images/coop.svg" alt="coop logo" />
      </div>

      <div style={{ height: '110vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div className="hero-heading active" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.6s ease-in-out'
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

      <div className="scroll-message" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <img src="/images/down_arrow.svg" alt="scroll down" className="bounce-animation" />
        <div className="scroll-text">
          <span>¿escrollea? ¿scrollea?</span>
          <span>- échale pa&apos;bajo -</span>
        </div>
      </div>
    </div>
  )
}

export default HeroStatic
