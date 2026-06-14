/**
 * Custom next/image loader for TMDB.
 *
 * TMDB is already an image CDN that serves pre-sized JPEGs, so there's no need
 * to route images through Vercel's Image Optimization (which bills one
 * "transformation" per unique image/width/quality and quickly exhausts the free
 * tier on a poster-heavy site). This loader maps the requested width to the
 * nearest TMDB size token and returns a TMDB URL directly — responsive images,
 * zero Vercel transformations.
 *
 * All size tokens are valid for every TMDB image type (verified), so we can use
 * a single ladder without risking 404s.
 */
const TMDB_WIDTHS = [92, 154, 185, 300, 342, 500, 780, 1280] as const;

export default function tmdbImageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  // Pass non-TMDB sources through untouched.
  const match = src.match(/^(https?:\/\/image\.tmdb\.org\/t\/p\/)[^/]+(\/.+)$/);
  if (!match) return src;

  // Smallest token that covers the requested width; cap at w1280 to bound size.
  const best = TMDB_WIDTHS.find((w) => w >= width) ?? 1280;
  return `${match[1]}w${best}${match[2]}`;
}
