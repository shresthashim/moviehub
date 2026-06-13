"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-accent/10 text-accent">
        <FiAlertTriangle className="size-8" />
      </span>
      <h2 className="mt-6 text-2xl font-bold text-foreground">Something went wrong</h2>
      <p className="mt-2 text-muted">An unexpected error occurred. You can try again.</p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
      >
        <FiRefreshCw className="size-4" />
        Try again
      </button>
    </div>
  );
}
