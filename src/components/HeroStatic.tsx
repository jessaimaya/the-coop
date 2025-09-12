'use client'

import React, { useState, useEffect, useRef } from 'react'

const HeroStatic: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeHeading, setActiveHeading] = useState(0)
  const activeHeadingRef = useRef(0)

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
      console.log('✅ HeroStatic received position:', position)
      setScrollPosition(position)

      // Calculate which heading to show based on scroll position
      // Let's switch every ~150px of scrolling to give much more time for each heading
      const headingIndex = Math.floor(position / 150)
      const newActiveHeading = Math.max(0, Math.min(headingIndex, headings.length - 1))

      console.log(`📊 Debug: position=${position}, headingIndex=${headingIndex}, newActiveHeading=${newActiveHeading}, maxHeadings=${headings.length}`)

      if (newActiveHeading !== activeHeadingRef.current) {
        console.log(`🔄 Hero text change: ${activeHeadingRef.current} -> ${newActiveHeading}`)
        activeHeadingRef.current = newActiveHeading
        setActiveHeading(newActiveHeading)
      }
    }

    console.log('🎯 HeroStatic: Setting up event listener')
    window.addEventListener('heroScrollOverflow', handleScrollOverflow as EventListener)

    return () => {
      console.log('🎯 HeroStatic: Removing event listener')
      window.removeEventListener('heroScrollOverflow', handleScrollOverflow as EventListener)
    }
  }, [])

  return (
    <div style={{ height: '170vh', position: 'relative' }}>
      <div className={`hero-fixed-image ${activeHeading > 0 ? 'white' : ''}`}>
        <img src="/images/coop.svg" alt="coop logo" />
      </div>

      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div className="hero-heading active" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
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
