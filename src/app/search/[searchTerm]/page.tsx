import type { Metadata } from "next";
import { FiSearch } from "react-icons/fi";
import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/movie/MovieGrid";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";

export const revalidate = 3600;

interface SearchPageProps {
  params: Promise<{ searchTerm: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const { searchTerm } = await params;
  return { title: `Search · ${decodeURIComponent(searchTerm)}` };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { searchTerm } = await params;
  const { page: pageParam } = await searchParams;
  const term = decodeURIComponent(searchTerm);
  const page = Math.max(1, Number(pageParam) || 1);

  const data = await searchMovies(term, page);
  const totalPages = Math.min(data.total_pages, 500);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm uppercase tracking-widest text-accent">Search results</p>
      <h1 className="mt-1 font-display text-4xl tracking-wide text-foreground sm:text-5xl">&ldquo;{term}&rdquo;</h1>
      <p className="mt-2 text-sm text-muted">
        {data.total_results > 0 ? `${data.total_results.toLocaleString()} title${data.total_results > 1 ? "s" : ""} found` : "No matches"}
      </p>

      <div className="mt-8">
        {data.results.length > 0 ? (
          <MovieGrid movies={data.results} />
        ) : (
          <EmptyState
            icon={<FiSearch />}
            title={`No results for "${term}"`}
            description="Check the spelling or try searching for a different title."
          />
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
