function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <span className="nav-logo-text">coop</span>
          <span className="nav-logo-egg">🥚</span>
        </div>

        {/* Menu */}
        <div className="nav-menu">
          <a href="#about" className="nav-link">Qué es coop</a>
          <a href="#services" className="nav-link">Servicios</a>
          <a href="#process" className="nav-link">Proceso</a>
          <a href="#contact" className="nav-link nav-link-cta">Hablemos</a>
        </div>

        {/* Mobile menu button */}
        <button className="nav-mobile-toggle" aria-label="Abrir menú">
          <span className="nav-hamburger"></span>
          <span className="nav-hamburger"></span>
          <span className="nav-hamburger"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navigation