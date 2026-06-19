import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const bookingId = "VF-2025-08120042";

  return (
    <main className="confirm-page">
      <div className="container confirm-container">
        {/* Success Badge */}
        <div className="success-badge fade-up">
          <div className="success-ring">
            <div className="success-icon">✓</div>
          </div>
          <h1 className="confirm-title">Booking Confirmed!</h1>
          <p className="confirm-sub">Your travel documents meet destination requirements.</p>
        </div>

        {/* Booking Card */}
        <div className="booking-card card fade-up-1">
          <div className="booking-id-row">
            <span className="booking-id-label">Booking ID</span>
            <span className="booking-id">{bookingId}</span>
            <button className="copy-btn" onClick={() => navigator.clipboard.writeText(bookingId)}>📋 Copy</button>
          </div>

          {/* Flight Info */}
          <div className="confirm-flight">
            <div className="confirm-route">
              <div className="confirm-airport">
                <span className="ca-code">DEL</span>
                <span className="ca-city">New Delhi</span>
                <span className="ca-time">06:25</span>
              </div>
              <div className="confirm-arrow">
                <span className="confirm-duration">4h 05m</span>
                <div className="arrow-line">
                  <div className="arrow-dash" />
                  <span className="arrow-plane">✈</span>
                  <div className="arrow-dash" />
                </div>
                <span className="confirm-stops">Non-stop</span>
              </div>
              <div className="confirm-airport right">
                <span className="ca-code">DXB</span>
                <span className="ca-city">Dubai</span>
                <span className="ca-time">08:30</span>
              </div>
            </div>
            <div className="confirm-flight-meta">
              <span>IndiGo · 6E-18</span>
              <span>Aug 12, 2025</span>
              <span>Economy · 1 Passenger</span>
            </div>
          </div>

          <div className="divider" />

          {/* Passenger */}
          <div className="confirm-section">
            <h3 className="confirm-section-title">Passenger Details</h3>
            <div className="confirm-details-grid">
              <div className="confirm-detail">
                <span className="cd-label">Full Name</span>
                <span className="cd-value">Arjun Mehta</span>
              </div>
              <div className="confirm-detail">
                <span className="cd-label">Nationality</span>
                <span className="cd-value">Indian 🇮🇳</span>
              </div>
              <div className="confirm-detail">
                <span className="cd-label">Passport No.</span>
                <span className="cd-value">A•••••67</span>
              </div>
              <div className="confirm-detail">
                <span className="cd-label">Seat</span>
                <span className="cd-value">24A (Window)</span>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Verified Status */}
          <div className="confirm-section">
            <h3 className="confirm-section-title">Verified Travel Status</h3>
            <div className="verify-status-grid">
              {[
                { label: "Visa Requirement", status: "pass" },
                { label: "Documents Uploaded", status: "pass" },
                { label: "Return Ticket", status: "pass" },
                { label: "Transit Rules", status: "na" },
                { label: "Vaccination", status: "pass" },
                { label: "Passport Validity", status: "warn" },
              ].map((v, i) => (
                <div key={i} className="vs-item">
                  <span className={`vs-dot ${v.status}`} />
                  <span className="vs-label">{v.label}</span>
                  <span className={`vs-status ${v.status}`}>
                    {v.status === "pass" ? "✓" : v.status === "warn" ? "⚠" : "—"}
                  </span>
                </div>
              ))}
            </div>
            <div className="overall-score">
              <span>Overall Ready Score:</span>
              <span className="score-num amber">70%</span>
              <span className="score-note">(Passport renewal advised)</span>
            </div>
          </div>

          <div className="divider" />

          {/* Price */}
          <div className="confirm-price-row">
            <span className="cp-label">Total Paid</span>
            <span className="cp-price">₹12,450</span>
          </div>
        </div>

        {/* Actions */}
        <div className="confirm-actions fade-up-2">
          <button className="btn-primary">📄 Download E-Ticket</button>
          <button className="btn-outline" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
          <button className="btn-ghost" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>

      <style>{`
        .confirm-page {
          min-height: 100vh; padding: 100px 0 80px;
          display: flex; align-items: flex-start; justify-content: center;
        }
        .confirm-container { max-width: 660px; width: 100%; }
        .success-badge {
          text-align: center; margin-bottom: 36px;
        }
        .success-ring {
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(61,220,132,0.12); border: 2px solid var(--success);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: pulse-glow 2s infinite;
        }
        .success-icon {
          font-size: 2rem; color: var(--success); font-weight: 800;
        }
        .confirm-title {
          font-family: var(--font-head); font-size: 2rem; font-weight: 800;
          letter-spacing: -0.02em; margin-bottom: 10px;
        }
        .confirm-sub { color: var(--muted); font-size: 0.95rem; }
        .booking-card { padding: 32px; }
        .booking-id-row {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
          background: rgba(0,212,184,0.06); border: 1px solid rgba(0,212,184,0.15);
          border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 28px;
        }
        .booking-id-label { font-size: 0.78rem; color: var(--muted); font-weight: 600; }
        .booking-id { font-family: var(--font-head); font-size: 1rem; font-weight: 800; color: var(--teal); flex: 1; }
        .copy-btn {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-sm); padding: 6px 12px; color: var(--muted);
          font-size: 0.78rem; transition: all 0.2s;
        }
        .copy-btn:hover { color: var(--white); }
        .confirm-flight { margin-bottom: 24px; }
        .confirm-route {
          display: flex; align-items: center; gap: 16px; margin-bottom: 12px;
        }
        .confirm-airport { display: flex; flex-direction: column; gap: 2px; }
        .confirm-airport.right { align-items: flex-end; }
        .ca-code { font-family: var(--font-head); font-size: 1.5rem; font-weight: 800; }
        .ca-city { font-size: 0.78rem; color: var(--muted); }
        .ca-time { font-size: 0.9rem; font-weight: 600; color: var(--teal); }
        .confirm-arrow { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .confirm-duration { font-size: 0.78rem; color: var(--muted); }
        .arrow-line { display: flex; align-items: center; gap: 4px; width: 100%; }
        .arrow-dash { flex: 1; height: 1px; background: rgba(255,255,255,0.15); }
        .arrow-plane { font-size: 0.9rem; color: var(--teal); }
        .confirm-stops { font-size: 0.7rem; color: var(--muted); }
        .confirm-flight-meta {
          display: flex; gap: 16px; flex-wrap: wrap;
          font-size: 0.82rem; color: var(--muted);
        }
        .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 20px 0; }
        .confirm-section { }
        .confirm-section-title {
          font-family: var(--font-head); font-size: 0.85rem; font-weight: 700;
          color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 14px;
        }
        .confirm-details-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .confirm-detail { display: flex; flex-direction: column; gap: 2px; }
        .cd-label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .cd-value { font-size: 0.92rem; font-weight: 600; }
        .verify-status-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        .vs-item {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .vs-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .vs-dot.pass { background: var(--success); }
        .vs-dot.fail { background: var(--danger); }
        .vs-dot.warn { background: var(--amber); }
        .vs-dot.na { background: rgba(255,255,255,0.2); }
        .vs-label { flex: 1; font-size: 0.86rem; color: var(--muted); }
        .vs-status { font-size: 0.82rem; font-weight: 700; }
        .vs-status.pass { color: var(--success); }
        .vs-status.warn { color: var(--amber); }
        .overall-score {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);
          padding: 10px 14px; font-size: 0.85rem; color: var(--muted);
        }
        .score-num { font-family: var(--font-head); font-size: 1.1rem; font-weight: 800; }
        .score-note { font-size: 0.78rem; color: var(--muted); }
        .confirm-price-row {
          display: flex; justify-content: space-between; align-items: center;
        }
        .cp-label { font-size: 0.92rem; color: var(--muted); font-weight: 600; }
        .cp-price { font-family: var(--font-head); font-size: 1.6rem; font-weight: 800; color: var(--teal); }
        .confirm-actions {
          display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; justify-content: center;
        }
      `}</style>
    </main>
  );
}
