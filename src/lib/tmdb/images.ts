/** TMDB image URL construction with intent-based sizing. */

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

const IMAGE_SIZES = {
  posterSmall: "w342",
  poster: "w500",
  posterLarge: "w780",
  backdrop: "w1280",
  backdropSmall: "w780",
  profile: "w185",
  logo: "w154",
  original: "original",
} as const;

export type ImageIntent = keyof typeof IMAGE_SIZES;

/** Build a sized TMDB image URL, or return null when no path is available. */
export function tmdbImage(path?: string | null, intent: ImageIntent = "poster"): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${IMAGE_SIZES[intent]}${path}`;
}
