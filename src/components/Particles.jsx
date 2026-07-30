import { useRef } from "react";

export default function Particles() {
  const points = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 14 + 8,
      delay: Math.random() * 7,
    })),
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {points.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "#eab308",
            opacity: 0.13,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
