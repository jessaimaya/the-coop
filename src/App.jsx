import { useState, useEffect } from 'react'
import { useRive } from '@rive-app/react-canvas'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showBottomRive, setShowBottomRive] = useState(true);

  const { rive, RiveComponent } = useRive({
    src: '/thecoop.riv',
    animations: ['ScrollingText'], // Replace with your animation name
    autoplay: false,
    fitCanvasToArtboardHeight: false,
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
    // Get the actual animation duration from Rive
    const animation = rive.contents.artboards[0].animations.find(anim => anim.name === 'ScrollingText');
    const animationDuration = animation ? animation.duration : 7; // fallback to 7

    // Initialize animation to start position
    rive.pause();
    rive.scrub(['ScrollingText'], 0);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Define animation section - from 0 to 9 viewport heights for much smoother scrolling
      const animationSectionHeight = windowHeight * 9;
      // Hide bottom Rive a bit before animation completes (at 85% progress)
      const hideBottomRiveThreshold = animationSectionHeight * 0.85;

      if (scrollTop <= animationSectionHeight) {
        // We're in the animation section
        const scrollPercent = scrollTop / animationSectionHeight;

        const timePosition = scrollPercent * animationDuration;

        // Scrub to the calculated time position
        rive.scrub(['ScrollingText'], timePosition);

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
        // Past animation section - definitely hide bottom Rive
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
      if (rive) rive.cleanup();
    };
  }, [rive]);


  return (
    <div>
      {/* Animation container - fixed/sticky during animation */}
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ width: 'min(800px, 90vw)', height: '100%' }}>
          <RiveComponent />
          {/* Hidden text content for SEO - matches the text shown in Rive animation */}
          <div style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            visibility: 'hidden'
          }}>
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

      {/* Animation scroll area - 8vh for animation progression (much more time before next section) */}
      <div style={{ height: '850vh' }}>
        {/* This div creates scroll space for the animation */}
      </div>

      {/* Content after animation */}
      <div style={{
        height: '100vh',
        background: 'linear-gradient(to bottom, #f0f0f0, #333)',
        position: 'relative',
        zIndex: 20
      }}>
        <p style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
          Animation complete! Now you can see additional content.
        </p>
      </div>

      {/* Bottom sticky div with Rive animation - only show during main animation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 30,
        visibility: showBottomRive ? 'visible' : 'hidden',
        opacity: showBottomRive ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}>
        <div style={{ width: '60px', height: '60px' }}>
          <BottomRiveComponent />
        </div>
        <p style={{
          fontSize: '0.75rem',
          margin: '1rem',
          paddingBottom: '5vh',
          color: '#fff'
        }}>
          Dale para abajo.
        </p>
      </div>
    </div>
  );
}

export default App
