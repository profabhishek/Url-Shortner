import { useState, useRef } from "react";
import { shortenUrlApi } from "../services/api";

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: "spin 0.8s linear infinite" }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function GlowButton({ onClick, loading, children }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={loading}
      style={{
        position: "relative",
        padding: "0 2rem",
        height: "56px",
        background: loading
          ? "rgba(139,92,246,0.5)"
          : "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
        border: "none",
        borderRadius: "14px",
        color: "#fff",
        fontFamily: "'DM Mono', monospace",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        transform: pressed ? "scale(0.96)" : "scale(1)",
        boxShadow: loading
          ? "none"
          : "0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(6,182,212,0.2)",
        whiteSpace: "nowrap",
        minWidth: "130px",
      }}
    >
      {loading ? (
        <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
          <Spinner />
          <span>Shortening</span>
        </span>
      ) : children}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />
    </button>
  );
}

export default function UrlForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    if (!url.trim()) { setError("Please enter a URL"); return; }
    if (!url.startsWith("http")) { setError("URL must start with http:// or https://"); return; }
    setError("");
    onResult("");
    setLoading(true);
    try {
      const res = await shortenUrlApi(url);
      onResult(res.shortUrl);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div>
      {/* Input Card */}
      <div style={{
        padding: "8px",
        borderRadius: "24px",
        background: "rgba(255,255,255,0.03)",
        border: focused
          ? "1px solid rgba(139,92,246,0.5)"
          : "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: focused
          ? "0 0 0 4px rgba(139,92,246,0.08), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 20px 60px rgba(0,0,0,0.4)",
        marginBottom: "12px",
      }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 20px",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(""); }}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#fff",
                fontFamily: "'DM Mono', monospace",
                fontSize: "15px",
                height: "56px",
                letterSpacing: "0.01em",
              }}
            />
          </div>
          <GlowButton onClick={handleSubmit} loading={loading}>
            Shorten →
          </GlowButton>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: "10px 16px",
          borderRadius: "10px",
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.2)",
          color: "#f87171",
          fontSize: "13px",
          marginBottom: "12px",
          fontFamily: "'DM Mono', monospace",
        }}>
          {error}
        </div>
      )}
    </div>
  );
}