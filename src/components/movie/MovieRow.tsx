import MovieCard from "@/components/movie/MovieCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { MovieListItem } from "@/lib/tmdb";

export default function MovieRow({
  title,
  subtitle,
  href,
  movies,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  movies: MovieListItem[];
}) {
  if (!movies?.length) return null;

  return (
    <section>
      <SectionHeader title={title} subtitle={subtitle} href={href} />
      <div className="scrollbar-hide -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-4 sm:px-6">
        {movies.map((movie, i) => (
          <div key={movie.id} className="w-[40vw] shrink-0 snap-start sm:w-[170px] lg:w-[185px]">
            <MovieCard movie={movie} priority={i < 4} />
          </div>
        ))}
      </div>
    </section>
  );
}
