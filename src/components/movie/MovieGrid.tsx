import MovieCard from "@/components/movie/MovieCard";
import type { MovieListItem } from "@/lib/tmdb";

export default function MovieGrid({ movies }: { movies: MovieListItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie, i) => (
        <div key={movie.id} className="animate-fade-rise" style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}>
          <MovieCard movie={movie} priority={i < 5} />
        </div>
      ))}
    </div>
  );
}
