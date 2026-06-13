"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiChevronDown, FiX } from "react-icons/fi";
import { SORT_OPTIONS } from "@/lib/constants";
import type { Genre } from "@/lib/tmdb";

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 cursor-pointer appearance-none rounded-full border border-border bg-surface/70 pl-4 pr-9 text-sm font-medium text-foreground outline-none ring-accent/40 transition focus:border-accent/60 focus:ring-2"
      >
        {children}
      </select>
      <FiChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </label>
  );
}

export default function FilterBar({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentGenre = params.get("with_genres") ?? "";
  const currentSort = params.get("sort_by") ?? "popularity.desc";
  const currentYear = params.get("year") ?? "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page"); // reset pagination when filters change
    router.push(next.toString() ? `${pathname}?${next.toString()}` : pathname);
  };

  const hasFilters = currentGenre || currentYear || currentSort !== "popularity.desc";

  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: thisYear - 1969 }, (_, i) => thisYear - i);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Select label="Genre" value={currentGenre} onChange={(v) => update("with_genres", v)}>
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g.id} value={String(g.id)}>
            {g.name}
          </option>
        ))}
      </Select>

      <Select label="Sort by" value={currentSort} onChange={(v) => update("sort_by", v)}>
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>

      <Select label="Year" value={currentYear} onChange={(v) => update("year", v)}>
        <option value="">Any year</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </Select>

      {hasFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <FiX className="size-4" />
          Reset
        </button>
      )}
    </div>
  );
}
