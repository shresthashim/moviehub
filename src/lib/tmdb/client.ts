/**
 * Core TMDB request helper. Every TMDB call in the app goes through here so
 * auth, locale, query serialization and caching are defined in exactly one place.
 */

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

type QueryValue = string | number | boolean | undefined | null;

export async function tmdbFetch<T>(
  path: string,
  params: Record<string, QueryValue> = {},
  revalidate = 3600
): Promise<T> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Missing TMDB API_KEY environment variable.");
  }

  const search = new URLSearchParams({ api_key: apiKey, language: "en-US" });
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }

  const res = await fetch(`${TMDB_BASE_URL}/${path}?${search.toString()}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status}) for /${path}`);
  }

  return res.json() as Promise<T>;
}
