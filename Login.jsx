import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [step, setStep] = useState("login"); // 'login' | 'otp'
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.identifier || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleOtp = (val, idx) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card fade-up">
        {/* Top brand */}
        <div className="auth-brand">
          <span className="auth-logo">✈</span>
          <span className="auth-logo-text">Veri<span className="teal">Fly</span></span>
        </div>

        {step === "login" ? (
          <>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-sub">Sign in to manage your trips and travel documents.</p>

            {error && <div className="form-error">{error}</div>}

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="field-group">
                <label>Email or Mobile</label>
                <input
                  type="text" placeholder="you@example.com or +91…"
                  value={form.identifier}
                  onChange={e => setForm({ ...form, identifier: e.target.value })}
                />
              </div>
              <div className="field-group">
                <label>Password</label>
                <input
                  type="password" placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className="auth-forgot">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
              <button type="submit" className="btn-primary auth-btn">
                Continue →
              </button>
            </form>

            <div className="auth-divider"><span>or continue with</span></div>

            <div className="social-login">
              <button className="social-login-btn">
                <span>G</span> Google
              </button>
              <button className="social-login-btn">
                <span>🍎</span> Apple
              </button>
            </div>

            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Sign up free</Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="auth-title">Verify it's you</h1>
            <p className="auth-sub">
              We sent a 6-digit code to <strong>{form.identifier}</strong>.
            </p>
            <div className="otp-row">
              {otp.map((v, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  className="otp-input"
                  maxLength={1}
                  value={v}
                  onChange={e => handleOtp(e.target.value, i)}
                  onKeyDown={e => {
                    if (e.key === "Backspace" && !v && i > 0)
                      document.getElementById(`otp-${i - 1}`)?.focus();
                  }}
                />
              ))}
            </div>
            <button className="btn-primary auth-btn" onClick={handleVerify}>
              Verify & Sign In
            </button>
            <p className="auth-switch">
              <button className="link-btn" onClick={() => setStep("login")}>
                ← Back to login
              </button>
            </p>
          </>
        )}
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 100px 24px 60px; position: relative; overflow: hidden;
        }
        .auth-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,184,0.08) 0%, transparent 65%);
          top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
        }
        .auth-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 440px;
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
        .auth-sub strong { color: var(--white); }
        .form-error {
          background: rgba(255,77,109,0.1); border: 1px solid rgba(255,77,109,0.25);
          color: var(--danger); border-radius: var(--radius-sm);
          padding: 10px 14px; font-size: 0.85rem; margin-bottom: 16px;
        }
        .auth-form { display: flex; flex-direction: column; gap: 16px; }
        .auth-forgot {
          text-align: right; margin-top: -6px;
        }
        .auth-forgot a { font-size: 0.85rem; color: var(--teal); }
        .auth-forgot a:hover { text-decoration: underline; }
        .auth-btn { width: 100%; justify-content: center; margin-top: 6px; padding: 15px; font-size: 1rem; }
        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 22px 0; color: var(--muted); font-size: 0.82rem;
        }
        .auth-divider::before, .auth-divider::after {
          content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.08);
        }
        .social-login { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 22px; }
        .social-login-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-sm); padding: 12px;
          color: var(--white); font-size: 0.9rem; font-weight: 600;
          transition: all 0.2s;
        }
        .social-login-btn span { font-weight: 800; }
        .social-login-btn:hover { background: rgba(255,255,255,0.1); }
        .auth-switch { text-align: center; font-size: 0.88rem; color: var(--muted); }
        .auth-switch a, .link-btn { color: var(--teal); font-weight: 600; }
        .auth-switch a:hover, .link-btn:hover { text-decoration: underline; }
        .link-btn { background: none; border: none; cursor: pointer; font-size: 0.88rem; }
        .otp-row { display: flex; gap: 10px; margin: 24px 0; justify-content: center; }
        .otp-input {
          width: 48px; height: 56px; text-align: center;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--radius-sm); color: var(--white);
          font-family: var(--font-head); font-size: 1.4rem; font-weight: 700;
          transition: border-color 0.2s;
        }
        .otp-input:focus { border-color: var(--teal); outline: none; box-shadow: 0 0 0 3px rgba(0,212,184,0.15); }
        @media (max-width: 480px) {
          .auth-card { padding: 32px 24px; }
        }
      `}</style>
    </main>
  );
}
