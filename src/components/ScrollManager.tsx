'use client'

import React, { useEffect, useState } from 'react'

interface ScrollManagerProps {
  heroComponent: React.ReactNode
  fullPageComponent: React.ReactNode
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ heroComponent, fullPageComponent }) => {
  const [heroComplete, setHeroComplete] = useState(false)

  useEffect(() => {
    const handleHeroComplete = () => {
      console.log('Hero section complete, transitioning to FullPage')
      setHeroComplete(true)
      
      // Scroll to top to prepare for FullPageWrapper
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('heroComplete', handleHeroComplete)

    return () => {
      window.removeEventListener('heroComplete', handleHeroComplete)
    }
  }, [])

  return (
    <div className="scroll-manager">
      {/* Always show hero, but hide when complete */}
      <div 
        style={{ 
          display: heroComplete ? 'none' : 'block',
          position: 'relative',
          zIndex: heroComplete ? 0 : 10
        }}
      >
        {heroComponent}
      </div>
      
      {/* Only render FullPageWrapper when hero is complete */}
      {heroComplete && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          {fullPageComponent}
        </div>
      )}
    </div>
  )
}

export default ScrollManager