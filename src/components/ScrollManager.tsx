'use client'

import React, { useEffect, useState } from 'react'

interface ScrollManagerProps {
  heroComponent: React.ReactNode
  fullPageComponent: React.ReactNode
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ heroComponent, fullPageComponent }) => {
  const [heroComplete, setHeroComplete] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleHeroComplete = () => {
      console.log('Hero section complete, starting transition to FullPage')
      setIsTransitioning(true)
      
      // Start the slide transition after a brief delay
      setTimeout(() => {
        setHeroComplete(true)
      }, 100)
      
      // Scroll to top to prepare for FullPageWrapper
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleBackToHero = () => {
      console.log('ScrollManager: backToHero event received, going back to Hero section')
      setHeroComplete(false)
      setIsTransitioning(false)
      
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
        Hero Complete: {heroComplete ? 'Yes' : 'No'} | Transitioning: {isTransitioning ? 'Yes' : 'No'}
      </div>
      
      {/* Hero component - always rendered but positioned */}
      <div className={`hero-container ${heroComplete ? 'hero-hidden' : 'hero-visible'}`}>
        {heroComponent}
      </div>
      
      {/* FullPage component - only render when transitioning starts */}
      {isTransitioning && (
        <div className={`fullpage-container ${heroComplete ? 'fullpage-visible' : 'fullpage-hidden'}`}>
          {fullPageComponent}
        </div>
      )}
    </div>
  )
}

export default ScrollManager