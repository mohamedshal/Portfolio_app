import { useEffect, useRef, useState } from "react";
import useInView from "../hooks/useInView";
import "./Counter.css";

export default function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;

    let frame = 0;
    const total = 80;
    const tick = () => {
      frame += 1;
      setCount(Math.round(target * (frame / total)));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span className="counter" ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
