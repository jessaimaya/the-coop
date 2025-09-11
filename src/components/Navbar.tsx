'use client'

import React, { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section')
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Check if we're still in Hero section
      const heroHeight = document.querySelector('.hero')?.getBoundingClientRect().height || 0
      const heroBuffer = windowHeight * 2.0
      
      if (scrollY < heroHeight - windowHeight + heroBuffer) {
        setActiveSection('')
        return
      }

      // Determine which section is currently visible
      let currentSection = ''
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height
        
        // Check if section is currently in view (center of viewport)
        const viewportCenter = scrollY + windowHeight / 2
        if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
          currentSection = section.id
        }
      })
      
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src="/images/coop.svg" alt="coop logo" className="navbar-logo" />
          <span className="navbar-brand-text">coop</span>
        </div>
        
        <div className="navbar-right">
          <ul className="navbar-nav" role="list">
            <li role="listitem">
              <a href="#esto-es-coop" className={`nav-link ${activeSection === 'esto-es-coop' ? 'active' : ''}`}>
                esto es coop
                <span className="nav-triangle" aria-hidden="true"></span>
              </a>
            </li>
            <li role="listitem">
              <a href="#esto-hacemos" className={`nav-link ${activeSection === 'esto-hacemos' ? 'active' : ''}`}>
                esto hacemos
                <span className="nav-triangle" aria-hidden="true"></span>
              </a>
            </li>
            <li role="listitem">
              <a href="#te-ha-pasado" className={`nav-link ${activeSection === 'te-ha-pasado' ? 'active' : ''}`}>
                esto decimos
                <span className="nav-triangle" aria-hidden="true"></span>
              </a>
            </li>
          </ul>
          
          <div className="navbar-cta">
            <button className="cta-button" type="button">
              QUIERO PLATICAR CON USTEDES
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
