import type { Category } from "@/lib/tmdb";

/** Category rows rendered on the home page, in display order. */
export const HOME_SECTIONS: { category: Category; label: string; href: string }[] = [
  { category: "popular", label: "Popular", href: "/discover?sort_by=popularity.desc" },
  { category: "top_rated", label: "Top Rated", href: "/discover?sort_by=vote_average.desc" },
  { category: "now_playing", label: "Now Playing", href: "/discover?sort_by=primary_release_date.desc" },
  { category: "upcoming", label: "Upcoming", href: "/discover?sort_by=primary_release_date.desc" },
];

/** Sort options exposed in the Discover filter bar. */
export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "popularity.desc", label: "Most popular" },
  { value: "vote_average.desc", label: "Highest rated" },
  { value: "primary_release_date.desc", label: "Newest" },
  { value: "primary_release_date.asc", label: "Oldest" },
  { value: "revenue.desc", label: "Top grossing" },
];

export const WATCH_REGION = "US";
