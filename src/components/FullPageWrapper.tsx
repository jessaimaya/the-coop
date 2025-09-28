'use client'

import React, { useEffect } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import Navbar from './Navbar'

interface FullPageWrapperProps {
  children: React.ReactNode
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({ children }) => {
  const anchors = ['coop', 'hacemos', 'pasado', 'nosotros', 'clientes', 'dudas', 'contact']
  const sectionsColor = ['#E1E2DF', '#232323', '#232323', '#232323', '#232323', '#232323', '#E1E2DF']

  // Manual test function
  const testBackToHero = () => {
    console.log('Manual test: dispatching backToHero event')
    const event = new CustomEvent('backToHero')
    window.dispatchEvent(event)
  }

  // Add wheel listener specifically for the first section
  useEffect(() => {
    let currentSection = 0
    let isActive = true // Track if FullPageWrapper should be responding to events

    const handleWheel = (e: WheelEvent) => {
      // Only respond if FullPageWrapper is active
      if (!isActive) return
      
      console.log('FullPageWrapper wheel event:', { currentSection, deltaY: e.deltaY })
      
      // If we're on the first section and scrolling up
      if (currentSection === 0 && e.deltaY < 0) {
        console.log('Detected upward scroll on first section, going back to hero')
        e.preventDefault()
        // Deactivate wheel listener before dispatching event
        isActive = false
        const event = new CustomEvent('backToHero')
        window.dispatchEvent(event)
      }
    }

    const sectionChangeHandler = (e: CustomEvent) => {
      const section = e.detail
      console.log('Section changed to:', section)
      currentSection = section
    }

    // Listen for when hero completes to reactivate
    const handleHeroComplete = () => {
      console.log('FullPageWrapper: Hero completed, reactivating wheel listener')
      isActive = true
      currentSection = 0 // Reset to first section
    }

    // Listen for back to hero to deactivate
    const handleBackToHero = () => {
      console.log('FullPageWrapper: Back to hero, deactivating wheel listener')
      isActive = false
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('fullpageSection', sectionChangeHandler as EventListener)
    window.addEventListener('heroComplete', handleHeroComplete)
    window.addEventListener('backToHero', handleBackToHero)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('fullpageSection', sectionChangeHandler as EventListener)
      window.removeEventListener('heroComplete', handleHeroComplete)
      window.removeEventListener('backToHero', handleBackToHero)
    }
  }, [])

  return (
    <div>
      <Navbar />
      <ReactFullpage
      //fullpage options
      licenseKey={'gplv3-license'} // Using GPL license for open source projects
      credits={{ enabled: false }}
      scrollingSpeed={1000}
      anchors={anchors}
      sectionsColor={sectionsColor}
      touchSensitivity={5}
      normalScrollElements=".normal-scroll"
      continuousVertical={false}
      onLeave={(origin, destination, direction, trigger) => {
        console.log('FullPage onLeave:', { origin: origin?.index, destination: destination?.index, direction, trigger })
        
        // If user tries to scroll up from first section, go back to hero
        if (origin && origin.index === 0 && direction === 'up') {
          console.log('Trying to scroll up from first section, going back to hero')
          const event = new CustomEvent('backToHero')
          window.dispatchEvent(event)
          return false // Prevent the section transition
        }
        
        return true // Allow normal transitions
      }}
      afterLoad={(origin, destination, direction, trigger) => {
        console.log('FullPage afterLoad:', { origin: origin?.index, destination: destination?.index, direction })
        
        // Dispatch custom event with section info
        const event = new CustomEvent('fullpageSection', { detail: destination?.index || 0 })
        window.dispatchEvent(event)
      }}
      render={({ state, fullpageApi }) => {        
        return (
          <ReactFullpage.Wrapper>
            {/* Debug button - remove in production */}
            <button 
              onClick={testBackToHero}
              style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: 10000,
                background: '#ee6123',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Test Back to Hero
            </button>
            {children}
          </ReactFullpage.Wrapper>
        )
      }}
    />
    </div>
  )
}

export default FullPageWrapper