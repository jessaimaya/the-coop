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

    const handleBackToHero = () => {
      console.log('ScrollManager: backToHero event received, going back to Hero section')
      setHeroComplete(false)
      
      // Scroll to top when returning to hero
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Keyboard shortcut for testing
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h' && e.ctrlKey && heroComplete) {
        console.log('Keyboard shortcut: Going back to hero')
        handleBackToHero()
      }
    }

    window.addEventListener('heroComplete', handleHeroComplete)
    window.addEventListener('backToHero', handleBackToHero)
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('heroComplete', handleHeroComplete)
      window.removeEventListener('backToHero', handleBackToHero)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [heroComplete])

  return (
    <div className="scroll-manager">
      {/* Debug info */}
      <div style={{
        position: 'fixed',
        top: '50px',
        right: '10px',
        zIndex: 10000,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px'
      }}>
        Hero Complete: {heroComplete ? 'Yes' : 'No'}
      </div>
      
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