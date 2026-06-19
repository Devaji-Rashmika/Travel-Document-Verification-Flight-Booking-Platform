import { useState } from "react";
import { useNavigate } from "react-router-dom";

const checks = [
  {
    id: "passport",
    label: "Passport Validity",
    status: "fail",
    detail: "Expires Oct 2025. UAE requires 6+ months beyond travel date.",
    action: "Renew your passport before travel date.",
    icon: "🛂",
  },
  {
    id: "visa",
    label: "Visa Requirement",
    status: "pass",
    detail: "Indian nationals receive UAE visa on arrival (up to 30 days).",
    icon: "📋",
  },
  {
    id: "docs",
    label: "Documents Uploaded",
    status: "pass",
    detail: "Passport copy and photo uploaded successfully.",
    icon: "📁",
  },
  {
    id: "return",
    label: "Return Ticket Requirement",
    status: "pass",
    detail: "Return flight booked and confirmed.",
    icon: "🔄",
  },
  {
    id: "transit",
    label: "Transit Rules",
    status: "na",
    detail: "Non-stop flight. No transit check needed.",
    icon: "🔀",
  },
  {
    id: "vacc",
    label: "Vaccination Requirements",
    status: "warn",
    detail: "No mandatory vaccines for UAE. However, confirm any new advisories.",
    icon: "💉",
  },
];

const scorePercent = 70;

export default function Verification() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const circumference = 2 * Math.PI * 48;
  const dash = (scorePercent / 100) * circumference;

  return (
    <main className="verify-page">
      <div className="container">
        <div className="verify-header fade-up">
          <div>
            <span className="section-eyebrow">Pre-Booking Check</span>
            <h1 className="section-title">Travel Verification</h1>
            <p className="muted" style={{ marginTop: 8 }}>
              DEL → DXB · IndiGo 6E-18 · Aug 12, 2025
            </p>
          </div>
        </div>

        <div className="verify-grid">
          {/* Checks List */}
          <div className="checks-panel fade-up-1">
            <h2 className="panel-title">Verification Checks</h2>
            {checks.map((c, i) => (
              <div
                key={c.id}
                className={`check-item ${c.status} ${expanded === c.id ? "open" : ""}`}
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="check-row">
                  <span className="check-icon">{c.icon}</span>
                  <span className="check-label">{c.label}</span>
                  <span className={`check-badge ${c.status}`}>
                    {c.status === "pass" ? "✓ Passed" : c.status === "fail" ? "✗ Failed" : c.status === "warn" ? "⚠ Warning" : "— N/A"}
                  </span>
                  <span className="check-toggle">{expanded === c.id ? "▲" : "▼"}</span>
                </div>
                {expanded === c.id && (
                  <div className="check-detail">
                    <p>{c.detail}</p>
                    {c.action && (
                      <div className="check-action">
                        <strong>Suggested Action:</strong> {c.action}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Score + Summary */}
          <div className="score-panel">
            <div className="score-card card fade-up-2">
              <h2 className="panel-title" style={{ marginBottom: 24 }}>Travel Ready Score</h2>
              <div className="score-visual">
                <svg width="140" height="140" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
                  <circle
                    cx="55" cy="55" r="48" fill="none"
                    stroke={scorePercent >= 80 ? "#3ddc84" : scorePercent >= 50 ? "#ffb347" : "#ff4d6d"}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${dash} ${circumference}`}
                    transform="rotate(-90 55 55)"
                    style={{ transition: "stroke-dasharray 1s ease" }}
                  />
                  <text x="55" y="49" textAnchor="middle" fill="#f0f4ff"
                    fontSize="18" fontFamily="Syne" fontWeight="800">{scorePercent}%</text>
                  <text x="55" y="65" textAnchor="middle" fill="#8892b0"
                    fontSize="8" fontFamily="DM Sans">READY SCORE</text>
                </svg>
              </div>

              <div className="score-breakdown">
                {checks.filter(c => c.status !== "na").map(c => (
                  <div key={c.id} className="score-row">
                    <span className="score-label-item">{c.label}</span>
                    <span className={`score-pill ${c.status}`}>
                      {c.status === "pass" ? "Pass" : c.status === "fail" ? "Fail" : "Warn"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="suggested-action">
                <strong>⚡ Action Required:</strong>
                <p>Renew your passport before your travel date to unlock full booking eligibility.</p>
              </div>

              <div className="verify-actions">
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => navigate("/confirmation")}>
                  Proceed to Booking
                </button>
                <button className="btn-ghost" style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => navigate("/flights")}>
                  ← Back to Flights
                </button>
              </div>
            </div>

            {/* Passport urgency */}
            <div className="card fade-up-3" style={{ marginTop: 16 }}>
              <h3 className="panel-title" style={{ fontSize: "0.95rem", marginBottom: 12 }}>🗓 Timeline</h3>
              {[
                { label: "Today", note: "Verification failed — passport issue detected" },
                { label: "ASAP", note: "Apply for passport renewal (takes 3–6 weeks)" },
                { label: "Aug 1", note: "Latest date to have renewed passport in hand" },
                { label: "Aug 12", note: "Departure date — DEL → DXB" },
              ].map((t, i) => (
                <div key={i} className="timeline-row">
                  <div className="tl-dot" />
                  <div>
                    <p className="tl-date">{t.label}</p>
                    <p className="tl-note">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .verify-page { padding: 100px 0 80px; }
        .section-eyebrow {
          display: inline-block; font-size: 0.78rem; font-weight: 700;
          color: var(--teal); text-transform: uppercase; letter-spacing: 0.12em;
          margin-bottom: 10px; background: rgba(0,212,184,0.08);
          border: 1px solid rgba(0,212,184,0.2); padding: 5px 14px; border-radius: 50px;
        }
        .verify-header { margin-bottom: 32px; }
        .verify-grid {
          display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start;
        }
        .checks-panel, .score-panel { display: flex; flex-direction: column; }
        .panel-title { font-family: var(--font-head); font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
        .check-item {
          background: var(--card-bg); border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-sm); margin-bottom: 8px;
          cursor: pointer; overflow: hidden; transition: border-color 0.2s;
        }
        .check-item.pass { border-left: 3px solid var(--success); }
        .check-item.fail { border-left: 3px solid var(--danger); }
        .check-item.warn { border-left: 3px solid var(--amber); }
        .check-item.na { border-left: 3px solid rgba(255,255,255,0.15); }
        .check-row {
          display: flex; align-items: center; gap: 12px; padding: 14px 16px;
        }
        .check-icon { font-size: 1.1rem; flex-shrink: 0; }
        .check-label { flex: 1; font-size: 0.92rem; font-weight: 600; }
        .check-badge {
          font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 50px;
        }
        .check-badge.pass { background: rgba(61,220,132,0.12); color: var(--success); }
        .check-badge.fail { background: rgba(255,77,109,0.12); color: var(--danger); }
        .check-badge.warn { background: rgba(255,179,71,0.12); color: var(--amber); }
        .check-badge.na { background: rgba(255,255,255,0.06); color: var(--muted); }
        .check-toggle { font-size: 0.7rem; color: var(--muted); }
        .check-detail {
          padding: 0 16px 14px 42px; font-size: 0.85rem; color: var(--muted); line-height: 1.6;
        }
        .check-action {
          margin-top: 8px; background: rgba(255,179,71,0.08); border: 1px solid rgba(255,179,71,0.15);
          border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.82rem; color: var(--amber);
        }
        .score-card { }
        .score-visual { display: flex; justify-content: center; margin-bottom: 24px; }
        .score-breakdown { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .score-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .score-row:last-child { border-bottom: none; }
        .score-label-item { font-size: 0.83rem; color: var(--muted); }
        .score-pill {
          font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 50px;
        }
        .score-pill.pass { background: rgba(61,220,132,0.12); color: var(--success); }
        .score-pill.fail { background: rgba(255,77,109,0.12); color: var(--danger); }
        .score-pill.warn { background: rgba(255,179,71,0.12); color: var(--amber); }
        .suggested-action {
          background: rgba(255,77,109,0.07); border: 1px solid rgba(255,77,109,0.2);
          border-radius: var(--radius-sm); padding: 12px 14px;
          font-size: 0.84rem; color: var(--muted); line-height: 1.6; margin-bottom: 18px;
        }
        .suggested-action strong { color: var(--danger); display: block; margin-bottom: 4px; }
        .verify-actions { display: flex; flex-direction: column; gap: 10px; }
        .timeline-row {
          display: flex; align-items: flex-start; gap: 12px; padding: 8px 0;
          border-left: 1px solid rgba(0,212,184,0.2); padding-left: 16px; margin-left: 6px;
          position: relative;
        }
        .tl-dot {
          position: absolute; left: -5px; top: 14px;
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--teal); border: 2px solid var(--navy-mid); flex-shrink: 0;
        }
        .tl-date { font-family: var(--font-head); font-size: 0.82rem; font-weight: 700; color: var(--teal); }
        .tl-note { font-size: 0.8rem; color: var(--muted); line-height: 1.5; }
        @media (max-width: 860px) {
          .verify-grid { grid-template-columns: 1fr; }
          .score-panel { order: -1; }
        }
      `}</style>
    </main>
  );
}
