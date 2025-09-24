'use client'

import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

interface FullPageWrapperProps {
  children: React.ReactNode
}

const FullPageWrapper: React.FC<FullPageWrapperProps> = ({ children }) => {
  const anchors = ['hero', 'coop', 'hacemos', 'pasado', 'nosotros', 'clientes', 'dudas', 'contact']
  const sectionsColor = ['#232323', '#E1E2DF', '#232323', '#232323', '#232323', '#232323', '#232323', '#E1E2DF']

  return (
    <ReactFullpage
      //fullpage options
      licenseKey={'YOUR_KEY_HERE'} // Using GPL license for open source projects
      credits={{ enabled: false }}
      scrollingSpeed={1000}
      anchors={anchors}
      sectionsColor={sectionsColor}
      scrollOverflow={true}
      touchSensitivity={5}
      onLeave={(origin, destination, direction, trigger) => {
        // Section transition
      }}
      afterLoad={(origin, destination, direction, trigger) => {
        // Section loaded
      }}
      onScrollOverflow={(section, slide, position, direction) => {
        // Add defensive null checks
        if (!section || typeof section.index !== 'number') {
          return
        }
        
        // If this is the Hero section (index 0), dispatch custom event
        if (section.index === 0) {
          try {
            const event = new CustomEvent('heroScrollOverflow', {
              detail: { position, direction }
            })
            window.dispatchEvent(event)
          } catch (error) {
            console.warn('Error dispatching heroScrollOverflow event:', error)
          }
        }
        
        // If this is the TeHaPasado section (index 3), dispatch custom event
        if (section.index === 3) {
          try {
            const event = new CustomEvent('teHaPasadoScrollOverflow', {
              detail: { position, direction }
            })
            window.dispatchEvent(event)
          } catch (error) {
            console.warn('Error dispatching teHaPasadoScrollOverflow event:', error)
          }
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