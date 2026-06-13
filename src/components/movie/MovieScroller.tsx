import MovieCard from "@/components/movie/MovieCard";
import type { MovieListItem } from "@/lib/tmdb";

/**
 * Horizontal, snap-scrolling strip of movie cards. Stays within the parent
 * gutter (no negative-margin breakout) so the first card always keeps a clean
 * left gap that lines up with the section heading.
 */
export default function MovieScroller({ movies }: { movies: MovieListItem[] }) {
  if (!movies?.length) return null;

  return (
    <div className="scrollbar-hide flex snap-x gap-3 overflow-x-auto pb-2 sm:gap-4">
      {movies.map((movie, i) => (
        <div key={movie.id} className="w-[40vw] shrink-0 snap-start sm:w-[170px] lg:w-[185px]">
          <MovieCard movie={movie} priority={i < 4} />
        </div>
      ))}
    </div>
  );
}
