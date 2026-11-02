import { TIMELINE } from "../data/portfolioData";
import "./ExperienceSection.css";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <p className="eyebrow">Training &amp; development</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-sub">
            A practical path from JavaScript foundations to full-stack development.
          </p>
        </div>
        <div className="experience-list">
          {TIMELINE.map((item, index) => (
            <article
              key={`${item.year}-${item.title}`}
              className={`experience-item reveal${index ? ` reveal-d${Math.min(index, 5)}` : ""}`}
            >
              <p className="experience-year">{item.year}</p>
              <div className="experience-card">
                <h3 className="experience-title">{item.title}</h3>
                <p className="experience-description">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
