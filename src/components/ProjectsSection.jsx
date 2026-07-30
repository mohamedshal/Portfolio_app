import ProjectSlider from "./ProjectSlider";
import "./ProjectsSection.css";

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="section-title text-center">Featured Projects</h2>
        <p className="text-gray-600 text-xs tracking-widest uppercase text-center mt-2">Drag or click arrows to explore</p>
        <div className="mt-10">
          <ProjectSlider />
        </div>
      </div>
    </section>
  );
}
