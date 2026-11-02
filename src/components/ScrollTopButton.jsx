import { useCallback, useEffect, useRef, useState } from "react";

export default function ScrollTopButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const animationFrame = useRef(0);

  const SIZE = 54;
  const STROKE = 3.5;
  const R = (SIZE - STROKE * 2) / 2;
  const CIRC = 2 * Math.PI * R;

  const updateScrollState = useCallback(() => {
    const root = document.scrollingElement || document.documentElement;
    const total = root.scrollHeight - root.clientHeight;
    const scrolled = root.scrollTop;
    setProgress(total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0);
    setVisible(scrolled > 350);
  }, []);

  useEffect(() => {
    const onScroll = () => updateScrollState();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [updateScrollState]);

  const handleScrollToTop = () => {
    cancelAnimationFrame(animationFrame.current);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const trackScroll = () => {
      updateScrollState();
      const root = document.scrollingElement || document.documentElement;
      if (root.scrollTop > 0) {
        animationFrame.current = requestAnimationFrame(trackScroll);
      }
    };

    animationFrame.current = requestAnimationFrame(trackScroll);
  };

  const bgColor = hovered
    ? "color-mix(in srgb, var(--accent-primary) 14%, var(--bg-primary))"
    : "color-mix(in srgb, var(--bg-primary) 90%, transparent)";

  return (
    <button
      onClick={handleScrollToTop}
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
            ? "0 8px 24px var(--shadow-lift), 0 0 22px var(--accent-ring)"
            : "0 4px 16px var(--shadow-card), 0 0 12px var(--accent-glow)"
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
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="var(--border-color)" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke={hovered ? "var(--accent-hover)" : "var(--accent-primary)"}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.15s linear, stroke 0.3s ease" }}
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={hovered ? "var(--accent-hover)" : "var(--accent-primary)"}
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
