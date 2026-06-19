const features = [
  {
    icon: "🛂",
    title: "Passport Validity Checker",
    desc: "Instantly checks if your passport meets destination entry requirements before you book.",
    color: "#00d4b8",
  },
  {
    icon: "📋",
    title: "Visa Requirement Alerts",
    desc: "Real-time visa rules for 190+ countries based on your nationality and destination.",
    color: "#ffb347",
  },
  {
    icon: "🌐",
    title: "Real-Time Travel Rules",
    desc: "Live embassy data for transit requirements, vaccinations, and entry bans.",
    color: "#a78bfa",
  },
  {
    icon: "🤖",
    title: "AI Travel Assistant",
    desc: "Ask any travel document question and get an instant, accurate answer 24/7.",
    color: "#3ddc84",
  },
];

export default function Highlights() {
  return (
    <section className="highlights-section">
      <div className="container">
        <div className="highlights-header fade-up">
          <span className="section-eyebrow">Why Verifly</span>
          <h2 className="section-title">
            Travel smarter,<br />
            <span className="teal">never get turned away</span>
          </h2>
          <p className="section-sub">
            Every feature is built around one goal: zero surprises at the airport.
          </p>
        </div>

        <div className="highlights-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`highlight-card fade-up-${i + 1}`}
              style={{ "--accent": f.color }}
            >
              <div className="highlight-icon">{f.icon}</div>
              <h3 className="highlight-title">{f.title}</h3>
              <p className="highlight-desc">{f.desc}</p>
              <div className="highlight-bar" />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="stats-row fade-up-4">
          {[
            { value: "190+", label: "Countries Covered" },
            { value: "2M+", label: "Trips Verified" },
            { value: "99.4%", label: "Accuracy Rate" },
            { value: "0", label: "Airport Surprises" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .highlights-section { padding: 100px 0 60px; }
        .highlights-header {
          text-align: center; margin-bottom: 60px;
        }
        .section-eyebrow {
          display: inline-block;
          font-size: 0.78rem; font-weight: 700;
          color: var(--teal); text-transform: uppercase;
          letter-spacing: 0.12em; margin-bottom: 14px;
          background: rgba(0,212,184,0.08);
          border: 1px solid rgba(0,212,184,0.2);
          padding: 5px 14px; border-radius: 50px;
        }
        .section-sub {
          color: var(--muted); font-size: 1.05rem;
          max-width: 500px; margin: 14px auto 0;
        }
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px; margin-bottom: 60px;
        }
        .highlight-card {
          background: var(--card-bg);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius);
          padding: 30px 24px 24px;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
        }
        .highlight-card:hover {
          border-color: var(--accent, var(--teal));
          transform: translateY(-4px);
        }
        .highlight-icon {
          font-size: 2rem; margin-bottom: 18px;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }
        .highlight-title {
          font-family: var(--font-head); font-size: 1.05rem;
          font-weight: 700; margin-bottom: 10px;
          color: var(--white);
        }
        .highlight-desc {
          font-size: 0.88rem; color: var(--muted); line-height: 1.65;
        }
        .highlight-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent, var(--teal));
          opacity: 0; transition: opacity 0.25s;
        }
        .highlight-card:hover .highlight-bar { opacity: 1; }
        .stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          background: rgba(0,212,184,0.05);
          border: 1px solid rgba(0,212,184,0.12);
          border-radius: var(--radius); padding: 36px 40px;
        }
        .stat-item {
          display: flex; flex-direction: column;
          align-items: center; gap: 6px; text-align: center;
        }
        .stat-value {
          font-family: var(--font-head); font-size: 2.2rem;
          font-weight: 800; color: var(--teal);
        }
        .stat-label {
          font-size: 0.82rem; color: var(--muted); font-weight: 500;
        }
        @media (max-width: 900px) {
          .highlights-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-row { grid-template-columns: repeat(2, 1fr); padding: 28px; }
        }
        @media (max-width: 560px) {
          .highlights-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
