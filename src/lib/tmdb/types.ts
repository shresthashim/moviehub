/** TMDB API response types (subset of fields the app renders). */

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieListItem {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
  media_type?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path?: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at?: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path?: string | null;
}

export interface WatchProviderRegion {
  link?: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

export interface WatchProviders {
  results: Record<string, WatchProviderRegion>;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: {
    rating?: number | null;
    avatar_path?: string | null;
  };
}

export interface MovieDetails extends MovieListItem {
  tagline?: string;
  runtime?: number;
  status?: string;
  revenue?: number;
  budget?: number;
  popularity?: number;
  homepage?: string | null;
  genres?: Genre[];
  credits?: Credits;
  videos?: { results: Video[] };
  recommendations?: Paginated<MovieListItem>;
  similar?: Paginated<MovieListItem>;
  "watch/providers"?: WatchProviders;
}
