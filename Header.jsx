import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Flights", to: "/flights" },
    { label: "Visa Rules", to: "/visa-rules" },
    { label: "Help Center", to: "/help" },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">✈</span>
          <span className="logo-text">
            Veri<span className="teal">Fly</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${pathname === link.to ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="header-actions">
          <Link to="/login" className="btn-ghost">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-auth">
            <Link to="/login" className="btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(10,15,46,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,212,184,0.1);
        }
        .header-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 68px;
        }
        .logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-head); font-size: 1.4rem; font-weight: 800;
        }
        .logo-icon {
          font-size: 1.2rem;
          background: linear-gradient(135deg, var(--teal), #00a896);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .desktop-nav {
          display: flex; align-items: center; gap: 6px;
        }
        .nav-link {
          padding: 8px 16px; border-radius: 50px;
          font-size: 0.92rem; font-weight: 500; color: var(--muted);
          transition: color 0.2s, background 0.2s;
        }
        .nav-link:hover { color: var(--white); background: rgba(255,255,255,0.06); }
        .nav-link.active { color: var(--teal); background: rgba(0,212,184,0.08); }
        .header-actions { display: flex; align-items: center; gap: 10px; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--white); border-radius: 2px;
          transition: all 0.25s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        .mobile-menu {
          background: var(--navy-mid);
          border-top: 1px solid rgba(0,212,184,0.1);
          padding: 20px 24px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .mobile-nav-link {
          padding: 12px 16px; border-radius: var(--radius-sm);
          font-size: 1rem; font-weight: 500; color: var(--white);
          transition: background 0.2s;
        }
        .mobile-nav-link:hover { background: rgba(255,255,255,0.06); }
        .mobile-auth {
          margin-top: 12px; display: flex; gap: 10px; flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .desktop-nav, .header-actions { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </header>
  );
}
