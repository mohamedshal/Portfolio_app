import { useEffect, useState } from "react";
import "./TypingText.css";

export default function TypingText({ texts }) {
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[ti];
    let timeout;

    if (!deleting && ci <= current.length) {
      timeout = setTimeout(() => setCi((prev) => prev + 1), 65);
    } else if (deleting && ci >= 0) {
      timeout = setTimeout(() => setCi((prev) => prev - 1), 35);
    } else if (!deleting) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else {
      setDeleting(false);
      setTi((prev) => (prev + 1) % texts.length);
      setCi(0);
    }

    return () => clearTimeout(timeout);
  }, [ci, deleting, ti, texts]);

  return (
    <span className="typing-wrap">
      <span className="typing-text">{texts[ti].slice(0, ci)}</span>
      <span className="typing-caret" />
    </span>
  );
}
