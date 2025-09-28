'use client'

import React, { useState, useEffect } from 'react'
import SimpleScrollSnap from './SimpleScrollSnap'

interface ConditionalFullPageProps {
  children: React.ReactNode
}

const ConditionalFullPage: React.FC<ConditionalFullPageProps> = ({ children }) => {
  const [enableFullpage, setEnableFullpage] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = 700 * window.innerHeight / 100 // 700vh in pixels
      
      // Enable Fullpage when we're close to the end of the Hero section
      if (scrollY >= heroHeight - window.innerHeight) {
        setEnableFullpage(true)
        window.removeEventListener('scroll', handleScroll)
        
        // Disable the Hero's scroll handler to prevent interference
        const heroScrollEvent = new CustomEvent('disableHeroScroll')
        window.dispatchEvent(heroScrollEvent)
        
        // Force scroll to top and then navigate to first section
        setTimeout(() => {
          window.scrollTo(0, 0)
          setTimeout(() => {
            window.location.hash = '#coop'
          }, 100)
        }, 200)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (enableFullpage) {
    return (
      <div className="conditional-fullpage-enabled">
        <SimpleScrollSnap>{children}</SimpleScrollSnap>
      </div>
    )
  }

  // Return regular content without Fullpage.js, positioned after Hero
  return (
    <div className="conditional-fullpage-content">
      {children}
    </div>
  )
}

export default ConditionalFullPage