import { useCallback, useEffect, useRef, useState } from "react";
import cvFile from "../CV/Frontend_Resume.pdf";
import "./CvDownloadButton.css";

/* Timings measured from the reference capture (540x960, 30fps):
   click at 1.38s, ring unwinds for ~260ms, bar reaches 100% at 4.05s. */
const MORPH_MS = 260;
const RUN_MS = 2700;
const HOLD_MS = 2600;

export default function CvDownloadButton() {
  const [phase, setPhase] = useState("idle");
  const [status, setStatus] = useState("");

  const fillRef = useRef(null);
  const pctRef = useRef(null);
  const hiddenRef = useRef(null);
  const rafRef = useRef(0);
  const timersRef = useRef([]);
  const phaseRef = useRef("idle");

  const setPhaseBoth = (next) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const clearAll = () => {
    cancelAnimationFrame(rafRef.current);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const reset = useCallback(() => {
    clearAll();
    if (fillRef.current) fillRef.current.style.transform = "scaleX(0)";
    if (pctRef.current) pctRef.current.textContent = "0%";
    setPhaseBoth("idle");
    setStatus("");
  }, []);

  useEffect(() => reset, [reset]);

  const finish = useCallback(() => {
    if (fillRef.current) fillRef.current.style.transform = "scaleX(1)";
    if (pctRef.current) pctRef.current.textContent = "100%";
    setPhaseBoth("done");
    setStatus("Download complete.");
    /* Single, guarded download: only ever fired from the 100% frame. */
    hiddenRef.current?.click();
    timersRef.current.push(window.setTimeout(reset, HOLD_MS));
  }, [reset]);

  const start = useCallback(
    (event) => {
      event.preventDefault();
      if (phaseRef.current === "run" || phaseRef.current === "morph") return;

      clearAll();
      setPhaseBoth("morph");
      setStatus("Downloading CV.");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }

      const begin = performance.now();
      const tick = (now) => {
        const ratio = Math.min((now - begin) / RUN_MS, 1);
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${ratio})`;
        if (pctRef.current) pctRef.current.textContent = `${Math.round(ratio * 100)}%`;
        if (ratio < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          finish();
        }
      };

      timersRef.current.push(
        window.setTimeout(() => setPhaseBoth("run"), MORPH_MS)
      );
      /* rAF drives the smooth fill, but it stops firing in a backgrounded tab,
         which would strand the run at its current percent. This guard guarantees
         the sequence still completes exactly once. */
      timersRef.current.push(
        window.setTimeout(() => {
          if (phaseRef.current !== "done") finish();
        }, RUN_MS + 150)
      );
      rafRef.current = requestAnimationFrame(tick);
    },
    [finish]
  );

  const running = phase === "morph" || phase === "run";

  return (
    <span className="cv-dl" data-phase={phase}>
      <a
        href={cvFile}
        download="Frontend_Resume.pdf"
        className="cv-dl__ctl"
        onClick={start}
        aria-label="Download CV"
        aria-describedby="cv-dl-status"
      >
        <span className="cv-dl__idle">
          <span className="cv-dl__glyph" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M10.5 3h3v8h3L12 16.5 7.5 11h3z" />
              <path d="M7.5 18.5h9V20h-9z" />
            </svg>
          </span>
          <span className="cv-dl__label">Download CV</span>
        </span>

        <span className="cv-dl__ring" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M10.5 3h3v8h3L12 16.5 7.5 11h3z" />
            <path d="M7.5 18.5h9V20h-9z" />
          </svg>
        </span>

        <span className="cv-dl__chute" aria-hidden="true">
          <svg viewBox="-8.5 -8 40 62" focusable="false">
            <path d="M0 10 A11.5 10 0 0 1 23 10 Z" />
            <path d="M11.5 22.3 17.6 33.3 H15.4 V46 H7.6 V33.3 H5.4 Z" />
            <path
              className="cv-dl__lines"
              d="M0 10 11.5 22.3M11.5 10 11.5 22.3M23 10 11.5 22.3"
            />
            <path
              className="cv-dl__lines cv-dl__lines--inner"
              d="M5.75 10 11.5 22.3M17.25 10 11.5 22.3"
            />
          </svg>
        </span>

        <span className="cv-dl__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M4 12.5 9.5 18 20 6.5" />
          </svg>
        </span>

        <span className="cv-dl__word" aria-hidden="true">
          Complete
        </span>

        <span className="cv-dl__track" aria-hidden="true">
          <span className="cv-dl__fill" ref={fillRef} />
        </span>

        <span className="cv-dl__pct" ref={pctRef} aria-hidden="true">
          0%
        </span>
      </a>

      {running && (
        <button type="button" className="cv-dl__cancel" onClick={reset}>
          Cancel
        </button>
      )}

      <span id="cv-dl-status" className="cv-dl__status" role="status" aria-live="polite">
        {status}
      </span>

      <a
        ref={hiddenRef}
        href={cvFile}
        download="Frontend_Resume.pdf"
        className="cv-dl__trigger"
        tabIndex={-1}
        aria-hidden="true"
      />
    </span>
  );
}
