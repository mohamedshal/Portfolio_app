import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/portfolioData";
import "./ProjectSlider.css";

export default function ProjectSlider() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [cardHover, setCardHover] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [modalProjectIndex, setModalProjectIndex] = useState(null);
  const autoRef = useRef(null);

  const go = useCallback(
    (delta) => {
      if (animating) return;
      setAnimating(true);
      setActive((i) => (i + delta + PROJECTS.length) % PROJECTS.length);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating],
  );

  useEffect(() => {
    if (hovered) {
      clearInterval(autoRef.current);
      return;
    }
    autoRef.current = setInterval(() => go(1), 4500);
    return () => clearInterval(autoRef.current);
  }, [go, hovered]);

  const project = PROJECTS[active];

  return (
    <>
      <div
        className="project-slider-shell"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={(e) => setDragStart(e.clientX)}
        onMouseUp={(e) => {
          if (dragStart && Math.abs(e.clientX - dragStart) > 60) {
            go(e.clientX < dragStart ? 1 : -1);
          }
          setDragStart(null);
        }}
      >
        <div
          className="project-card clickable"
          role="button"
          tabIndex={0}
          onClick={() => {
            setOpenProject(project);
            setModalProjectIndex(active);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpenProject(project);
              setModalProjectIndex(active);
            }
          }}
          style={{
            boxShadow: cardHover
              ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${project.accent}18`
              : "0 10px 40px rgba(0,0,0,0.5)",
          }}
          onMouseEnter={() => setCardHover(true)}
          onMouseLeave={() => setCardHover(false)}
        >
          <div className="project-watermark" style={{ color: project.accent }}>
            {project.num}
          </div>
          <div className="project-topline" style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }} />
          <div className="project-image-wrap">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="project-image-fallback">
                <span className="fallback-icon">{project.icon}</span>
                <span>Backend Project Preview</span>
              </div>
            )}
          </div>
          <p className="project-subtitle" style={{ color: project.accent }}>{project.subtitle}</p>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => <span key={tag} className="project-tag" style={{ color: project.accent, borderColor: `${project.accent}28` }}>{tag}</span>)}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between project-controls">
          <p className="project-counter">
            {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </p>
          <div className="project-dots">
            {PROJECTS.map((item, i) => (
              <button
                key={item.num}
                onClick={() => setActive(i)}
                className={`dot-btn ${i === active ? "active" : ""}`}
                style={{ borderColor: i === active ? project.accent : "rgba(255,255,255,0.18)" }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button className="slider-btn" onClick={() => go(-1)}>
              ←
            </button>
            <button className="slider-btn" onClick={() => go(1)}>
              →
            </button>
          </div>
        </div>
      </div>

      {openProject && modalProjectIndex !== null && (
        <div className="project-modal-overlay" onClick={() => setOpenProject(null)}>
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: `${PROJECTS[modalProjectIndex].accent}55` }}
          >
            <button className="project-modal-close" onClick={() => setOpenProject(null)} aria-label="Close popup">
              ×
            </button>

            {/* Navigation Arrows */}
            <button
              className="project-modal-nav-btn prev"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (modalProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
                setModalProjectIndex(newIndex);
                setOpenProject(PROJECTS[newIndex]);
              }}
              style={{ borderColor: `${PROJECTS[modalProjectIndex].accent}33` }}
              aria-label="Previous project"
            >
              ←
            </button>

            <button
              className="project-modal-nav-btn next"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = (modalProjectIndex + 1) % PROJECTS.length;
                setModalProjectIndex(newIndex);
                setOpenProject(PROJECTS[newIndex]);
              }}
              style={{ borderColor: `${PROJECTS[modalProjectIndex].accent}33` }}
              aria-label="Next project"
            >
              →
            </button>

            {/* Content Container */}
            <div className="project-modal-content">
              {PROJECTS[modalProjectIndex].image ? (
                <img
                  src={PROJECTS[modalProjectIndex].image}
                  alt={PROJECTS[modalProjectIndex].title}
                  className="project-modal-image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="project-image-fallback modal">
                  <span className="fallback-icon">{PROJECTS[modalProjectIndex].icon}</span>
                  <span>Backend Repository Project</span>
                </div>
              )}
              <p className="project-subtitle" style={{ color: PROJECTS[modalProjectIndex].accent }}>{PROJECTS[modalProjectIndex].subtitle}</p>
              <h3 className="project-title">{PROJECTS[modalProjectIndex].title}</h3>
              <p className="project-desc">{PROJECTS[modalProjectIndex].desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PROJECTS[modalProjectIndex].tags.map((tag) => (
                  <span key={tag} className="project-tag" style={{ color: PROJECTS[modalProjectIndex].accent, borderColor: `${PROJECTS[modalProjectIndex].accent}28` }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-modal-actions">
                <a href={PROJECTS[modalProjectIndex].projectUrl} target="_blank" rel="noreferrer" className="project-open-btn">
                  View Project
                </a>
                <a href={PROJECTS[modalProjectIndex].detailsUrl} target="_blank" rel="noreferrer" className="project-open-btn secondary">
                  View Details
                </a>
              </div>

              {/* Project Counter */}
              <div className="project-modal-counter">
                {String(modalProjectIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
