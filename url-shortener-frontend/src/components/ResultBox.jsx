import { useState, useEffect } from "react";

function CopyButton({ text }) {
  const [state, setState] = useState("idle");

  const copy = () => {
    navigator.clipboard.writeText(text);
    setState("copied");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button
      onClick={copy}
      style={{
        padding: "8px 16px",
        borderRadius: "10px",
        border: "1px solid rgba(139,92,246,0.4)",
        background: state === "copied" ? "rgba(34,197,94,0.15)" : "rgba(139,92,246,0.12)",
        color: state === "copied" ? "#4ade80" : "#a78bfa",
        fontFamily: "'DM Mono', monospace",
        fontSize: "12px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        letterSpacing: "0.05em",
      }}
    >
      {state === "copied" ? "✓ COPIED" : "COPY"}
    </button>
  );
}

export default function ResultBox({ shortUrl: rawShortUrl }) {
  const shortUrl = rawShortUrl ? String(rawShortUrl) : "";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shortUrl) setTimeout(() => setVisible(true), 50);
    else setVisible(false);
  }, [shortUrl]);

  if (!shortUrl) return null;

  return (
    <div style={{
      marginTop: "20px",
      padding: "20px 24px",
      background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.08) 100%)",
      border: "1px solid rgba(139,92,246,0.25)",
      borderRadius: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{ overflow: "hidden" }}>
        <div style={{
          fontSize: "11px",
          color: "rgba(167,139,250,0.7)",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.1em",
          marginBottom: "4px",
        }}>
          YOUR SHORT LINK
        </div>
        <div style={{
          fontSize: "20px",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {shortUrl}
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <CopyButton text={shortUrl} />
        <a
          href={shortUrl.startsWith("http") ? shortUrl : `https://${shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: "1px solid rgba(34,211,238,0.3)",
            background: "rgba(34,211,238,0.08)",
            color: "#22d3ee",
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            textDecoration: "none",
            transition: "all 0.2s",
            letterSpacing: "0.05em",
          }}
        >
          OPEN ↗
        </a>
      </div>
    </div>
  );
}