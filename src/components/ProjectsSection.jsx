import ProjectCarousel from "./ProjectCarousel";
import "./ProjectsSection.css";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section section--band projects-section">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub projects-hint">Drag or click arrows to explore</p>
        </div>
        <div className="reveal reveal-d1">
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}
