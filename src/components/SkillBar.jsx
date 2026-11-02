import "./SkillBar.css";

export default function SkillBar({ skill }) {
  const { icon: Icon, name, level } = skill;
  const isDevicon = typeof Icon === "string";

  return (
    <span className="skill-chip" title={`${name}: ${level}%`}>
      <span className="skill-icon" aria-hidden="true">
        {isDevicon ? <i className={Icon} /> : <Icon />}
      </span>
      <span className="skill-name">{name}</span>
      <span className="skill-level">{level}%</span>
    </span>
  );
}
