import type { MovieListItem } from "@/lib/tmdb";

/** Tiny classNames joiner (no dependency). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function getTitle(item: { title?: string; name?: string; original_title?: string }): string {
  return item.title || item.name || item.original_title || "Untitled";
}

export function getYear(item: MovieListItem): string | null {
  const date = item.release_date || item.first_air_date;
  return date ? date.slice(0, 4) : null;
}

export function formatRating(vote?: number): string | null {
  return vote && vote > 0 ? vote.toFixed(1) : null;
}

export function formatRuntime(minutes?: number): string | null {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDate(date?: string): string {
  if (!date) return "Unknown";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function formatCurrency(value?: number): string | null {
  if (!value || value <= 0) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function formatCompact(value?: number): string | null {
  if (value == null) return null;
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}
