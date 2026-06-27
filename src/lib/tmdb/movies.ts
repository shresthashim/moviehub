import { tmdbFetch } from "./client";
import type {
  Credits,
  CrewMember,
  Genre,
  MovieDetails,
  MovieListItem,
  Paginated,
  Review,
  Video,
  WatchProviderRegion,
} from "./types";

/** Category list endpoints (excludes trending, which has its own shape). */
export const CATEGORY_ENDPOINTS = {
  popular: "movie/popular",
  top_rated: "movie/top_rated",
  now_playing: "movie/now_playing",
  upcoming: "movie/upcoming",
} as const;

export type Category = keyof typeof CATEGORY_ENDPOINTS;

export async function getTrending(window: "day" | "week" = "week"): Promise<MovieListItem[]> {
  const data = await tmdbFetch<Paginated<MovieListItem>>(`trending/movie/${window}`, { page: 1 }, 3600);
  return data.results ?? [];
}

export async function getMovies(category: Category): Promise<MovieListItem[]> {
  const data = await tmdbFetch<Paginated<MovieListItem>>(CATEGORY_ENDPOINTS[category], { page: 1 }, 9000);
  return data.results ?? [];
}

/**
 * Single-request movie detail using append_to_response — credits, videos,
 * recommendations, similar and watch providers all come back in one call.
 */
export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    return await tmdbFetch<MovieDetails>(
      `movie/${id}`,
      { append_to_response: "credits,videos,recommendations,similar,watch/providers" },
      9000
    );
  } catch {
    return null;
  }
}

export async function searchMovies(query: string, page = 1): Promise<Paginated<MovieListItem>> {
  return tmdbFetch<Paginated<MovieListItem>>("search/movie", { query, include_adult: false, page }, 3600);
}

export async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("genre/movie/list", {}, 86400);
  return data.genres ?? [];
}

export interface DiscoverFilters {
  with_genres?: string;
  sort_by?: string;
  year?: string;
  page?: number;
}

export async function discoverMovies(filters: DiscoverFilters): Promise<Paginated<MovieListItem>> {
  return tmdbFetch<Paginated<MovieListItem>>(
    "discover/movie",
    {
      sort_by: filters.sort_by || "popularity.desc",
      with_genres: filters.with_genres,
      primary_release_year: filters.year,
      include_adult: false,
      include_video: false,
      "vote_count.gte": 50,
      page: filters.page || 1,
    },
    3600
  );
}

export async function getMovieReviews(id: string): Promise<Review[]> {
  const data = await tmdbFetch<Paginated<Review>>(`movie/${id}/reviews`, {}, 1800);
  return data.results ?? [];
}

/* ── Selectors over detail payloads ─────────────────────────────────────── */

export function getDirector(credits?: Credits): CrewMember | undefined {
  return credits?.crew.find((member) => member.job === "Director");
}

export function getTopCast(credits?: Credits, limit = 12): Credits["cast"] {
  if (!credits) return [];
  return [...credits.cast].sort((a, b) => a.order - b.order).slice(0, limit);
}

/** Pick the most relevant YouTube trailer (official trailer > trailer > teaser). */
export function getBestTrailer(videos?: { results: Video[] }): Video | undefined {
  const yt = videos?.results.filter((v) => v.site === "YouTube") ?? [];
  return (
    yt.find((v) => v.type === "Trailer" && v.official) ||
    yt.find((v) => v.type === "Trailer") ||
    yt.find((v) => v.type === "Teaser") ||
    yt[0]
  );
}

export function getRegionProviders(
  details: MovieDetails,
  region = "US"
): WatchProviderRegion | undefined {
  return details["watch/providers"]?.results?.[region];
}
