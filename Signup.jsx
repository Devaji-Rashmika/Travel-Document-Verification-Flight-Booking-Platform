import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const nationalities = ["Indian", "Pakistani", "American", "British", "Canadian", "Australian", "Emirati", "German", "French", "Chinese", "Japanese", "Brazilian"];

function passStrength(pw) {
  if (!pw) return { label: "", pct: 0, color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "Weak", pct: 25, color: "#ff4d6d" },
    { label: "Fair", pct: 50, color: "#ffb347" },
    { label: "Good", pct: 75, color: "#a78bfa" },
    { label: "Strong", pct: 100, color: "#3ddc84" },
  ];
  return map[score - 1] || map[0];
}

function passportWarning(expiry) {
  if (!expiry) return null;
  const months = (new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24 * 30);
  if (months < 0) return { type: "error", msg: "Passport has already expired!" };
  if (months < 6) return { type: "warn", msg: `Only ${Math.floor(months)} months validity — many countries require 6+.` };
  return { type: "ok", msg: `Valid for ${Math.floor(months)} months ✓` };
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", password: "", confirm: "",
    nationality: "", passportNo: "", passportExpiry: ""
  });

  const strength = passStrength(form.password);
  const warning = passportWarning(form.passportExpiry);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card signup-card fade-up">
        <div className="auth-brand">
          <span className="auth-logo">✈</span>
          <span className="auth-logo-text">Veri<span className="teal">Fly</span></span>
        </div>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Save your travel documents and get verified before every booking.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-section-label">Personal Info</div>
          <div className="form-row">
            <div className="field-group">
              <label>Full Name</label>
              <input type="text" placeholder="Arjun Mehta"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field-group">
              <label>Email Address</label>
              <input type="email" placeholder="arjun@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <div className="form-row">
            <div className="field-group">
              <label>Mobile Number</label>
              <input type="tel" placeholder="+91 98765 43210"
                value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
            </div>
            <div className="field-group">
              <label>Nationality</label>
              <select value={form.nationality}
                onChange={e => setForm({ ...form, nationality: e.target.value })}>
                <option value="">Select…</option>
                {nationalities.map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="form-section-label" style={{ marginTop: 8 }}>Password</div>
          <div className="form-row">
            <div className="field-group">
              <label>Password</label>
              <input type="password" placeholder="Min 8 characters"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              {form.password && (
                <div className="strength-bar-wrap">
                  <div className="strength-bar" style={{ width: `${strength.pct}%`, background: strength.color }} />
                  <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>
            <div className="field-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat password"
                value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
              {form.confirm && form.password !== form.confirm && (
                <p className="field-hint danger">Passwords don't match</p>
              )}
            </div>
          </div>

          <div className="form-section-label" style={{ marginTop: 8 }}>Passport Details</div>
          <div className="form-row">
            <div className="field-group">
              <label>Passport Number</label>
              <input type="text" placeholder="A1234567"
                value={form.passportNo} onChange={e => setForm({ ...form, passportNo: e.target.value })} />
            </div>
            <div className="field-group">
              <label>Passport Expiry Date</label>
              <input type="date"
                value={form.passportExpiry} onChange={e => setForm({ ...form, passportExpiry: e.target.value })} />
              {warning && (
                <p className={`field-hint ${warning.type}`}>{warning.msg}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary auth-btn">
            Create Account →
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 100px 24px 60px; position: relative; overflow: hidden;
        }
        .auth-glow {
          position: absolute; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,184,0.07) 0%, transparent 65%);
          top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none;
        }
        .signup-card { max-width: 680px; }
        .auth-card {
          position: relative; z-index: 1; width: 100%;
          background: var(--card-bg); border: 1px solid var(--card-border);
          border-radius: 24px; padding: 44px 40px;
          backdrop-filter: blur(20px); box-shadow: var(--shadow);
        }
        .auth-brand {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-head); font-size: 1.2rem; font-weight: 800;
          margin-bottom: 28px;
        }
        .auth-logo {
          font-size: 1.1rem;
          background: linear-gradient(135deg, var(--teal), #00a896);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .auth-title {
          font-family: var(--font-head); font-size: 1.8rem; font-weight: 800;
          letter-spacing: -0.02em; margin-bottom: 8px;
        }
        .auth-sub { color: var(--muted); font-size: 0.92rem; margin-bottom: 28px; line-height: 1.6; }
        .signup-form { display: flex; flex-direction: column; gap: 14px; }
        .form-section-label {
          font-size: 0.75rem; font-weight: 700; color: var(--teal);
          text-transform: uppercase; letter-spacing: 0.1em;
          padding-bottom: 6px; border-bottom: 1px solid rgba(0,212,184,0.15);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .strength-bar-wrap {
          margin-top: 8px; position: relative;
          height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px;
        }
        .strength-bar {
          position: absolute; left: 0; top: 0; height: 100%; border-radius: 2px;
          transition: width 0.35s ease, background 0.35s ease;
        }
        .strength-label {
          position: absolute; right: 0; top: -18px;
          font-size: 0.75rem; font-weight: 700;
        }
        .field-hint { font-size: 0.8rem; margin-top: 5px; }
        .field-hint.danger { color: var(--danger); }
        .field-hint.warn { color: var(--amber); }
        .field-hint.ok { color: var(--success); }
        .auth-btn { width: 100%; justify-content: center; padding: 15px; font-size: 1rem; margin-top: 10px; }
        .auth-switch { text-align: center; font-size: 0.88rem; color: var(--muted); margin-top: 20px; }
        .auth-switch a { color: var(--teal); font-weight: 600; }
        .auth-switch a:hover { text-decoration: underline; }
        @media (max-width: 580px) {
          .auth-card { padding: 28px 20px; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
