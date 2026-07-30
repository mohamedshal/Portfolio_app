import { useEffect, useState } from "react";
import "./SkillBar.css";

export default function SkillBar({ skill, delay, inView }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => setWidth(skill.level), delay);
    return () => clearTimeout(timeout);
  }, [delay, inView, skill.level]);

  return (
    <div className="skill-row">
      <div className="skill-head">
        <div className="flex items-center gap-2">
          <span><i className={skill.icon} style={{ fontSize: "26px" }}></i></span>
          <span className="skill-name">{skill.name}</span>
        </div>
        <span className="skill-level">{width}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
