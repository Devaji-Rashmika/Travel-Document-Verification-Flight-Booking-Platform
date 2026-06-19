import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-icon">✈</span>
            <span className="logo-text">
              Veri<span className="teal">Fly</span>
            </span>
          </div>
          <p className="footer-tagline">
            Book flights without travel document surprises. Smart verification, safer journeys.
          </p>
          <div className="social-row">
            {["𝕏", "in", "f", "◉"].map((s, i) => (
              <a key={i} href="#" className="social-btn">{s}</a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/">Home</Link>
            <Link to="/flights">Search Flights</Link>
            <Link to="/visa-rules">Visa Rules</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
            <a href="#">Travel Guides</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Disclaimer</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Verifly. All rights reserved.</p>
          <p className="footer-note">Not affiliated with any airline or government agency.</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--navy-mid);
          border-top: 1px solid rgba(0,212,184,0.1);
          margin-top: 80px;
          padding-top: 60px;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.4fr 1.8fr;
          gap: 60px;
          padding-bottom: 50px;
        }
        .footer-brand .logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-head); font-size: 1.4rem; font-weight: 800;
          margin-bottom: 14px;
        }
        .footer-brand .logo-icon {
          font-size: 1.2rem;
          background: linear-gradient(135deg, var(--teal), #00a896);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .footer-tagline {
          color: var(--muted); font-size: 0.9rem; line-height: 1.7;
          max-width: 300px; margin-bottom: 22px;
        }
        .social-row { display: flex; gap: 10px; }
        .social-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%; font-size: 0.9rem; font-weight: 700;
          color: var(--muted); transition: all 0.2s;
        }
        .social-btn:hover { border-color: var(--teal); color: var(--teal); }
        .footer-cols {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;
        }
        .footer-col { display: flex; flex-direction: column; gap: 10px; }
        .footer-col h4 {
          font-family: var(--font-head); font-size: 0.85rem;
          font-weight: 700; color: var(--teal); text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 6px;
        }
        .footer-col a {
          font-size: 0.9rem; color: var(--muted);
          transition: color 0.2s;
        }
        .footer-col a:hover { color: var(--white); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 20px 0;
        }
        .footer-bottom .container {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 8px;
        }
        .footer-bottom p { font-size: 0.82rem; color: var(--muted); }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; gap: 40px; }
          .footer-cols { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </footer>
  );
}
