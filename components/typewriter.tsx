"use client";

import * as React from "react";

/**
 * Rotating typewriter line: types out each phrase, pauses, deletes it, then
 * moves to the next — cycling forever. Respects prefers-reduced-motion by
 * showing the first phrase statically.
 */
export function Typewriter({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const [text, setText] = React.useState("");
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (reduced || phrases.length === 0) return;

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = phrases[phraseIdx];
      charIdx += deleting ? -1 : 1;
      setText(word.slice(0, charIdx));

      let delay = deleting ? 45 : 90;
      if (!deleting && charIdx === word.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [phrases, reduced]);

  // Reserve space for the longest phrase so the line never grows/shrinks as it
  // types — prevents the rest of the page from shifting (layout jank).
  const longest = phrases.reduce(
    (a, b) => (b.length > a.length ? b : a),
    ""
  );

  return (
    <span className={`relative block ${className ?? ""}`}>
      {/* Invisible placeholder holds the height of the tallest phrase. */}
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      {/* Animated text overlays the reserved space. */}
      <span className="absolute inset-0" aria-live="polite">
        {reduced ? phrases[0] : text}
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block w-[0.06em] animate-pulse bg-current align-baseline"
          style={{ height: "0.9em" }}
        />
      </span>
    </span>
  );
}
