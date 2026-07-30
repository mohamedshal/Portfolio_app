import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ScrollTopButton() {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const SIZE = 54;
  const STROKE = 3.5;
  const R = (SIZE - STROKE * 2) / 2;
  const CIRC = 2 * Math.PI * R;

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = el.scrollTop;
      setProgress(total > 0 ? scrolled / total : 0);
      setVisible(scrolled > 350);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // In light mode, don't change background on hover
  const bgColor = isDark 
    ? (hovered ? "rgba(234,179,8,0.15)" : "rgba(10,10,10,0.9)")
    : "rgba(255,255,255,0.9)";

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 50,
        width: SIZE,
        height: SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: bgColor,
        backdropFilter: "blur(12px)",
        boxShadow: visible
          ? hovered
            ? "0 0 30px rgba(234,179,8,0.45), 0 8px 32px rgba(0,0,0,0.6)"
            : "0 0 16px rgba(234,179,8,0.2), 0 4px 20px rgba(0,0,0,0.5)"
          : "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(0) scale(1.12)"
            : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.7)",
        pointerEvents: visible ? "auto" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
        border: "none",
      }}
    >
      <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={hovered ? "#fde047" : "#eab308"}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.15s linear, stroke 0.3s ease", filter: "drop-shadow(0 0 5px #eab308)" }}
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={hovered ? "#fde047" : "#eab308"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "relative", zIndex: 1, transition: "all 0.3s ease", transform: hovered ? "translateY(-2px)" : "translateY(0)" }}
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
