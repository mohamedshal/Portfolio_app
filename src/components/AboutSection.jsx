import Counter from "./Counter";
import { TIMELINE } from "../data/portfolioData";
import "./AboutSection.css";

const STATS = [
  { n: 15, s: "+", l: "Projects", icon: "🚀" },
  { n: 1, s: "+", l: "Years Exp.", icon: "📅" },
  { n: 1, s: "+", l: "Training Track", icon: "🎯" },
  { n: 100, s: "%", l: "Commitment", icon: "🔥" },
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-2">
        <div>
          <h2 className="section-title">About Me</h2>
          <div className="mt-8 space-y-6 border-l border-yellow-500/30 pl-6">
            {TIMELINE.map((item) => (
              <div key={item.year} className="tl-item">
                <p className="timeline-year">{item.year}</p>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="about-copy">
            Front-End Developer with over 1 year of hands-on training experience and 15+ completed projects.
            I specialize in building responsive, high-performance web applications using HTML, CSS, Bootstrap,
            Tailwind CSS, Sass, JavaScript, React.js, Redux Toolkit, and TypeScript.
            <br />
            <br />
            I also have a solid foundation in backend development with Node.js and Express.js to build and
            integrate full-stack solutions and APIs. I focus on delivering real functional projects and continuously
            improving my skills through practical work.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {STATS.map((item) => (
              <div key={item.l} className="stat-card">
                <div className="text-2xl">{item.icon}</div>
                <div className="stat-number">
                  <Counter target={item.n} suffix={item.s} />
                </div>
                <p className="stat-label">{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
