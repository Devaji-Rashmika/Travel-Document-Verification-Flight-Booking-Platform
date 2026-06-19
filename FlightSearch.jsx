import { useState } from "react";
import { useNavigate } from "react-router-dom";

const flights = [
  {
    id: 1, airline: "IndiGo", code: "6E-18", from: "DEL", to: "DXB",
    dep: "06:25", arr: "08:30", duration: "4h 05m", stops: "Non-stop",
    price: 12450, rule: { type: "error", text: "⚠ UAE: Passport must be valid 6+ months." }
  },
  {
    id: 2, airline: "Air Arabia", code: "G9-201", from: "DEL", to: "DXB",
    dep: "09:10", arr: "11:20", duration: "4h 10m", stops: "Non-stop",
    price: 10200, rule: { type: "error", text: "⚠ UAE: Passport must be valid 6+ months." }
  },
  {
    id: 3, airline: "Emirates", code: "EK-510", from: "DEL", to: "LHR",
    dep: "14:55", arr: "19:30", duration: "9h 35m", stops: "1 Stop (DXB)",
    price: 38900, rule: { type: "ok", text: "✓ UK eVisa valid. You're cleared to book." }
  },
  {
    id: 4, airline: "Air India", code: "AI-111", from: "DEL", to: "JFK",
    dep: "02:00", arr: "08:15", duration: "16h 15m", stops: "Non-stop",
    price: 67000, rule: { type: "warn", text: "⚠ US: Verify ESTA/visa is active." }
  },
];

export default function FlightSearch() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? flights
    : filter === "clear" ? flights.filter(f => f.rule.type === "ok")
    : flights.filter(f => f.rule.type !== "ok");

  return (
    <main className="flights-page">
      <div className="container">
        <div className="flights-header fade-up">
          <div>
            <h1 className="section-title">Flight Results</h1>
            <p className="muted" style={{ marginTop: 6, fontSize: "0.92rem" }}>
              {flights.length} flights found · Showing travel rule indicators
            </p>
          </div>
          <div className="filter-chips">
            {[
              { key: "all", label: "All Flights" },
              { key: "clear", label: "✓ Travel Ready" },
              { key: "issues", label: "⚠ Has Issues" },
            ].map(f => (
              <button
                key={f.key}
                className={`filter-chip ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >{f.label}</button>
            ))}
          </div>
        </div>

        <div className="flights-layout">
          {/* Results */}
          <div className="flights-list">
            {filtered.map((flight, i) => (
              <div
                key={flight.id}
                className={`flight-card fade-up-${(i % 3) + 1} ${selected === flight.id ? "selected" : ""}`}
                onClick={() => setSelected(flight.id)}
              >
                <div className="flight-airline">
                  <div className="airline-logo">{flight.airline[0]}</div>
                  <div>
                    <p className="airline-name">{flight.airline}</p>
                    <p className="flight-code">{flight.code}</p>
                  </div>
                </div>

                <div className="flight-route">
                  <div className="flight-end">
                    <span className="airport">{flight.from}</span>
                    <span className="time">{flight.dep}</span>
                  </div>
                  <div className="flight-middle">
                    <span className="duration">{flight.duration}</span>
                    <div className="flight-line">
                      <span className="line-dot" />
                      <div className="line-dash" />
                      <span className="plane-icon">✈</span>
                      <div className="line-dash" />
                      <span className="line-dot" />
                    </div>
                    <span className="stops">{flight.stops}</span>
                  </div>
                  <div className="flight-end right">
                    <span className="airport">{flight.to}</span>
                    <span className="time">{flight.arr}</span>
                  </div>
                </div>

                <div className="flight-right">
                  <p className="price">₹{flight.price.toLocaleString("en-IN")}</p>
                  <p className="per-pax">per person</p>
                  <button
                    className="btn-primary book-btn"
                    onClick={(e) => { e.stopPropagation(); navigate("/verification"); }}
                  >
                    Book
                  </button>
                </div>

                <div className={`rule-badge ${flight.rule.type}`}>
                  {flight.rule.text}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="flights-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-title">Price Filter</h3>
              <input type="range" min="5000" max="80000" className="price-range" />
              <div className="price-range-labels">
                <span>₹5,000</span><span>₹80,000</span>
              </div>
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Airlines</h3>
              {["IndiGo", "Air Arabia", "Emirates", "Air India"].map(a => (
                <label key={a} className="check-row">
                  <input type="checkbox" defaultChecked className="check-input" />
                  <span>{a}</span>
                </label>
              ))}
            </div>

            <div className="sidebar-card rule-info-card">
              <h3 className="sidebar-title">🛂 Travel Rule Alert</h3>
              <p className="rule-info-text">
                Your passport expires in <strong className="danger">Oct 2025</strong>.
                UAE requires <strong>6+ months</strong> validity.
                You're at risk of boarding denial.
              </p>
              <button className="btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
                onClick={() => navigate("/verification")}>
                Check Eligibility
              </button>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .flights-page { padding: 100px 0 80px; }
        .flights-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 16px; margin-bottom: 28px;
        }
        .filter-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-chip {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px; padding: 8px 16px; font-size: 0.84rem;
          font-weight: 600; color: var(--muted); transition: all 0.2s;
        }
        .filter-chip:hover { color: var(--white); }
        .filter-chip.active { border-color: var(--teal); color: var(--teal); background: rgba(0,212,184,0.08); }
        .flights-layout { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
        .flights-list { display: flex; flex-direction: column; gap: 14px; }
        .flight-card {
          background: var(--card-bg); border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius); padding: 20px;
          display: grid; grid-template-columns: 160px 1fr auto;
          gap: 20px; align-items: center;
          cursor: pointer; transition: all 0.25s; position: relative;
          overflow: hidden;
        }
        .flight-card:hover { border-color: rgba(0,212,184,0.25); transform: translateY(-2px); box-shadow: var(--glow); }
        .flight-card.selected { border-color: var(--teal); }
        .flight-airline { display: flex; align-items: center; gap: 12px; }
        .airline-logo {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, var(--teal), #00a896);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-head); font-size: 1.1rem; font-weight: 800; color: var(--navy);
          flex-shrink: 0;
        }
        .airline-name { font-family: var(--font-head); font-size: 0.9rem; font-weight: 700; }
        .flight-code { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
        .flight-route { display: flex; align-items: center; gap: 16px; }
        .flight-end { display: flex; flex-direction: column; gap: 2px; }
        .flight-end.right { align-items: flex-end; }
        .airport { font-family: var(--font-head); font-size: 1.15rem; font-weight: 800; }
        .time { font-size: 0.82rem; color: var(--muted); }
        .flight-middle { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .duration { font-size: 0.78rem; color: var(--muted); }
        .flight-line { display: flex; align-items: center; gap: 4px; }
        .line-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
        .line-dash { flex: 1; height: 1px; background: rgba(255,255,255,0.15); min-width: 30px; }
        .plane-icon { font-size: 0.9rem; color: var(--teal); }
        .stops { font-size: 0.72rem; color: var(--muted); }
        .flight-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
        .price { font-family: var(--font-head); font-size: 1.3rem; font-weight: 800; color: var(--teal); }
        .per-pax { font-size: 0.72rem; color: var(--muted); }
        .book-btn { padding: 10px 20px; font-size: 0.88rem; margin-top: 6px; }
        .rule-badge {
          grid-column: 1 / -1; font-size: 0.8rem; font-weight: 600;
          padding: 8px 14px; border-radius: var(--radius-sm);
        }
        .rule-badge.ok { background: rgba(61,220,132,0.08); color: #a0f0c0; border: 1px solid rgba(61,220,132,0.15); }
        .rule-badge.warn { background: rgba(255,179,71,0.08); color: var(--amber); border: 1px solid rgba(255,179,71,0.15); }
        .rule-badge.error { background: rgba(255,77,109,0.08); color: #ffaab8; border: 1px solid rgba(255,77,109,0.15); }
        .flights-sidebar { display: flex; flex-direction: column; gap: 16px; }
        .sidebar-card {
          background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: var(--radius); padding: 20px;
        }
        .sidebar-title {
          font-family: var(--font-head); font-size: 0.88rem; font-weight: 700;
          margin-bottom: 14px; color: var(--white);
        }
        .price-range { width: 100%; accent-color: var(--teal); margin-bottom: 8px; }
        .price-range-labels { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--muted); }
        .check-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; cursor: pointer; font-size: 0.88rem; color: var(--muted); }
        .check-input { accent-color: var(--teal); width: 15px; height: 15px; }
        .rule-info-card { border-color: rgba(255,77,109,0.25); background: rgba(255,77,109,0.05); }
        .rule-info-text { font-size: 0.86rem; color: var(--muted); line-height: 1.6; }
        @media (max-width: 900px) {
          .flights-layout { grid-template-columns: 1fr; }
          .flights-sidebar { order: -1; }
          .flight-card { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
