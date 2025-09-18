export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>2025 coop©</p>
        </div>
        
        <div className="footer-center">
          <p>
            Hecho con <img src="/images/coop.svg" alt="coop" className="footer-logo" /> por <span className="footer-coop">coop</span>
          </p>
        </div>
        
        <div className="footer-right">
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
              FB
            </a>
            <span className="social-separator">|</span>
            <a href="https://www.instagram.com/coop.agency/reels/" target="_blank" rel="noopener noreferrer" className="social-link">
              IN
            </a>
            <span className="social-separator">|</span>
            <a href="https://www.linkedin.com/company/coopmx/" target="_blank" rel="noopener noreferrer" className="social-link">
              LI
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}