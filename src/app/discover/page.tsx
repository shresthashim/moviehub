import { Suspense } from "react";
import type { Metadata } from "next";
import { FiSearch } from "react-icons/fi";
import { discoverMovies, getGenres } from "@/lib/tmdb";
import FilterBar from "@/components/discover/FilterBar";
import MovieGrid from "@/components/movie/MovieGrid";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Discover",
  description: "Filter and sort thousands of films by genre, rating, year and popularity.",
};

type DiscoverPageProps = {
  searchParams: Promise<{ with_genres?: string; sort_by?: string; year?: string; page?: string }>;
};

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const [genres, data] = await Promise.all([
    getGenres(),
    discoverMovies({ with_genres: sp.with_genres, sort_by: sp.sort_by, year: sp.year, page }),
  ]);

  const totalPages = Math.min(data.total_pages, 500);
  const activeGenre = sp.with_genres ? genres.find((g) => String(g.id) === sp.with_genres) : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header>
        <p className="text-sm uppercase tracking-widest text-accent">Discover</p>
        <h1 className="mt-1 font-display text-5xl tracking-wide text-foreground sm:text-6xl">
          {activeGenre ? `${activeGenre.name} Films` : "Find your next watch"}
        </h1>
      </header>

      <div className="mt-6">
        <Suspense fallback={<div className="h-10" />}>
          <FilterBar genres={genres} />
        </Suspense>
      </div>

      <p className="mt-4 text-sm text-muted">{data.total_results.toLocaleString()} titles</p>

      <div className="mt-6">
        {data.results.length > 0 ? (
          <MovieGrid movies={data.results} />
        ) : (
          <EmptyState
            icon={<FiSearch />}
            title="No films match these filters"
            description="Try widening your search — remove a filter or pick a different genre."
          />
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        params={{ with_genres: sp.with_genres, sort_by: sp.sort_by, year: sp.year }}
      />
    </div>
  );
}
