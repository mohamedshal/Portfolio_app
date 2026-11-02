import { NAV_LINKS } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar({
  activeNav,
  scrolled,
  menuOpen,
  onToggleMenu,
  onNavClick,
}) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <button className="brand" onClick={() => onNavClick("Home")}>
          {"<MO />"}
        </button>
        <div className="nav-links">
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              onClick={() => onNavClick(label)}
              className={`nav-link ${activeNav === label ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button className="mobile-menu" onClick={onToggleMenu} aria-label="Toggle menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`mobile-dropdown${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-dropdown-clip">
          <div className="mobile-dropdown-card">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                onClick={() => onNavClick(label)}
                className={`mobile-nav-link ${activeNav === label ? "active" : ""}`}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
