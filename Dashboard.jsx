import { useNavigate } from "react-router-dom";

const upcomingTrips = [
  { id: 1, from: "DEL", to: "DXB", airline: "IndiGo", date: "Aug 12, 2025", status: "alert", statusText: "Action needed" },
  { id: 2, from: "BOM", to: "LHR", airline: "Air India", date: "Sep 3, 2025", status: "ok", statusText: "Ready to fly" },
];

const alerts = [
  { type: "error", icon: "🛂", message: "Your passport expires in 4 months. UAE requires 6 months validity." },
  { type: "warn", icon: "💉", message: "Yellow Fever vaccination certificate required for Nigeria travel." },
  { type: "ok", icon: "✅", message: "UK visa approved. Valid until Dec 2026." },
];

const destinations = [
  { city: "Singapore", emoji: "🇸🇬", score: 98, tag: "Easy Entry" },
  { city: "Thailand", emoji: "🇹🇭", score: 95, tag: "Visa on Arrival" },
  { city: "Malaysia", emoji: "🇲🇾", score: 96, tag: "No Visa" },
  { city: "Sri Lanka", emoji: "🇱🇰", score: 93, tag: "eVisa" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-page">
      <div className="container">
        {/* Welcome */}
        <div className="dash-header fade-up">
          <div>
            <p className="dash-greeting">Good morning 👋</p>
            <h1 className="dash-title">Arjun Mehta's <span className="teal">Travel Hub</span></h1>
          </div>
          <button className="btn-primary" onClick={() => navigate("/flights")}>
            + New Search
          </button>
        </div>

        {/* Alert Banner */}
        <div className="alert-banner-dash fade-up-1">
          <span className="alert-icon">⚠️</span>
          <div>
            <strong>Passport Alert:</strong> Your passport expires in 4 months. UAE requires 6 months validity.{" "}
            <span className="alert-action">Renew before Aug 12 →</span>
          </div>
        </div>

        <div className="dash-grid">
          {/* Left Column */}
          <div className="dash-left">
            {/* Upcoming Trips */}
            <section className="dash-section fade-up-1">
              <div className="section-head">
                <h2 className="dash-section-title">Upcoming Trips</h2>
                <span className="section-count">{upcomingTrips.length}</span>
              </div>
              {upcomingTrips.map(trip => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-route">
                    <span className="airport-code">{trip.from}</span>
                    <span className="route-arrow">✈ ─────</span>
                    <span className="airport-code">{trip.to}</span>
                  </div>
                  <div className="trip-meta">
                    <span>{trip.airline}</span>
                    <span className="dot">·</span>
                    <span>{trip.date}</span>
                  </div>
                  <span className={`status-badge ${trip.status}`}>{trip.statusText}</span>
                </div>
              ))}
            </section>

            {/* Travel Alerts */}
            <section className="dash-section fade-up-2">
              <div className="section-head">
                <h2 className="dash-section-title">Travel Alerts</h2>
              </div>
              {alerts.map((a, i) => (
                <div key={i} className={`dash-alert ${a.type}`}>
                  <span className="dash-alert-icon">{a.icon}</span>
                  <p>{a.message}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column */}
          <div className="dash-right">
            {/* Passport Card */}
            <section className="dash-section fade-up-1">
              <h2 className="dash-section-title">Saved Passport</h2>
              <div className="passport-card">
                <div className="passport-header">
                  <span className="passport-emoji">🇮🇳</span>
                  <div>
                    <p className="passport-country">Republic of India</p>
                    <p className="passport-type">Type P — Ordinary</p>
                  </div>
                </div>
                <div className="passport-fields">
                  <div className="passport-field">
                    <span className="pf-label">Holder</span>
                    <span className="pf-value">Arjun Mehta</span>
                  </div>
                  <div className="passport-field">
                    <span className="pf-label">Number</span>
                    <span className="pf-value">A•••••67</span>
                  </div>
                  <div className="passport-field">
                    <span className="pf-label">Expiry</span>
                    <span className="pf-value danger">Oct 2025 ⚠</span>
                  </div>
                  <div className="passport-field">
                    <span className="pf-label">Nationality</span>
                    <span className="pf-value">Indian</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Visa Status */}
            <section className="dash-section fade-up-2">
              <h2 className="dash-section-title">Visa Status</h2>
              {[
                { country: "🇬🇧 United Kingdom", status: "Active", color: "var(--success)" },
                { country: "🇺🇸 United States", status: "Expired", color: "var(--danger)" },
                { country: "🇸🇬 Singapore", status: "Visa-Free", color: "var(--teal)" },
              ].map((v, i) => (
                <div key={i} className="visa-row">
                  <span className="visa-country">{v.country}</span>
                  <span className="visa-status" style={{ color: v.color }}>{v.status}</span>
                </div>
              ))}
            </section>

            {/* Recommended */}
            <section className="dash-section fade-up-3">
              <h2 className="dash-section-title">Recommended For You</h2>
              <div className="reco-grid">
                {destinations.map((d, i) => (
                  <div key={i} className="reco-card" onClick={() => navigate("/flights")}>
                    <span className="reco-emoji">{d.emoji}</span>
                    <span className="reco-city">{d.city}</span>
                    <span className="reco-tag">{d.tag}</span>
                    <span className="reco-score">{d.score}%</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page { padding: 100px 0 80px; }
        .dash-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 24px; flex-wrap: wrap; gap: 16px;
        }
        .dash-greeting { font-size: 0.9rem; color: var(--muted); margin-bottom: 4px; }
        .dash-title {
          font-family: var(--font-head); font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800; letter-spacing: -0.02em;
        }
        .alert-banner-dash {
          background: rgba(255,77,109,0.08); border: 1px solid rgba(255,77,109,0.2);
          border-radius: var(--radius); padding: 16px 20px;
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 0.9rem; color: var(--muted); margin-bottom: 32px;
        }
        .alert-banner-dash strong { color: var(--danger); }
        .alert-banner-dash .alert-icon { font-size: 1.1rem; flex-shrink: 0; }
        .alert-action { color: var(--teal); font-weight: 600; cursor: pointer; }
        .dash-grid {
          display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: start;
        }
        .dash-left, .dash-right { display: flex; flex-direction: column; gap: 24px; }
        .dash-section {
          background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: var(--radius); padding: 24px;
        }
        .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .dash-section-title {
          font-family: var(--font-head); font-size: 1rem; font-weight: 700;
          color: var(--white);
        }
        .section-count {
          background: rgba(0,212,184,0.15); color: var(--teal);
          font-size: 0.75rem; font-weight: 700;
          padding: 2px 8px; border-radius: 50px;
        }
        .trip-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-sm); padding: 16px 18px;
          margin-bottom: 10px; display: flex; align-items: center;
          justify-content: space-between; gap: 12px; flex-wrap: wrap;
        }
        .trip-route { display: flex; align-items: center; gap: 10px; }
        .airport-code {
          font-family: var(--font-head); font-size: 1.1rem; font-weight: 800;
        }
        .route-arrow { color: var(--muted); font-size: 0.7rem; }
        .trip-meta { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--muted); }
        .dot { opacity: 0.4; }
        .status-badge {
          font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 50px;
        }
        .status-badge.ok { background: rgba(61,220,132,0.12); color: var(--success); }
        .status-badge.alert { background: rgba(255,179,71,0.12); color: var(--amber); }
        .dash-alert {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 14px; border-radius: var(--radius-sm);
          margin-bottom: 8px; font-size: 0.85rem; line-height: 1.55;
        }
        .dash-alert.error { background: rgba(255,77,109,0.08); color: #ffaab8; border: 1px solid rgba(255,77,109,0.15); }
        .dash-alert.warn { background: rgba(255,179,71,0.08); color: #ffd49e; border: 1px solid rgba(255,179,71,0.15); }
        .dash-alert.ok { background: rgba(61,220,132,0.08); color: #a0f0c0; border: 1px solid rgba(61,220,132,0.15); }
        .dash-alert-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
        .passport-card {
          background: linear-gradient(135deg, rgba(0,212,184,0.08), rgba(167,139,250,0.05));
          border: 1px solid rgba(0,212,184,0.2); border-radius: var(--radius-sm); padding: 18px;
        }
        .passport-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .passport-emoji { font-size: 2rem; }
        .passport-country { font-family: var(--font-head); font-size: 0.95rem; font-weight: 700; }
        .passport-type { font-size: 0.78rem; color: var(--muted); }
        .passport-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .passport-field { display: flex; flex-direction: column; gap: 2px; }
        .pf-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .pf-value { font-size: 0.88rem; font-weight: 600; color: var(--white); }
        .pf-value.danger { color: var(--danger); }
        .visa-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .visa-row:last-child { border-bottom: none; }
        .visa-country { font-size: 0.9rem; color: var(--white); }
        .visa-status { font-size: 0.82rem; font-weight: 700; }
        .reco-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .reco-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-sm); padding: 14px;
          display: flex; flex-direction: column; gap: 4px;
          cursor: pointer; transition: all 0.2s;
        }
        .reco-card:hover { border-color: rgba(0,212,184,0.3); transform: translateY(-2px); }
        .reco-emoji { font-size: 1.4rem; }
        .reco-city { font-family: var(--font-head); font-size: 0.9rem; font-weight: 700; }
        .reco-tag { font-size: 0.72rem; color: var(--teal); }
        .reco-score { font-size: 0.78rem; color: var(--muted); }
        @media (max-width: 860px) {
          .dash-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
