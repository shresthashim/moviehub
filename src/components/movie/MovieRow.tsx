import MovieScroller from "@/components/movie/MovieScroller";
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
      <MovieScroller movies={movies} />
    </section>
  );
}
