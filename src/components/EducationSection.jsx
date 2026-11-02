import { EDUCATION } from "../data/portfolioData";
import "./EducationSection.css";

function EducationIcon() {
  return (
    <svg
      className="education-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.2V16c2.8 2.4 7.2 2.4 10 0v-4.8M21 9v6" />
    </svg>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <p className="eyebrow">Learning &amp; credentials</p>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="education-grid">
          {EDUCATION.map((item, index) => (
            <article
              key={item.title}
              className={`education-card reveal${index ? " reveal-d1" : ""}`}
            >
              <div className="education-card-heading">
                <span className="education-icon-wrap">
                  <EducationIcon />
                </span>
                <div>
                  <h3 className="education-title">{item.title}</h3>
                  <p className="education-subtitle">{item.subtitle}</p>
                </div>
              </div>
              <p className="education-institution">{item.institution}</p>
              <ul className="education-details" aria-label={`${item.title} details`}>
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
