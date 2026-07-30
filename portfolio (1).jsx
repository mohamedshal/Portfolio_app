import { useState, useEffect, useRef, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React.js",    level: 92, icon: "⚛️",  cat: "Frontend" },
  { name: "Tailwind CSS",level: 90, icon: "🎨",  cat: "Frontend" },
  { name: "Angular",     level: 75, icon: "🔺",  cat: "Frontend" },
  { name: "TypeScript",  level: 78, icon: "🔷",  cat: "Language" },
  { name: "Node.js",     level: 82, icon: "🟢",  cat: "Backend"  },
  { name: "Express.js",  level: 80, icon: "⚡",  cat: "Backend"  },
  { name: "MongoDB",     level: 85, icon: "🍃",  cat: "Database" },
  { name: "PostgreSQL",  level: 70, icon: "🐘",  cat: "Database" },
];

const PROJECTS = [
  {
    title: "GreenLeaf Store",
    subtitle: "E-Commerce Platform",
    desc: "Full-stack e-commerce platform built with Angular 17. Features reactive forms, product catalog with multi-filter, cart & wishlist system, and a clean green/white design system.",
    tags: ["Angular 17", "Tailwind CSS", "TypeScript", "RxJS"],
    accent: "#22c55e",
    icon: "🛒",
    num: "01",
  },
  {
    title: "Ayadi Al-Khayr",
    subtitle: "Charity Management System",
    desc: "Multi-portal web app for an Egyptian NGO supporting cancer patients. Five distinct user roles, real-time notifications via Socket.io, and a financial aid request workflow.",
    tags: ["React", "Node.js", "PostgreSQL", "Socket.io", "JWT"],
    accent: "#eab308",
    icon: "🤝",
    num: "02",
  },
  {
    title: "REST API Service",
    subtitle: "Scalable Backend",
    desc: "Production-ready RESTful API with JWT authentication, role-based access control, file uploads via Cloudinary, and comprehensive error handling middleware.",
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    accent: "#f97316",
    icon: "🔗",
    num: "03",
  },
  {
    title: "Analytics Dashboard",
    subtitle: "Admin Interface",
    desc: "Data-rich admin dashboard with dynamic charts, real-time KPI widgets, dark mode support, and a fully responsive layout built with React and recharts.",
    tags: ["React", "TypeScript", "Recharts", "Tailwind"],
    accent: "#a78bfa",
    icon: "📊",
    num: "04",
  },
  {
    title: "Task Manager Pro",
    subtitle: "Productivity App",
    desc: "Full-stack task management app with drag-and-drop Kanban boards, team collaboration features, and real-time updates using WebSockets.",
    tags: ["React", "Node.js", "MongoDB", "DnD Kit"],
    accent: "#38bdf8",
    icon: "✅",
    num: "05",
  },
];

const TIMELINE = [
  { year: "2020", title: "Started Web Dev", desc: "Fell in love with HTML, CSS and the JavaScript fundamentals." },
  { year: "2021", title: "Learned React & Node", desc: "Built first full-stack apps and discovered the MERN stack." },
  { year: "2022", title: "Freelance Journey", desc: "Started taking freelance projects on Mostaql and beyond." },
  { year: "2023", title: "Angular & TypeScript", desc: "Expanded into the Angular ecosystem and typed JavaScript." },
  { year: "2024", title: "Full-Stack Excellence", desc: "Delivering production-grade apps for clients across the region." },
];

/* ─── HOOKS ─────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Counter ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  const done = useRef(false);
  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    let frame = 0;
    const total = 80;
    const tick = () => {
      frame++;
      setCount(Math.round(target * (frame / total)));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Skill Bar ── */
function SkillBar({ skill, delay, inView }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setW(skill.level), delay);
    return () => clearTimeout(t);
  }, [inView, skill.level, delay]);
  return (
    <div className="py-2 px-3 rounded-xl transition-all duration-300"
      style={{ background: "transparent" }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(234,179,8,0.04)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span>{skill.icon}</span>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#d1d5db", fontFamily: "'Space Mono', monospace" }}>{skill.name}</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(234,179,8,0.08)", color: "#ca8a04", fontFamily: "'Space Mono', monospace" }}>{skill.cat}</span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>{w}%</span>
      </div>
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="h-full rounded-full relative transition-all ease-out"
          style={{ width: `${w}%`, transitionDuration: "1200ms", background: "linear-gradient(90deg,#78350f,#d97706,#fde047)", boxShadow: w > 0 ? "0 0 14px #eab30860" : "none" }}>
          {w > 0 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-yellow-950"
            style={{ background: "#fde047", boxShadow: "0 0 10px #fde047, 0 0 20px #eab30880" }} />}
        </div>
      </div>
    </div>
  );
}

/* ─── Typing Text ── */
function TypingText({ texts }) {
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [disp, setDisp] = useState("");
  useEffect(() => {
    const cur = texts[ti];
    let t;
    if (!del && ci <= cur.length) { setDisp(cur.slice(0, ci)); t = setTimeout(() => setCi(c => c + 1), 65); }
    else if (del && ci >= 0) { setDisp(cur.slice(0, ci)); t = setTimeout(() => setCi(c => c - 1), 35); }
    else if (!del) { t = setTimeout(() => setDel(true), 2200); }
    else { setDel(false); setTi(i => (i + 1) % texts.length); setCi(0); }
    return () => clearTimeout(t);
  }, [ci, del, ti, texts]);
  return (
    <span>
      <span style={{ color: "#eab308" }}>{disp}</span>
      <span className="inline-block w-0.5 h-8 ml-0.5 align-middle" style={{ background: "#eab308", animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

/* ─── Particles ── */
function Particles() {
  const pts = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      s: Math.random() * 2.5 + 0.5, dur: Math.random() * 14 + 8, delay: Math.random() * 7,
    }))
  ).current;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map(p => (
        <div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: "#eab308", opacity: 0.13,
            animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite alternate` }} />
      ))}
    </div>
  );
}

/* ─── PROJECT SLIDER ─────────────────────────────────────────────────────────── */
function ProjectSlider() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const autoRef = useRef(null);
  const [cardHov, setCardHov] = useState(false);

  const go = useCallback((d) => {
    if (animating) return;
    setAnimating(true);
    setDir(d);
    setPrev(active);
    setActive(i => (i + d + PROJECTS.length) % PROJECTS.length);
    setTimeout(() => { setAnimating(false); setPrev(null); }, 500);
  }, [active, animating]);

  useEffect(() => {
    if (hovered) { clearInterval(autoRef.current); return; }
    autoRef.current = setInterval(() => go(1), 4500);
    return () => clearInterval(autoRef.current);
  }, [go, hovered]);

  const proj = PROJECTS[active];

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onMouseDown={e => setDragStart(e.clientX)}
      onMouseUp={e => { if (dragStart && Math.abs(e.clientX - dragStart) > 60) go(e.clientX < dragStart ? 1 : -1); setDragStart(null); }}>

      {/* Card */}
      <div className="relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.06)", minHeight: 380,
          boxShadow: cardHov ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${proj.accent}18` : "0 10px 40px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.5s ease" }}
        onMouseEnter={() => setCardHov(true)} onMouseLeave={() => setCardHov(false)}>

        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${proj.accent}12 0%,transparent 70%)` }} />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full pointer-events-none transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${proj.accent}06 0%,transparent 70%)` }} />

        {/* Big number watermark */}
        <div className="absolute top-4 right-6 select-none pointer-events-none" style={{
          fontFamily: "'Playfair Display', serif", fontSize: 120, fontWeight: 900,
          color: proj.accent, opacity: 0.05, lineHeight: 1, transition: "opacity 0.4s" }}>
          {proj.num}
        </div>

        {/* Accent top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
          style={{ background: `linear-gradient(to right, transparent, ${proj.accent}, transparent)` }} />

        <div className="relative p-8 lg:p-12 flex flex-col lg:flex-row gap-10 items-start">
          {/* Left content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-transform duration-300"
                style={{ background: `${proj.accent}18`, border: `1px solid ${proj.accent}30` }}
                onMouseEnter={e => e.currentTarget.style.transform = "rotate(-10deg) scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "rotate(0deg) scale(1)"}>
                {proj.icon}
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-[4px] uppercase mb-1"
                  style={{ color: proj.accent, fontFamily: "'Space Mono', monospace" }}>{proj.subtitle}</div>
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>{proj.title}</h3>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6 text-sm max-w-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {proj.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {proj.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                  style={{ background: `${proj.accent}12`, color: proj.accent, border: `1px solid ${proj.accent}28`, fontFamily: "'Space Mono', monospace", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${proj.accent}25`; e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = `0 0 10px ${proj.accent}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${proj.accent}12`; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${proj.accent}cc, ${proj.accent})`, color: "#0a0a0a", fontFamily: "'Space Mono', monospace" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = `0 12px 30px ${proj.accent}50`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
                Live Demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", fontFamily: "'Space Mono', monospace" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = proj.accent; e.currentTarget.style.color = proj.accent; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 20px ${proj.accent}25`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                GitHub
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
            </div>
          </div>

          {/* Right: mockup preview */}
          <div className="flex-shrink-0 w-full lg:w-64 transition-all duration-300"
            style={{ transform: cardHov ? "perspective(800px) rotateY(-4deg) translateY(-4px)" : "perspective(800px) rotateY(0deg) translateY(0)" }}>
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${proj.accent}28`, background: "#080808", boxShadow: cardHov ? `0 20px 50px rgba(0,0,0,0.6), 0 0 20px ${proj.accent}20` : "none", transition: "box-shadow 0.4s" }}>
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "#111", borderBottom: `1px solid ${proj.accent}15` }}>
                {["#ef4444","#f59e0b","#22c55e"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                <div className="flex-1 mx-2 py-1 px-2 rounded text-[9px]" style={{ background: "#1a1a1a", color: "#374151", fontFamily: "'Space Mono', monospace" }}>
                  {proj.title.toLowerCase().replace(/\s/g, "-")}.dev
                </div>
              </div>
              <div className="h-48 flex flex-col items-center justify-center gap-3"
                style={{ background: `radial-gradient(circle at 50% 40%, ${proj.accent}10 0%,transparent 70%)` }}>
                <div className="text-5xl transition-transform duration-300" style={{ transform: cardHov ? "scale(1.15)" : "scale(1)" }}>{proj.icon}</div>
                <div className="text-[9px] font-bold tracking-[3px] uppercase" style={{ color: proj.accent, fontFamily: "'Space Mono', monospace" }}>{proj.subtitle}</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 rounded-full" style={{ width: [40,64,28][i], background: `${proj.accent}${["50","30","40"][i]}` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="flex items-center justify-between mt-6 px-1">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {PROJECTS.map((p, i) => (
            <button key={i} onClick={() => { if (i !== active) { setDir(i > active ? 1 : -1); setActive(i); } }}
              className="rounded-full transition-all duration-400"
              style={{ width: i === active ? 32 : 8, height: 8, background: i === active ? proj.accent : "rgba(255,255,255,0.12)", boxShadow: i === active ? `0 0 10px ${proj.accent}70` : "none" }} />
          ))}
        </div>
        {/* Counter + Arrows */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold" style={{ color: "#4b5563", fontFamily: "'Space Mono', monospace" }}>
            <span style={{ color: proj.accent }}>{String(active + 1).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          {[-1, 1].map(d => (
            <button key={d} onClick={() => go(d)}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#6b7280" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = proj.accent; e.currentTarget.style.color = proj.accent; e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = `0 0 18px ${proj.accent}40`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              {d === -1
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SCROLL TO TOP ─────────────────────────────────────────────────────────── */
function ScrollTopButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hov, setHov] = useState(false);
  const SIZE = 54, STROKE = 3.5;
  const R = (SIZE - STROKE * 2) / 2;
  const CIRC = 2 * Math.PI * R;

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
      setVisible(scrolled > 350);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Scroll to top"
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 50,
        width: SIZE, height: SIZE,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "50%",
        background: hov ? "rgba(234,179,8,0.15)" : "rgba(10,10,10,0.9)",
        backdropFilter: "blur(12px)",
        boxShadow: visible ? (hov ? "0 0 30px rgba(234,179,8,0.45), 0 8px 32px rgba(0,0,0,0.6)" : "0 0 16px rgba(234,179,8,0.2), 0 4px 20px rgba(0,0,0,0.5)") : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? (hov ? "translateY(0) scale(1.12)" : "translateY(0) scale(1)") : "translateY(24px) scale(0.7)",
        pointerEvents: visible ? "auto" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer", border: "none",
      }}>
      {/* SVG ring */}
      <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none"
          stroke={hov ? "#fde047" : "#eab308"} strokeWidth={STROKE} strokeLinecap="round"
          strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.15s linear, stroke 0.3s ease", filter: "drop-shadow(0 0 5px #eab308)" }} />
      </svg>
      {/* Arrow icon */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hov ? "#fde047" : "#eab308"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "relative", zIndex: 1, transition: "all 0.3s ease", transform: hov ? "translateY(-2px)" : "translateY(0)" }}>
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

/* ─── MAIN ─────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [skillsRef, skillsInView] = useInView(0.15);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id); setMenuOpen(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ background: "#080808", color: "#e5e7eb", fontFamily: "'Outfit', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Outfit:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes particleFloat{ 0%{transform:translateY(0) rotate(0deg) scale(1)} 100%{transform:translateY(-32px) rotate(200deg) scale(1.3)} }
        @keyframes spinSlow     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlowR    { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pulseGlow    { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.5)} 50%{box-shadow:0 0 0 10px rgba(34,197,94,0)} }
        @keyframes shimmerText  { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes float3d      { 0%,100%{transform:perspective(900px) rotateY(-4deg) rotateX(2deg) translateY(0)} 50%{transform:perspective(900px) rotateY(4deg) rotateX(-2deg) translateY(-8px)} }
        @keyframes heroReveal   { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft     { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeRight    { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn      { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }

        .h1 { animation: heroReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .h2 { animation: heroReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .h3 { animation: heroReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .h4 { animation: heroReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .h5 { animation: heroReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
        .h6 { animation: heroReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s both; }

        .text-gradient { background:linear-gradient(135deg,#d97706 0%,#fbbf24 40%,#fde047 70%,#ca8a04 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .text-gradient-anim { background:linear-gradient(270deg,#78350f,#d97706,#fde047,#fbbf24,#d97706,#78350f); background-size:400% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmerText 5s linear infinite; }

        .grid-bg { background-image:linear-gradient(rgba(234,179,8,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(234,179,8,0.022) 1px,transparent 1px); background-size:64px 64px; }

        .nav-link { position:relative; padding-bottom:4px; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:100%; height:1.5px; background:linear-gradient(90deg,#d97706,#fde047); transform:scaleX(0); transform-origin:left; transition:transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .nav-link:hover::after, .nav-link.active::after { transform:scaleX(1); }

        .stat-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); border:1px solid rgba(255,255,255,0.04); }
        .stat-card:hover { transform:translateY(-8px) scale(1.04); border-color:rgba(234,179,8,0.35) !important; box-shadow:0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(234,179,8,0.1); }

        .tl-item { transition: all 0.3s ease; }
        .tl-item:hover .tl-dot { transform:scale(1.6); box-shadow:0 0 14px #eab308; }
        .tl-dot { transition: all 0.3s ease; }

        .tech-pill { transition: all 0.25s ease; cursor: default; }
        .tech-pill:hover { transform:translateY(-3px) scale(1.06); }

        .social-btn { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); cursor:pointer; border:none; background:transparent; }
        .social-btn:hover { transform:translateY(-6px) scale(1.12); }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#080808; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(to bottom,#d97706,#fde047); border-radius:2px; }

        input, textarea { outline:none !important; }
        section { overflow:hidden; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? "rgba(8,8,8,0.88)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? "1px solid rgba(234,179,8,0.07)" : "none" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-black text-xl cursor-pointer" style={{ fontFamily: "'Space Mono', monospace", color: "#eab308" }} onClick={() => scrollTo("Home")}>
            &lt;MO /&gt;
          </div>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                className={`nav-link text-[11px] font-bold tracking-[3px] uppercase transition-colors ${activeNav === l ? "active" : ""}`}
                style={{ color: activeNav === l ? "#eab308" : "#6b7280", fontFamily: "'Space Mono', monospace" }}>
                {l}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(o => !o)} style={{ color: "#eab308", background: "transparent", border: "none", cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(8,8,8,0.97)", borderBottom: "1px solid rgba(234,179,8,0.08)" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)} className="text-left py-2 text-[11px] font-bold tracking-[3px] uppercase"
                style={{ color: "#6b7280", fontFamily: "'Space Mono', monospace", background: "transparent", border: "none", cursor: "pointer" }}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center grid-bg">
        <Particles />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(234,179,8,0.05) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 left-1/5 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(234,179,8,0.03) 0%,transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Text left */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="h1 flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: "linear-gradient(to right,#eab308,transparent)" }} />
                <span className="text-[10px] font-bold tracking-[5px] uppercase" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>Available for hire</span>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#22c55e", animation: "pulseGlow 2s ease-in-out infinite" }} />
              </div>

              <h1 className="h2 font-black leading-none text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,8vw,6rem)" }}>
                Hi, I'm
              </h1>
              <h1 className="h3 font-black leading-none mb-5 text-gradient-anim" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.2rem,9vw,6.5rem)" }}>
                Mohamed
              </h1>

              <div className="h3 text-xl lg:text-2xl font-semibold mb-5" style={{ minHeight: "2.2rem" }}>
                <TypingText texts={["MERN Stack Developer", "Front-End Engineer", "React Specialist", "Full-Stack Builder"]} />
              </div>

              <p className="h4 text-gray-400 leading-relaxed max-w-lg mb-8 text-sm font-light">
                I craft performant, scalable web applications with modern JavaScript ecosystems.
                From pixel-perfect UIs to robust back-end APIs — I build things that matter.
              </p>

              <div className="h5 flex flex-wrap gap-4 mb-12">
                <button onClick={() => scrollTo("Projects")}
                  className="px-8 py-3.5 font-black text-[11px] tracking-[3px] uppercase rounded-full transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#d97706,#eab308)", color: "#0a0a0a", fontFamily: "'Space Mono', monospace", boxShadow: "0 0 28px rgba(234,179,8,0.35)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 44px rgba(234,179,8,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(234,179,8,0.35)"; }}>
                  View Work ↗
                </button>
                <button onClick={() => scrollTo("Contact")}
                  className="px-8 py-3.5 font-black text-[11px] tracking-[3px] uppercase rounded-full transition-all duration-300"
                  style={{ border: "1px solid rgba(234,179,8,0.4)", color: "#eab308", fontFamily: "'Space Mono', monospace" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(234,179,8,0.1)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}>
                  Hire Me
                </button>
              </div>

              <div className="h6 flex gap-10">
                {[["30+","Projects"],["4+","Years Exp"],["100%","Dedication"]].map(([n, l]) => (
                  <div key={l} className="cursor-default group">
                    <div className="font-black text-3xl text-gradient transition-transform duration-300 group-hover:scale-110 origin-left" style={{ fontFamily: "'Playfair Display', serif" }}>{n}</div>
                    <div className="text-[9px] text-gray-600 tracking-[3px] uppercase mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar right */}
            <div className="h4 order-1 lg:order-2 flex-shrink-0">
              <div className="relative" style={{ animation: "float3d 9s ease-in-out infinite" }}>
                <div className="absolute -inset-10 rounded-full pointer-events-none" style={{ border: "1px dashed rgba(234,179,8,0.18)", animation: "spinSlow 30s linear infinite" }} />
                <div className="absolute -inset-20 rounded-full pointer-events-none" style={{ border: "1px solid rgba(234,179,8,0.06)", animation: "spinSlowR 50s linear infinite" }} />
                {[0, 72, 144, 216, 288].map(deg => (
                  <div key={deg} className="absolute inset-0 rounded-full pointer-events-none" style={{ animation: `spinSlow 30s linear infinite`, transform: `rotate(${deg}deg)` }}>
                    <div className="absolute -top-[84px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full" style={{ background: "#eab308", boxShadow: "0 0 8px #eab308", opacity: 0.4 }} />
                  </div>
                ))}
                <div className="relative w-60 h-60 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                  style={{ border: "2px solid rgba(234,179,8,0.55)", boxShadow: "0 0 70px rgba(234,179,8,0.18), inset 0 0 60px rgba(0,0,0,0.7)" }}>
                  <div className="w-full h-full flex flex-col items-center justify-center"
                    style={{ background: "radial-gradient(circle at 40% 35%,#1c1300 0%,#080808 100%)" }}>
                    <span style={{ fontSize: 82 }}>👨‍💻</span>
                    <span className="text-[9px] tracking-[5px] mt-2" style={{ color: "#374151", fontFamily: "'Space Mono', monospace" }}>YOUR PHOTO</span>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full font-black text-[10px] tracking-[3px] uppercase"
                  style={{ background: "linear-gradient(135deg,#d97706,#eab308)", color: "#0a0a0a", fontFamily: "'Space Mono', monospace", boxShadow: "0 0 24px rgba(234,179,8,0.45)" }}>
                  MERN Stack
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.25 }}>
          <span className="text-[9px] tracking-[5px] uppercase" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>Scroll</span>
          <div className="w-px h-14" style={{ background: "linear-gradient(to bottom,#eab308,transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32" style={{ background: "#0b0b0b" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8" style={{ background: "linear-gradient(to right,#eab308,transparent)" }} />
                <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>My Journey</span>
              </div>
              <h2 className="font-black leading-none text-white mb-12" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
                About <span className="text-gradient">Me</span>
              </h2>
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 h-full w-px" style={{ background: "linear-gradient(to bottom,#eab308,rgba(234,179,8,0.1),transparent)" }} />
                {TIMELINE.map((item, i) => (
                  <div key={i} className="tl-item relative mb-10 last:mb-0 group">
                    <div className="tl-dot absolute -left-10 top-1.5 w-3.5 h-3.5 rounded-full"
                      style={{ background: "#080808", border: "2px solid #eab308", boxShadow: "0 0 6px rgba(234,179,8,0.35)" }} />
                    <div className="text-[10px] font-bold tracking-[4px] mb-1" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>{item.year}</div>
                    <div className="font-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.title}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                I'm a passionate MERN Stack & Front-End Developer based in Suez, Egypt.
                I love turning complex problems into clean, elegant solutions.
                Whether it's a pixel-perfect UI or a scalable API, I'm committed to crafting software that matters.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{n:30,s:"+",l:"Projects",icon:"🚀"},{n:4,s:"+",l:"Years Exp.",icon:"📅"},{n:20,s:"+",l:"Clients",icon:"😊"},{n:100,s:"%",l:"Commitment",icon:"🔥"}].map(s => (
                  <div key={s.l} className="stat-card p-6 rounded-2xl text-center cursor-default" style={{ background: "#111" }}>
                    <div className="text-3xl mb-3">{s.icon}</div>
                    <div className="font-black text-4xl text-gradient" style={{ fontFamily: "'Playfair Display', serif" }}><Counter target={s.n} suffix={s.s} /></div>
                    <div className="text-[9px] text-gray-600 mt-2 tracking-[3px] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-32 relative grid-bg">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(234,179,8,0.025) 0%,transparent 100%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative" ref={skillsRef}>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right,transparent,#eab308)" }} />
              <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>What I Know</span>
              <div className="h-px w-8" style={{ background: "linear-gradient(to left,transparent,#eab308)" }} />
            </div>
            <h2 className="font-black leading-none text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
              My <span className="text-gradient">Skills</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-1">
            {SKILLS.map((sk, i) => <SkillBar key={sk.name} skill={sk} delay={i * 120} inView={skillsInView} />)}
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-2.5">
            {["React","Node.js","MongoDB","Express","Angular","TypeScript","Tailwind","Git","PostgreSQL","Socket.io","JWT","REST APIs","Redux","Docker"].map(t => (
              <div key={t} className="tech-pill px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[2px] uppercase"
                style={{ background: "#111", color: "#6b7280", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Space Mono', monospace" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(234,179,8,0.4)"; e.currentTarget.style.color = "#eab308"; e.currentTarget.style.background = "rgba(234,179,8,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.background = "#111"; }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-32" style={{ background: "#0b0b0b" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right,transparent,#eab308)" }} />
              <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>Portfolio</span>
              <div className="h-px w-8" style={{ background: "linear-gradient(to left,transparent,#eab308)" }} />
            </div>
            <h2 className="font-black leading-none text-white mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-gray-600 text-xs tracking-widest uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>Drag or click arrows to explore</p>
          </div>
          <ProjectSlider />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 relative grid-bg">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 50% 110%,rgba(234,179,8,0.04) 0%,transparent 100%)" }} />
        <div className="max-w-xl mx-auto px-6 relative">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "linear-gradient(to right,transparent,#eab308)" }} />
              <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>Let's Talk</span>
              <div className="h-px w-8" style={{ background: "linear-gradient(to left,transparent,#eab308)" }} />
            </div>
            <h2 className="font-black leading-none text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)" }}>
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-gray-500 text-sm">Have a project in mind? Let's build something great together.</p>
          </div>

          <div className="rounded-3xl p-8" style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.05)" }}>
            <form onSubmit={handleSend} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[["Name","name","text","Mohamed Ahmed"],["Email","email","email","you@email.com"]].map(([label,key,type,ph]) => (
                  <div key={key}>
                    <label className="block text-[9px] font-bold tracking-[4px] uppercase mb-2" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>{label}</label>
                    <input type={type} required placeholder={ph} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})}
                      className="w-full px-4 py-3.5 rounded-xl text-sm text-gray-200 transition-all duration-300"
                      style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Outfit', sans-serif" }}
                      onFocus={e => { e.currentTarget.style.borderColor = "#eab308"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(234,179,8,0.25)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-[4px] uppercase mb-2" style={{ color: "#eab308", fontFamily: "'Space Mono', monospace" }}>Message</label>
                <textarea required rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl text-sm text-gray-200 resize-none transition-all duration-300"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Outfit', sans-serif" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#eab308"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(234,179,8,0.25)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <button type="submit"
                className="w-full py-4 font-black text-[11px] tracking-[4px] uppercase rounded-xl transition-all duration-400"
                style={{ background: sent ? "linear-gradient(135deg,#15803d,#22c55e)" : "linear-gradient(135deg,#d97706,#eab308)", color: "#0a0a0a", fontFamily: "'Space Mono', monospace", boxShadow: sent ? "0 0 30px rgba(34,197,94,0.4)" : "0 0 24px rgba(234,179,8,0.3)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
                {sent ? "✓  Message Sent!" : "Send Message  →"}
              </button>
            </form>
          </div>

          <div className="flex justify-center gap-10 mt-12">
            {[{l:"GitHub",i:"⌨️"},{l:"LinkedIn",i:"💼"},{l:"Mostaql",i:"🌐"},{l:"Email",i:"✉️"}].map(s => (
              <button key={s.l} className="social-btn flex flex-col items-center gap-2" style={{ color: "#4b5563" }}
                onMouseEnter={e => e.currentTarget.style.color = "#eab308"}
                onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}>
                <span style={{ fontSize: 22 }}>{s.i}</span>
                <span className="text-[9px] font-bold tracking-[3px] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>{s.l}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 text-center" style={{ borderTop: "1px solid rgba(234,179,8,0.06)" }}>
        <p className="text-[10px] text-gray-700 tracking-[3px] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
          © 2024 Mohamed · Built with <span style={{ color: "#eab308" }}>React</span> + <span style={{ color: "#eab308" }}>Tailwind</span>
        </p>
      </footer>

      <ScrollTopButton />
    </div>
  );
}
