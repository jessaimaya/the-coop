'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  bullets: string[]
}

interface HacemosAccordionProps {
  projects: Project[]
}

const HacemosAccordion: React.FC<HacemosAccordionProps> = ({ projects }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      // If switching to desktop, collapse all boxes
      if (!mobile && expandedId !== null) {
        setExpandedId(null)
      }
    }
    
    // Check initial screen size
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [expandedId])

  const toggleBox = (id: number) => {
    // Only allow expansion on mobile devices
    if (isMobile) {
      setExpandedId(expandedId === id ? null : id)
    }
  }

  return (
    <div className="esto-hacemos-boxes">
      {projects.map((project) => (
        <div 
          key={project.id} 
          className={`esto-hacemos-box ${expandedId === project.id ? 'expanded' : ''}`}
          onClick={() => toggleBox(project.id)}
        >
          <div className="box-header">
            <h3 className="box-title">{project.title}</h3>
            <Image
              src="/images/plus_icon.svg"
              alt="Plus icon"
              width={24}
              height={24}
              className="box-plus-icon"
            />
          </div>
          <hr />
          <ul className="box-list">
            {project.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default HacemosAccordion