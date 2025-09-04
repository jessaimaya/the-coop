import { useState, useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

function HeroSection() {
  const [showBottomRive, setShowBottomRive] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(7);
  const [wasInAnimationSection, setWasInAnimationSection] = useState(true);

  const { rive, RiveComponent } = useRive({
    src: '/thecoop.riv',
    animations: ['ScrollingText'],
    autoplay: false,
    fitCanvasToArtboardHeight: false,
    onLoad: () => {
      console.log('Main Rive loaded successfully');
    },
  });

  // Bottom Rive animation
  const { rive: bottomRive, RiveComponent: BottomRiveComponent } = useRive({
    src: '/para_abajo.riv',
    autoplay: true,
    stateMachines: 'State Machine 1',
    fitCanvasToArtboardHeight: false,
  });

  useEffect(() => {
    if (!rive) return;

    const setupAnimation = () => {
      try {
        if (rive.artboards && rive.artboards.length > 0) {
          const animations = rive.artboards[0].animations;
          if (animations && animations.length > 0) {
            const scrollAnimation = animations.find(anim => anim.name === 'ScrollingText');
            if (scrollAnimation) {
              setAnimationDuration(scrollAnimation.duration);
            }
          }
        }
      } catch (error) {
        console.warn('Error setting up animation:', error);
        setAnimationDuration(7);
      }
    };

    rive.on('load', setupAnimation);
    if (rive.artboards && rive.artboards.length > 0) {
      setupAnimation();
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const animationSectionHeight = windowHeight * 9;
      const isInAnimationSection = scrollTop <= animationSectionHeight;

      if (isInAnimationSection && rive && typeof rive.scrub === 'function') {
        // Handle re-entry to animation section
        if (!wasInAnimationSection) {
          setWasInAnimationSection(true);
          // Reset animation to ensure it works on re-entry
          try {
            rive.play(['ScrollingText']);
            rive.pause(['ScrollingText']);
          } catch (error) {
            console.warn('Error resetting animation on re-entry:', error);
          }
        }

        const scrollPercent = Math.max(0, Math.min(1, scrollTop / animationSectionHeight));
        const timePosition = scrollPercent * animationDuration;
        
        try {
          rive.scrub(['ScrollingText'], timePosition);
        } catch (error) {
          console.warn('Scrubbing error:', error);
        }

        if (!showBottomRive) {
          setShowBottomRive(true);
        }
      } else {
        if (wasInAnimationSection) {
          setWasInAnimationSection(false);
        }
        
        if (showBottomRive) {
          setShowBottomRive(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rive) {
        rive.off('load', setupAnimation);
      }
    };
  }, [rive, showBottomRive, animationDuration, wasInAnimationSection]);

  return (
    <>
      {/* Animation container - fixed/sticky during animation */}
      <div className="animation-container">
        <div className="animation-wrapper">
          <RiveComponent />
          {/* Hidden text content for SEO - matches the text shown in Rive animation */}
          <div className="seo-content">
            <h2>somos coop</h2>
            <h2>coop se pronuncia "kup"</h2>
            <h2>coop es cooperación</h2>
            <h2>y coop existe para tus ideas</h2>
            <h2>= ideas</h2>
            <h2>= ideas llenas de posibilidades</h2>
            <h2>y queremos desarrollarlas contigo</h2>
          </div>
        </div>
      </div>

      {/* Animation scroll area - creates scroll space for the animation */}
      <div className="scroll-area" />

      {/* Bottom sticky div with Rive animation - only show during main animation */}
      <div className={`bottom-rive-container ${showBottomRive ? 'visible' : 'hidden'}`}>
        <div className="bottom-rive-animation">
          <BottomRiveComponent />
        </div>
        <p className="bottom-rive-text">
          Dale para abajo.
        </p>
      </div>
    </>
  );
}

export default HeroSection