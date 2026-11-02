import Counter from "./Counter";
import profileImage from "../images/WhatsApp Image 2023-07-06 at 11.14.46 AM.jpeg";
import "./AboutSection.css";

const STATS = [
  { n: 15, s: "+", l: "Projects" },
  { n: 1, s: "+", l: "Years learning" },
  { n: 1, s: "+", l: "Training track" },
  { n: 100, s: "%", l: "Commitment" },
];

export default function AboutSection() {
  return (
    <section id="about" className="section section--band about-section">
      <div className="container about-layout">
        <div className="about-story reveal">
          <p className="eyebrow">A little about me</p>
          <h2 className="section-title about-title">About Me</h2>
          <p className="about-intro">
            I&apos;m Mohamed, a front-end developer who enjoys turning ideas into
            thoughtful, responsive web experiences.
          </p>
          <p className="about-copy">
            I have over a year of hands-on training experience and have built
            more than 15 projects. I work mainly with JavaScript and React,
            alongside TypeScript, Redux Toolkit, Zustand, and modern CSS tools.
            <br />
            <br />
            I also have a foundation in Node.js and Express.js, which helps me
            connect polished interfaces to APIs and build full-stack projects.
            I learn by making practical things and improving them with each
            iteration.
          </p>
        </div>
        <figure className="about-portrait reveal reveal-d2">
          <img
            src={profileImage}
            alt="Mohamed Shalaby, front-end developer"
            className="about-portrait-image"
          />
          <figcaption className="about-portrait-caption">
            <span className="about-caption-name">Mohamed Shalaby</span>
            <span className="about-caption-role">Front-End Developer</span>
          </figcaption>
        </figure>
        <div className="about-stats reveal reveal-d3" aria-label="Career highlights">
          {STATS.map((item) => (
            <div key={item.l} className="stat-card">
              <div className="stat-number">
                <Counter target={item.n} suffix={item.s} />
              </div>
              <p className="stat-label">{item.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
