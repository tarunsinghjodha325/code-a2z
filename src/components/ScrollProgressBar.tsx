"use client";
import { useEffect, useState } from "react";

/**
 * ScrollProgressBar
 * A tiny top-of-page progress indicator showing how far the user has scrolled.
 * - No extra deps
 * - Works with Tailwind if the project uses it (falls back to inline styles otherwise)
 * - Safe to render once near the app root/layout
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight || 1;
      setProgress(Math.min(100, Math.max(0, (el.scrollTop / max) * 100)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[1000] h-1 bg-transparent"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="h-full transition-[width] duration-100 ease-linear"
        style={{
          width: `${progress}%`,
          backgroundColor: "var(--a2z-accent, #22c55e)", // uses CSS var if present
        }}
      />
    </div>
  );
}
