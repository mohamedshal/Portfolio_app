import useInView from "../hooks/useInView";
import { SKILLS } from "../data/portfolioData";
import SkillBar from "./SkillBar";
import "./SkillsSection.css";

export default function SkillsSection() {
  const [skillsRef, inView] = useInView(0.2);
  return (
    <section id="skills" className="skills-section">
      <div className="mx-auto max-w-6xl px-6 py-24" ref={skillsRef}>
        <h2 className="section-title text-center">My Skills</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={i * 120} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
