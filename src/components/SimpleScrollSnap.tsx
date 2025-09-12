'use client'

import React, { useEffect } from 'react'

interface SimpleScrollSnapProps {
  children: React.ReactNode
}

const SimpleScrollSnap: React.FC<SimpleScrollSnapProps> = ({ children }) => {
  useEffect(() => {
    // Add scroll snap behavior via CSS
    const style = document.createElement('style')
    style.textContent = `
      .simple-scroll-container {
        scroll-snap-type: y mandatory;
        overflow-y: scroll;
        height: 100vh;
      }
      .simple-scroll-section {
        scroll-snap-align: start;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="simple-scroll-container">
      {children}
    </div>
  )
}

export default SimpleScrollSnap