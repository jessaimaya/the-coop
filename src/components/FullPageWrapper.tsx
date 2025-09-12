'use client'

import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

interface FullPageWrapperProps {
  children: React.ReactNode
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({ children }) => {
  const anchors = ['hero', 'coop', 'hacemos', 'pasado', 'contact']
  const sectionsColor = ['#232323', '#E1E2DF', '#232323', '#232323', '#E1E2DF']

  return (
    <ReactFullpage
      //fullpage options
      licenseKey={'gplv3-license'}
      scrollingSpeed={1000}
      anchors={anchors}
      sectionsColor={sectionsColor}
      scrollOverflow={true}
      touchSensitivity={5}
      onLeave={(origin, destination, direction, trigger) => {
        console.log('onLeave', { origin, destination, direction })
      }}
      afterLoad={(origin, destination, direction, trigger) => {
        console.log('afterLoad', { origin, destination, direction })
        console.log('ScrollOverflow enabled:', true)
      }}
      onScrollOverflow={(section, slide, position, direction) => {
        console.log('🚀 ScrollOverflow DETECTED:', { 
          sectionIndex: section ? section.index : 'undefined',
          slideIndex: slide ? slide.index : 'undefined', 
          scrollPosition: position, 
          scrollDirection: direction 
        })
        
        // If this is the Hero section (index 0), dispatch custom event
        if (section && section.index === 0) {
          console.log('📤 Dispatching heroScrollOverflow event with position:', position)
          const event = new CustomEvent('heroScrollOverflow', {
            detail: { position, direction }
          })
          window.dispatchEvent(event)
        }
      }}
      render={({ state, fullpageApi }) => {        
        return (
          <ReactFullpage.Wrapper>
            {children}
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}

export default FullPageWrapper