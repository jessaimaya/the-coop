import { useState, useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

function HeroSection() {
  const [showBottomRive, setShowBottomRive] = useState(true);
  const [animationDuration, setAnimationDuration] = useState(7);
  const [wasOutsideAnimation, setWasOutsideAnimation] = useState(false);

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

    // Wait for the Rive instance to be fully loaded
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
          
          // Initialize animation to start position
          rive.pause();
          rive.scrub(['ScrollingText'], 0);
        }
      } catch (error) {
        console.warn('Error setting up animation:', error);
        setAnimationDuration(7);
      }
    };

    // Listen for load events
    rive.on('load', setupAnimation);
    
    // Try to setup if already ready
    if (rive.artboards && rive.artboards.length > 0) {
      setupAnimation();
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Define animation section - from 0 to 9 viewport heights for much smoother scrolling
      const animationSectionHeight = windowHeight * 9;
      // Hide bottom Rive only after animation fully completes (at 100% progress)
      const hideBottomRiveThreshold = animationSectionHeight;

      if (scrollTop <= animationSectionHeight) {
        // We're back in the animation section
        if (wasOutsideAnimation && rive && typeof rive.scrub === 'function') {
          // Force complete reset when coming back
          try {
            rive.stop(['ScrollingText']);
            rive.pause();
            rive.scrub(['ScrollingText'], 0);
            console.log('Animation reset after returning');
          } catch (error) {
            console.error('Error resetting animation:', error);
          }
          setWasOutsideAnimation(false);
        }

        // We're in the animation section
        const scrollPercent = scrollTop / animationSectionHeight;
        const timePosition = scrollPercent * animationDuration;

        // Scrub to the calculated time position
        if (rive && typeof rive.scrub === 'function') {
          try {
            rive.scrub(['ScrollingText'], timePosition);
          } catch (error) {
            console.error('Error scrubbing animation:', error);
            // Try to recover by stopping and restarting
            try {
              rive.stop(['ScrollingText']);
              rive.pause();
              rive.scrub(['ScrollingText'], timePosition);
            } catch (recoveryError) {
              console.error('Recovery failed:', recoveryError);
            }
          }
        }

        // Control bottom Rive visibility - show during most of animation
        if (scrollTop <= hideBottomRiveThreshold) {
          if (!showBottomRive) {
            setShowBottomRive(true);
          }
        } else {
          // Hide bottom Rive in the last part of the animation
          if (showBottomRive) {
            setShowBottomRive(false);
          }
        }
      } else {
        // Past animation section
        if (!wasOutsideAnimation) {
          setWasOutsideAnimation(true);
        }
        // Definitely hide bottom Rive
        if (showBottomRive) {
          setShowBottomRive(false);
        }
      }
    };

    // Throttle for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rive) {
        rive.off('load', setupAnimation);
        rive.cleanup();
      }
    };
  }, [rive, showBottomRive, animationDuration, wasOutsideAnimation]);

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