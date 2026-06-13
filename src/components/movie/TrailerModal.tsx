"use client";

import { useEffect, useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";

export default function TrailerModal({ videoKey, label = "Watch trailer" }: { videoKey: string; label?: string }) {
  const [open, setOpen] = useState(false);

  // Subscribe to Escape + lock body scroll while open (effect subscribes to an
  // external system, which is the intended use of useEffect).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
      >
        <FiPlay className="size-4 fill-accent-foreground" />
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Trailer"
        >
          <div className="relative aspect-video w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close trailer"
              className="absolute -top-11 right-0 text-white/80 transition-colors hover:text-white"
            >
              <FiX className="size-7" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="size-full overflow-hidden rounded-xl border border-white/10 bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}
