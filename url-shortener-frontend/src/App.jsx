import { useState } from "react";
import UrlForm from "./components/UrlForm";
import ResultBox from "./components/ResultBox";

const RECENT_LINKS = [
  { original: "https://notion.so/workspace/quarterly-review-2025", short: "lnk.io/q9x2m1", clicks: 842, ago: "2h" },
  { original: "https://figma.com/file/xKp2mNQoR3/design-system", short: "lnk.io/f7y4k9", clicks: 1203, ago: "5h" },
  { original: "https://docs.google.com/spreadsheets/d/1BxiMVs", short: "lnk.io/g3n8w5", clicks: 291, ago: "1d" },
];

function Orb({ style }) {
  return (
    <div style={{
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(80px)",
      pointerEvents: "none",
      ...style,
    }} />
  );
}

function ParticleField() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: Math.random() * 3 + 1 + "px",
          height: Math.random() * 3 + 1 + "px",
          borderRadius: "50%",
          background: `rgba(${Math.random() > 0.5 ? "139,92,246" : "34,211,238"},${Math.random() * 0.4 + 0.1})`,
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
          animation: `float ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 4}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div style={{
      padding: "10px 20px",
      borderRadius: "999px",
      border: `1px solid ${color}30`,
      background: `${color}10`,
      textAlign: "center",
    }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "18px", fontWeight: 600, color }}>{value}</div>
      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginTop: "2px" }}>{label}</div>
    </div>
  );
}

function LinkRow({ link, index }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      padding: "14px 20px",
      borderRadius: "14px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      gap: "16px",
      animation: `slideIn 0.4s ease ${index * 80 + 100}ms both`,
    }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#22d3ee)", flexShrink: 0 }} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#a78bfa", marginBottom: "2px" }}>{link.short}</div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.original}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px", fontWeight: 500, color: "#22d3ee" }}>{link.clicks.toLocaleString()}</div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>{link.ago} ago</div>
      </div>
    </div>
  );
}

export default function App() {
  const [shortUrl, setShortUrl] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
        @keyframes float { from { transform: translateY(0px) scale(1); } to { transform: translateY(-16px) scale(1.05); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-ring { 0% { opacity: 0.6; transform: scale(1); } 100% { opacity: 0; transform: scale(1.6); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: rgba(255,255,255,0.2) !important; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#080b14",
        color: "#fff",
        fontFamily: "'DM Mono', monospace",
        position: "relative",
        overflow: "hidden",
      }}>
        <ParticleField />
        <Orb style={{ width: "600px", height: "600px", background: "rgba(139,92,246,0.15)", top: "-200px", left: "-100px" }} />
        <Orb style={{ width: "500px", height: "500px", background: "rgba(6,182,212,0.1)", bottom: "-100px", right: "-100px" }} />
        <Orb style={{ width: "300px", height: "300px", background: "rgba(236,72,153,0.08)", top: "40%", left: "60%" }} />

        <div style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "780px",
          margin: "0 auto",
          padding: "60px 24px 80px",
        }}>

          {/* Navbar */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "72px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "9px",
              background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: 700,
            }}>⟡</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.02em" }}>lnk.io</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
              {["Analytics", "API", "Pricing"].map(item => (
                <span key={item} style={{
                  padding: "6px 14px", borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "12px", color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Hero */}
          <div style={{ marginBottom: "48px" }}>
            <div style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.08)",
              fontSize: "11px",
              color: "#a78bfa",
              letterSpacing: "0.15em",
              marginBottom: "20px",
            }}>✦ ZERO FRICTION URL SHORTENING</div>

            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(42px, 8vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              marginBottom: "16px",
            }}>
              <span style={{ display: "block", color: "#fff" }}>Links that</span>
              <span style={{
                display: "block",
                background: "linear-gradient(90deg, #a78bfa 0%, #22d3ee 50%, #f472b6 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}>actually work.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: "440px" }}>
              Blazing fast, enterprise-grade link shortening. Track clicks, manage campaigns, and ship faster.
            </p>
          </div>

          {/* Form + Result */}
          <UrlForm onResult={setShortUrl} />
          <ResultBox shortUrl={shortUrl} />

          {/* Stats */}
          <div style={{ display: "flex", gap: "12px", margin: "32px 0", flexWrap: "wrap" }}>
            <StatPill label="LINKS CREATED" value="2.4M+" color="#a78bfa" />
            <StatPill label="CLICKS TRACKED" value="890M+" color="#22d3ee" />
            <StatPill label="UPTIME" value="99.99%" color="#4ade80" />
            <StatPill label="AVG LATENCY" value="12ms" color="#fb923c" />
          </div>

          {/* Recent Links */}
          <div style={{
            padding: "24px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "pulse-ring 2s ease-out infinite" }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>RECENT LINKS</span>
              </div>
              <span style={{ fontSize: "12px", color: "rgba(139,92,246,0.7)", cursor: "pointer" }}>VIEW ALL →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {RECENT_LINKS.map((link, i) => <LinkRow key={i} link={link} index={i} />)}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: "48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <span>© 2025 LNK.IO — ALL RIGHTS RESERVED</span>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Terms", "Privacy", "Status", "Docs"].map(t => (
                <span key={t} style={{ cursor: "pointer" }}>{t}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}