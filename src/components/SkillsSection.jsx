import { SKILLS } from "../data/portfolioData";
import SkillBar from "./SkillBar";
import "./SkillsSection.css";

const SKILL_CATEGORIES = [
  { name: "Frontend", title: "Frontend Development" },
  { name: "Language", title: "Programming Languages" },
  { name: "Backend", title: "Backend Development" },
  { name: "Database", title: "Databases" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section section--band skills-section">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <p className="eyebrow">Tools I work with</p>
          <h2 className="section-title">Skills</h2>
          <p className="section-sub">
            Technologies I use to build responsive interfaces and full-stack applications.
          </p>
        </div>
        <div className="skills-grid">
          {SKILL_CATEGORIES.map((category, index) => {
            const skills = SKILLS.filter((skill) => skill.cat === category.name);
            return (
              <article
                key={category.name}
                className={`skill-category reveal${index ? ` reveal-d${index}` : ""}`}
              >
                <h3 className="skill-category-title">{category.title}</h3>
                <ul className="skill-list">
                  {skills.map((skill) => (
                    <li key={skill.name}>
                      <SkillBar skill={skill} />
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
