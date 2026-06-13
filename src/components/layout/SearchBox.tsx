"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBox({
  className = "",
  onSubmitted,
}: {
  className?: string;
  /** Called after a successful search navigation — e.g. to close a drawer. */
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;
    router.push(`/search/${encodeURIComponent(query)}`);
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} role="search" className={`group relative ${className}`}>
      <FiSearch
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted transition-colors group-focus-within:text-accent"
      />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="search"
        aria-label="Search for a movie"
        placeholder="Search films…"
        className="h-10 w-full rounded-full border border-border bg-surface/70 pl-10 pr-9 text-sm text-foreground outline-none ring-accent/40 transition placeholder:text-muted focus:border-accent/60 focus:ring-2 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {input && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setInput("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
        >
          <FiX className="size-4" />
        </button>
      )}
    </form>
  );
}
