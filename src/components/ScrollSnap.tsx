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
      // Check if we're still in the Hero section
      const heroHeight = document.querySelector('.hero')?.getBoundingClientRect().height || 0
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Add buffer space so last message is visible before sections appear
      const heroBuffer = windowHeight * 2.0 // Increased to 200vh buffer for much more reading time
      
      // If we haven't scrolled past the Hero section + buffer, don't interfere
      if (currentScrollY < heroHeight - windowHeight + heroBuffer) {
        return // Let the Hero handle its own scrolling
      }

      // If scrolling up from first section, allow return to Hero
      if (e.deltaY < 0 && currentSectionRef.current === 0) {
        // Scroll to last Hero message position (before buffer)
        const heroLastMessage = heroHeight - windowHeight
        window.scrollTo({
          top: heroLastMessage,
          behavior: 'smooth'
        })
        currentSectionRef.current = -1 // Set to before sections
        isScrollingRef.current = true
        
        // Set a flag to indicate Hero should scroll backwards
        sessionStorage.setItem('heroDirection', 'backwards')
        
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1500)
        return
      }

      if (isScrollingRef.current) return

      // Accumulate scroll delta for less sensitivity
      const currentTime = Date.now()
      const timeDiff = currentTime - lastScrollTimeRef.current
      
      // Reset accumulator if too much time has passed
      if (timeDiff > 150) {
        scrollAccumulatorRef.current = 0
      }
      
      lastScrollTimeRef.current = currentTime
      scrollAccumulatorRef.current += Math.abs(e.deltaY)
      
      // Require more scroll distance to trigger section change
      const scrollThreshold = 100 // Increased threshold for less sensitivity
      if (scrollAccumulatorRef.current < scrollThreshold) {
        e.preventDefault()
        return
      }

      e.preventDefault()
      
      // Reset accumulator after triggering
      scrollAccumulatorRef.current = 0

      // Get all sections each time to ensure we have the latest
      const sections = document.querySelectorAll('.content-section')
      if (sections.length === 0) return

      const direction = e.deltaY > 0 ? 1 : -1
      const nextSection = currentSectionRef.current + direction

      // Check bounds for sections
      if (nextSection < 0) {
        // Already handled above for returning to Hero
        return
      }
      if (nextSection >= sections.length) return

      isScrollingRef.current = true
      currentSectionRef.current = nextSection

      // Scroll to the target section
      const targetSection = sections[nextSection] as HTMLElement
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1200) // Slightly longer timeout
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're still in the Hero section
      const heroHeight = document.querySelector('.hero')?.getBoundingClientRect().height || 0
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      const heroBuffer = windowHeight * 2.0
      
      // If we haven't scrolled past the Hero section + buffer, don't interfere
      if (currentScrollY < heroHeight - windowHeight + heroBuffer) {
        return // Let the Hero handle its own scrolling
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
            // Scroll back to Hero last message
            const heroLastMessage = heroHeight - windowHeight
            window.scrollTo({
              top: heroLastMessage,
              behavior: 'smooth'
            })
            currentSectionRef.current = -1
            sessionStorage.setItem('heroDirection', 'backwards')
            isScrollingRef.current = true
            setTimeout(() => {
              isScrollingRef.current = false
            }, 1500)
            return
          } else {
            nextSection = Math.max(currentSectionRef.current - 1, 0)
          }
          break
        case 'Home':
          e.preventDefault()
          // Scroll to top of Hero (first message)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
          currentSectionRef.current = -1
          sessionStorage.setItem('heroDirection', 'forward')
          isScrollingRef.current = true
          setTimeout(() => {
            isScrollingRef.current = false
          }, 1500)
          return
        case 'End':
          e.preventDefault()
          nextSection = sections.length - 1
          break
      }

      if (nextSection !== currentSectionRef.current) {
        isScrollingRef.current = true
        currentSectionRef.current = nextSection
        
        const targetSection = sections[nextSection] as HTMLElement
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })

        setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }
    }

    // Monitor scroll position to reset section tracking when back in Hero
    const handleScroll = () => {
      const heroHeight = document.querySelector('.hero')?.getBoundingClientRect().height || 0
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      const heroBuffer = windowHeight * 2.0
      
      // If we're back in Hero area, reset section tracking
      if (currentScrollY < heroHeight - windowHeight + heroBuffer) {
        currentSectionRef.current = -1
      } else if (currentScrollY >= heroHeight - windowHeight + heroBuffer) {
        // We're in sections area, determine which section
        const sections = document.querySelectorAll('.content-section')
        if (sections.length > 0) {
          const sectionIndex = Math.floor((currentScrollY - (heroHeight - windowHeight + heroBuffer)) / windowHeight)
          currentSectionRef.current = Math.max(0, Math.min(sectionIndex, sections.length - 1))
        }
      }
    }

    // Add event listeners to window for better coverage
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