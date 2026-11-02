import TypingText from "./TypingText";
import Particles from "./Particles";
import profileImage from "../images/WhatsApp Image 2023-07-06 at 11.14.46 AM.jpeg";
import CvDownloadButton from "./CvDownloadButton";
import {
  LuCode,
  LuTerminal,
  LuBraces,
  LuLayers,
  LuDatabase,
  LuCpu,
} from "../icons";
import "./HeroSection.css";

export default function HeroSection({ onNavClick }) {
  const heroStickers = [
    { Icon: LuCode, className: "sticker-a" },
    { Icon: LuTerminal, className: "sticker-b" },
    { Icon: LuBraces, className: "sticker-c" },
    { Icon: LuLayers, className: "sticker-d" },
    { Icon: LuDatabase, className: "sticker-e" },
    { Icon: LuCpu, className: "sticker-f" },
  ];

  const heroStats = [
    ["15+", "Projects"],
    ["1+", "Years Exp"],
    ["100%", "Dedication"],
  ];

  return (
    <section id="home" className="hero-section">
      <Particles />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none hero-glow-a" />
      <div className="absolute bottom-1/4 left-1/5 w-[300px] h-[300px] rounded-full pointer-events-none hero-glow-b" />
      <div className="hero-stickers pointer-events-none" aria-hidden="true">
        {heroStickers.map(({ Icon, className }) => (
          <span key={className} className={`hero-sticker ${className}`} aria-hidden="true">
            <Icon />
          </span>
        ))}
      </div>
      <div className="hero-inner container">
        <div className="hero-grid">
          <div className="hero-copy order-copy">
            <div className="h1 hero-status">
              <span className="hero-badge">Available for hire</span>
              <span className="hero-pulse" aria-hidden="true" />
            </div>
            <h1 className="h2 hero-eyebrow">Hi, I&apos;m</h1>
            <h1 className="h3 hero-name text-gradient-anim">Mohamed</h1>
            <div className="h3 hero-role">
              <TypingText
                texts={[
                  "Front-End Developer",
                  "React.js + Zustand",
                  "TypeScript Developer",
                  "Node.js and Express.js",
                ]}
              />
            </div>
            <p className="h4 hero-desc">
              Front-End Developer with over 1 year of hands-on training experience and 15+ completed projects.
              I build responsive, high-performance web applications using modern technologies.
            </p>
            <div className="h5 hero-actions">
              <button onClick={() => onNavClick("Projects")} className="btn btn--primary">
                View Work
              </button>
              <button onClick={() => onNavClick("Contact")} className="btn btn--outline">
                Hire Me
              </button>
              <CvDownloadButton />
            </div>
            <div className="h6 hero-stats">
              {heroStats.map(([n, l]) => (
                <div key={l} className="hero-stat">
                  <div className="hero-stat-value text-gradient">{n}</div>
                  <div className="hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h4 order-visual">
            <div className="relative hero-avatar-wrap">
              <div className="absolute -inset-10 rounded-full pointer-events-none hero-ring-a" />
              <div className="absolute -inset-20 rounded-full pointer-events-none hero-ring-b" />
              <div className="relative hero-avatar">
                <img src={profileImage} alt="Mohamed profile" className="hero-profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
