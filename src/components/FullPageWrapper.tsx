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
      licenseKey={'gplv3-license'} // Using GPL license for open source projects
      credits={{ enabled: false }}
      scrollingSpeed={1000}
      anchors={anchors}
      sectionsColor={sectionsColor}
      touchSensitivity={5}
      onLeave={(origin, destination, direction, trigger) => {
        // Section transition
      }}
      afterLoad={(origin, destination, direction, trigger) => {
        // Section loaded
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