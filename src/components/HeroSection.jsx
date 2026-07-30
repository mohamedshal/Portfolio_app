import TypingText from "./TypingText";
import Particles from "./Particles";
import profileImage from "../images/WhatsApp Image 2023-07-06 at 11.14.46 AM.jpeg";
import cvFile from "../CV/Mohamed_Shalaby_ATS_Resume.docx";
import "./HeroSection.css";

export default function HeroSection({ onNavClick }) {
  const heroStickers = [
    { icon: "⚛️", className: "sticker-a" },
    { icon: "✨", className: "sticker-b" },
    { icon: "🚀", className: "sticker-c" },
    { icon: "💻", className: "sticker-d" },
    { icon: "🎯", className: "sticker-e" },
    { icon: "🧠", className: "sticker-f" },
  ];

  return (
    <section id="home" className="hero-section relative min-h-screen flex items-center">
      <Particles />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none hero-glow-a" />
      <div className="absolute bottom-1/4 left-1/5 w-[300px] h-[300px] rounded-full pointer-events-none hero-glow-b" />
      <div className="hero-stickers pointer-events-none" aria-hidden="true">
        {heroStickers.map((sticker) => (
          <span key={sticker.className} className={`hero-sticker ${sticker.className}`}>
            {sticker.icon}
          </span>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 order-2 lg:order-1 max-w-3xl">
            <div className="h1 flex items-center gap-3 mb-5">
              <div className="h-px w-10 hero-line" />
              <span className="hero-badge">Available for hire</span>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 hero-pulse" />
            </div>
            <h1 className="h2 hero-title">Hi, I&apos;m</h1>
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
            <div className="h5 mt-8 flex flex-wrap gap-4 mb-12">
              <button onClick={() => onNavClick("Projects")} className="hero-btn-primary">
                View Work
              </button>
              <button onClick={() => onNavClick("Contact")} className="hero-btn-secondary">
                Hire Me
              </button>
              <a href={cvFile} download className="hero-btn-secondary ">
                Download CV
              </a>
            </div>
            <div className="h6 flex gap-10">
              {[["15+", "Projects"], ["1+", "Years Exp"], ["100%", "Dedication"]].map(([n, l]) => (
                <div key={l} className="cursor-default group">
                  <div className="font-black text-3xl text-gradient transition-transform duration-300 group-hover:scale-110 origin-left">{n}</div>
                  <div className="text-[9px] text-gray-600 tracking-[3px] uppercase mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h4 order-1 lg:order-2 flex-shrink-0">
            <div className="relative hero-avatar-wrap">
              <div className="absolute -inset-10 rounded-full pointer-events-none hero-ring-a" />
              <div className="absolute -inset-20 rounded-full pointer-events-none hero-ring-b" />
              <div className="relative w-60 h-60 lg:w-80 lg:h-80 rounded-full overflow-hidden hero-avatar">
                <img src={profileImage} alt="Mohamed profile" className="hero-profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-[9px] tracking-[5px] uppercase text-yellow-500">Scroll</span>
        <div className="w-px h-14 scroll-line" />
      </div>
    </section>
  );
}
