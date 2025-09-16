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
        // Section transition
      }}
      afterLoad={(origin, destination, direction, trigger) => {
        // Section loaded
      }}
      onScrollOverflow={(section, slide, position, direction) => {
        // If this is the Hero section (index 0), dispatch custom event
        if (section && section.index === 0) {
          const event = new CustomEvent('heroScrollOverflow', {
            detail: { position, direction }
          })
          window.dispatchEvent(event)
        }
        
        // If this is the TeHaPasado section (index 3), dispatch custom event
        if (section && section.index === 3) {
          const event = new CustomEvent('teHaPasadoScrollOverflow', {
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