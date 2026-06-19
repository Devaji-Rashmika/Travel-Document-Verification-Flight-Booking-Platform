import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Highlights from "./Highlights";

const nationalities = ["Indian", "Pakistani", "American", "British", "Canadian", "Australian", "Emirati", "German", "French", "Chinese"];

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "", to: "", departure: "", returnDate: "", passengers: 1, nationality: ""
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/flights");
  };

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="container hero-content">
          <div className="hero-badge fade-up">
            <span className="badge-dot" />
            Smart Travel Verification — Live
          </div>

          <h1 className="hero-title fade-up-1">
            Book Flights Without<br />
            <span className="teal">Document Mistakes</span>
          </h1>

          <p className="hero-sub fade-up-2">
            Get instant passport validity and visa requirement checks before booking.
            <br />No more airport panics. No missed flights.
          </p>

          <div className="hero-actions fade-up-3">
            <button className="btn-primary" onClick={() => navigate("/flights")}>
              ✈ Search Flights
            </button>
            <button className="btn-outline" onClick={() => navigate("/verification")}>
              ✓ Check Travel Eligibility
            </button>
          </div>

          {/* Search Box */}
          <form className="search-box fade-up-4" onSubmit={handleSearch}>
            <div className="search-row">
              <div className="field-group">
                <label>From</label>
                <input
                  type="text" placeholder="City or Airport"
                  value={form.from}
                  onChange={e => setForm({ ...form, from: e.target.value })}
                />
              </div>
              <div className="swap-btn" title="Swap">⇄</div>
              <div className="field-group">
                <label>To</label>
                <input
                  type="text" placeholder="City or Airport"
                  value={form.to}
                  onChange={e => setForm({ ...form, to: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label>Departure</label>
                <input type="date" value={form.departure}
                  onChange={e => setForm({ ...form, departure: e.target.value })} />
              </div>
              <div className="field-group">
                <label>Return</label>
                <input type="date" value={form.returnDate}
                  onChange={e => setForm({ ...form, returnDate: e.target.value })} />
              </div>
            </div>
            <div className="search-row search-row-2">
              <div className="field-group">
                <label>Passengers</label>
                <input type="number" min="1" max="9"
                  value={form.passengers}
                  onChange={e => setForm({ ...form, passengers: e.target.value })} />
              </div>
              <div className="field-group flex-2">
                <label>Nationality</label>
                <select value={form.nationality}
                  onChange={e => setForm({ ...form, nationality: e.target.value })}>
                  <option value="">Select nationality…</option>
                  {nationalities.map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary search-submit">
                Search Flights →
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Alert Banner */}
      <div className="container">
        <div className="alert-banner fade-up">
          <span className="alert-chip warn">⚠ Real Example</span>
          <p>
            Traveler booked Delhi → Dubai but was denied boarding — passport valid for only{" "}
            <strong>4 months</strong>. UAE requires <strong>6 months</strong> minimum validity.
            Verifly would have caught this.
          </p>
        </div>
      </div>

      {/* Features */}
      <Highlights />

      {/* CTA Strip */}
      <section className="cta-strip">
        <div className="container cta-inner">
          <div>
            <h2 className="section-title">Ready to travel <span className="teal">stress-free?</span></h2>
            <p className="muted" style={{ marginTop: 10 }}>
              Join 2M+ travelers who verified before booking.
            </p>
          </div>
          <div className="cta-actions">
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              Create Free Account
            </button>
            <button className="btn-outline" onClick={() => navigate("/flights")}>
              Search Flights
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .home-page { padding-top: 68px; }
        .hero {
          position: relative; min-height: 90vh;
          display: flex; align-items: center; overflow: hidden;
          padding: 80px 0 60px;
        }
        .hero-bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(0,212,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,184,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .hero-glow {
          position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
        }
        .hero-glow-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,212,184,0.12) 0%, transparent 70%);
          top: -100px; right: -100px;
        }
        .hero-glow-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%);
          bottom: -50px; left: -50px;
        }
        .hero-content { position: relative; z-index: 1; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,212,184,0.08); border: 1px solid rgba(0,212,184,0.2);
          border-radius: 50px; padding: 8px 16px;
          font-size: 0.82rem; font-weight: 600; color: var(--teal);
          margin-bottom: 28px;
        }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--teal);
          animation: pulse-glow 2s infinite;
        }
        .hero-title {
          font-family: var(--font-head);
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 800; line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 22px;
        }
        .hero-sub {
          font-size: 1.1rem; color: var(--muted); line-height: 1.75;
          max-width: 540px; margin-bottom: 36px;
        }
        .hero-actions {
          display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 50px;
        }
        .search-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,212,184,0.15);
          border-radius: var(--radius); padding: 28px;
          backdrop-filter: blur(20px);
          display: flex; flex-direction: column; gap: 16px;
          max-width: 880px;
        }
        .search-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr 1fr 1fr;
          gap: 12px; align-items: end;
        }
        .search-row-2 {
          grid-template-columns: 120px 1fr auto;
        }
        .flex-2 { grid-column: span 1; }
        .swap-btn {
          font-size: 1.1rem; color: var(--teal); padding: 12px 10px;
          cursor: pointer; user-select: none;
          transition: transform 0.2s;
        }
        .swap-btn:hover { transform: scale(1.2); }
        .search-submit {
          white-space: nowrap; height: 48px;
        }
        .alert-banner {
          display: flex; align-items: flex-start; gap: 16px;
          background: rgba(255,179,71,0.06); border: 1px solid rgba(255,179,71,0.18);
          border-radius: var(--radius); padding: 18px 22px;
          margin-top: 40px;
        }
        .alert-banner p { font-size: 0.92rem; color: var(--muted); line-height: 1.6; }
        .alert-banner strong { color: var(--amber); }
        .cta-strip {
          background: linear-gradient(135deg, rgba(0,212,184,0.07), rgba(167,139,250,0.05));
          border-top: 1px solid rgba(0,212,184,0.1);
          border-bottom: 1px solid rgba(0,212,184,0.1);
          padding: 60px 0;
        }
        .cta-inner {
          display: flex; justify-content: space-between; align-items: center;
          gap: 30px; flex-wrap: wrap;
        }
        .cta-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .search-row { grid-template-columns: 1fr 1fr; }
          .search-row-2 { grid-template-columns: 1fr 1fr; }
          .swap-btn { display: none; }
          .search-submit { grid-column: span 2; }
          .cta-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </main>
  );
}
