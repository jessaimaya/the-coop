'use client'

import React, { useEffect, useRef } from 'react'

interface ScrollSnapProps {
  children: React.ReactNode
}

const ScrollSnap: React.FC<ScrollSnapProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentSectionRef = useRef(0)
  const isScrollingRef = useRef(false)
  const scrollAccumulatorRef = useRef(0)
  const lastScrollTimeRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      // Only handle scrolling when we're in the main sections area
      const heroHeight = document.querySelector('.hero')?.getBoundingClientRect().height || 0
      const navbarHeight = document.querySelector('.navbar')?.getBoundingClientRect().height || 100
      const currentScrollY = window.scrollY
      
      // If we haven't scrolled past the Hero section, don't interfere
      if (currentScrollY < heroHeight) {
        return // Let the Hero handle its own scrolling
      }

      if (isScrollingRef.current) {
        e.preventDefault()
        return
      }

      // Accumulate scroll delta for smooth detection
      const currentTime = Date.now()
      const timeDiff = currentTime - lastScrollTimeRef.current
      
      // Reset accumulator if too much time has passed
      if (timeDiff > 150) {
        scrollAccumulatorRef.current = 0
      }
      
      lastScrollTimeRef.current = currentTime
      scrollAccumulatorRef.current += Math.abs(e.deltaY)
      
      // Require scroll threshold to trigger section change
      const scrollThreshold = 50
      if (scrollAccumulatorRef.current < scrollThreshold) {
        e.preventDefault()
        return
      }

      e.preventDefault()
      
      // Reset accumulator after triggering
      scrollAccumulatorRef.current = 0

      // Get all sections
      const sections = document.querySelectorAll('.content-section')
      if (sections.length === 0) return

      const direction = e.deltaY > 0 ? 1 : -1
      const nextSection = currentSectionRef.current + direction

      // Check bounds
      if (nextSection < 0) {
        // Scroll back to end of Hero
        window.scrollTo({
          top: heroHeight - window.innerHeight,
          behavior: 'smooth'
        })
        return
      }
      if (nextSection >= sections.length) return

      isScrollingRef.current = true
      currentSectionRef.current = nextSection

      // Calculate target scroll position
      const targetScrollY = heroHeight + (nextSection * window.innerHeight)
      
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      })

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false
      }, 800)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const heroHeight = document.querySelector('.hero')?.getBoundingClientRect().height || 0
      const currentScrollY = window.scrollY
      
      // If we're in Hero area, let Hero handle it
      if (currentScrollY < heroHeight) {
        return
      }

      if (isScrollingRef.current) return

      const sections = document.querySelectorAll('.content-section')
      if (sections.length === 0) return

      let nextSection = currentSectionRef.current
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          nextSection = Math.min(currentSectionRef.current + 1, sections.length - 1)
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          if (currentSectionRef.current === 0) {
            // Scroll back to Hero end
            window.scrollTo({
              top: heroHeight - window.innerHeight,
              behavior: 'smooth'
            })
            return
          } else {
            nextSection = Math.max(currentSectionRef.current - 1, 0)
          }
          break
        case 'Home':
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        case 'End':
          e.preventDefault()
          nextSection = sections.length - 1
          break
      }

      if (nextSection !== currentSectionRef.current) {
        isScrollingRef.current = true
        currentSectionRef.current = nextSection
        
        const targetScrollY = heroHeight + (nextSection * window.innerHeight)
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        })

        setTimeout(() => {
          isScrollingRef.current = false
        }, 800)
      }
    }

    // Monitor scroll position to update current section
    const handleScroll = () => {
      if (isScrollingRef.current) return
      
      const heroHeight = document.querySelector('.hero')?.getBoundingClientRect().height || 0
      const currentScrollY = window.scrollY
      
      if (currentScrollY >= heroHeight) {
        // Calculate which section we're in
        const sectionIndex = Math.round((currentScrollY - heroHeight) / window.innerHeight)
        const sections = document.querySelectorAll('.content-section')
        currentSectionRef.current = Math.max(0, Math.min(sectionIndex, sections.length - 1))
      }
    }

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="scroll-snap-container">
      {children}
    </div>
  )
}

export default ScrollSnap