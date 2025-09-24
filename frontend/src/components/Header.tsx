import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🎨</span>
          <span className="logo-text">SVG Glyphs</span>
        </div>

        <nav className="nav">
          <a href="#gallery" className="nav-link">
            Gallery
          </a>
          <a href="#mint" className="nav-link">
            Mint
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
