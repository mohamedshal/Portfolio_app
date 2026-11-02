import { useEffect, useRef, useState } from "react";
import "./ProjectDetails.css";

/* Project details presentation follows src/theme/slide-details: the screenshots
   ride a wheel, and selecting a project turns the wheel so that project lands in
   the top slot while its copy reveals line by line. */
export default function ProjectDetails({ projects, index, onIndexChange, onClose }) {
  const cardRef = useRef(null);
  const restoreRef = useRef(null);
  const previousIndexRef = useRef(index);
  const total = projects.length;
  const project = projects[index];
  /* --pd-spin is kept unwound (…0, 1, 2 …) instead of wrapped, so the wheel
     always takes the short way round and never spins backwards past the band. */
  const [spin, setSpin] = useState(index + 1);

  const step = (delta) => onIndexChange((index + delta + total) % total);

  useEffect(() => {
    const raw = index - previousIndexRef.current;
    const half = total / 2;
    const delta = raw > half ? raw - total : raw < -half ? raw + total : raw;
    previousIndexRef.current = index;
    if (delta !== 0) setSpin((value) => value + delta);
  }, [index, total]);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    cardRef.current?.focus();
    return () => {
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="pd" onClick={onClose}>
      <div
        className="pd-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pd-title"
        tabIndex={-1}
        ref={cardRef}
        onClick={(event) => event.stopPropagation()}
        style={{ "--n": total, "--pd-spin": spin }}
      >
        <button type="button" className="pd-close" onClick={onClose} aria-label="Close details">
          ×
        </button>

        <div className="pd-wheel">
          <div className="pd-orbit">
            {projects.map((item, i) => (
              <div
                className="pd-spoke"
                key={item.num}
                data-active={i === index || undefined}
                style={{ "--i": i + 1 }}
              >
                <div className={`pd-tile${item.image ? "" : " pd-tile--empty"}`}>
                  {item.image ? (
                    <img
                      className="pd-shot"
                      src={item.image}
                      alt={`${item.title} preview`}
                      draggable={false}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="pd-tile-fallback">
                      <span className="pd-fallback-icon" aria-hidden="true">
                        <item.icon />
                      </span>
                      <span>Backend Project Preview</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pd-body" key={project.num}>
          <p className="pd-subtitle">{project.subtitle}</p>
          <h3 className="pd-title" id="pd-title">
            {project.title}
          </h3>
          <p className="pd-desc">{project.desc}</p>
          <div className="pd-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="chip pd-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="pd-actions">
            <a
              className="btn btn--primary pd-action"
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Project
            </a>
            <a
              className="btn btn--outline pd-action"
              href={project.detailsUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Details
            </a>
          </div>
        </div>

        <div className="pd-foot">
          <button
            type="button"
            className="pd-nav"
            onClick={() => step(-1)}
            aria-label="Previous project"
          >
            &#10094;
          </button>
          <p className="pd-counter">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            className="pd-nav"
            onClick={() => step(1)}
            aria-label="Next project"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
}
