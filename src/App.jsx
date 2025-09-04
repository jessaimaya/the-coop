import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <HeroSection />
      
      {/* Content after animation - nav will stick here */}
      <div className="content-section">
        <Navigation />
        <p className="content-text">
          Animation complete! Now you can see additional content.
        </p>
      </div>
    </div>
  );
}

export default App