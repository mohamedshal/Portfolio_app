import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS } from "../data/portfolioData";
import ProjectDetails from "./ProjectDetails";
import "./ProjectCarousel.css";

/* Fan geometry mirrors the reference: the hero card fills the stage, the next
   items sit in a right-hand fan, and everything past the third slot is parked. */
const VISIBLE_FAN = 5;
const SWIPE_MIN_PX = 60;
const AUTOPLAY_MS = 4500;
const GLIDE_MS = 520;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const [gliding, setGliding] = useState(false);
  const [paused, setPaused] = useState(false);
  const [detailIndex, setDetailIndex] = useState(null);
  const dragRef = useRef(null);
  const glideTimerRef = useRef(null);

  const fan = useMemo(
    () =>
      PROJECTS.map((_, slot) => ({
        project: PROJECTS[(active + slot) % PROJECTS.length],
        index: (active + slot) % PROJECTS.length,
        slot,
      })),
    [active],
  );

  const go = useCallback(
    (delta) => {
      if (gliding) return;
      setGliding(true);
      clearTimeout(glideTimerRef.current);
      glideTimerRef.current = setTimeout(() => setGliding(false), GLIDE_MS);
      setActive((i) => (i + delta + PROJECTS.length) % PROJECTS.length);
    },
    [gliding],
  );

  const jumpTo = useCallback((index) => {
    setActive((current) => (current === index ? current : index));
  }, []);

  useEffect(() => () => clearTimeout(glideTimerRef.current), []);

  useEffect(() => {
    if (paused || detailIndex !== null || prefersReducedMotion()) return undefined;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [go, paused, detailIndex]);

  const openDetails = (index) => setDetailIndex(index);

  const closeDetails = () => {
    setDetailIndex((current) => {
      if (current !== null) setActive(current);
      return null;
    });
  };

  const onPointerDown = (event) => {
    dragRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event) => {
    const start = dragRef.current;
    if (!start) return;
    const delta = event.clientX - start.x;
    if (Math.abs(delta) >= SWIPE_MIN_PX) go(delta < 0 ? 1 : -1);
  };

  /* A swipe also fires a click when the pointer is released over the stage, so
     card activation has to tell the two apart. Keyboard clicks report detail 0. */
  const wasDragged = (event) => {
    const start = dragRef.current;
    if (!start || event.detail === 0) return false;
    return (
      Math.abs(event.clientX - start.x) > SWIPE_MIN_PX ||
      Math.abs(event.clientY - start.y) > 24
    );
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const project = PROJECTS[active];

  return (
    <>
      <div
        className="pc"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="pc-stage"
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragRef.current = null;
          }}
        >
          {fan.map(({ project: item, index, slot }) => {
            const pos = slot >= VISIBLE_FAN ? "parked" : String(slot);
            const isHero = slot === 0;
            const ProjectIcon = item.icon;
            return (
              <article
                key={item.num}
                className={`pc-item${isHero ? " pc-item--live" : ""}`}
                data-pos={pos}
                aria-hidden={slot > 0 || undefined}
                onClick={(event) => {
                  if (wasDragged(event)) return;
                  if (isHero) openDetails(index);
                  else if (pos !== "parked") jumpTo(index);
                }}
              >
                <div
                  className={`pc-media${item.image ? "" : " pc-media--empty"}`}
                >
                  {item.image ? (
                    <img
                      className="pc-shot"
                      src={item.image}
                      alt={item.title}
                      loading={isHero ? "eager" : "lazy"}
                      draggable={false}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="pc-media-fallback">
                      <span className="pc-fallback-icon" aria-hidden="true">
                        <ProjectIcon />
                      </span>
                      <span>Backend Project Preview</span>
                    </div>
                  )}
                </div>

                <div className="pc-body">
                  <span className="pc-num">{item.num}</span>
                  <p className="pc-subtitle">{item.subtitle}</p>
                  <h3 className="pc-title">{item.title}</h3>
                  <p className="pc-desc">{item.desc}</p>
                  <div className="pc-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="chip pc-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    className="pc-actions"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="btn btn--primary pc-action"
                      tabIndex={isHero ? 0 : -1}
                      onClick={() => openDetails(index)}
                    >
                      View Details
                    </button>
                    <a
                      className="btn btn--ghost pc-action"
                      href={item.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isHero ? 0 : -1}
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="pc-arrows">
            <button
              type="button"
              className="pc-arrow"
              onClick={() => go(-1)}
              aria-label="Previous project"
            >
              ◁
            </button>
            <button
              type="button"
              className="pc-arrow"
              onClick={() => go(1)}
              aria-label="Next project"
            >
              ▷
            </button>
          </div>

          <p className="pc-live" role="status" aria-live="polite">
            {project.title} — {String(active + 1).padStart(2, "0")} of{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </p>
        </div>

        <div className="pc-foot">
          <p className="pc-counter">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </p>
          <div className="pc-dots">
            {PROJECTS.map((item, index) => (
              <button
                key={item.num}
                type="button"
                className={`pc-dot${index === active ? " is-active" : ""}`}
                onClick={() => jumpTo(index)}
                aria-label={`Go to project ${index + 1}: ${item.title}`}
                aria-current={index === active || undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {detailIndex !== null && (
        <ProjectDetails
          projects={PROJECTS}
          index={detailIndex}
          onIndexChange={setDetailIndex}
          onClose={closeDetails}
        />
      )}
    </>
  );
}
