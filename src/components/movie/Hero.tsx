import Link from "next/link";
import Image from "next/image";
import { FiStar, FiInfo } from "react-icons/fi";
import { tmdbImage, type Genre, type MovieListItem } from "@/lib/tmdb";
import { getTitle, getYear, formatRating } from "@/lib/utils";
import TrailerModal from "@/components/movie/TrailerModal";
import GenreChips from "@/components/movie/GenreChips";

export default function Hero({
  movie,
  genres = [],
  trailerKey,
  eyebrow = "Featured",
}: {
  movie: MovieListItem;
  genres?: Genre[];
  trailerKey?: string;
  eyebrow?: string;
}) {
  const title = getTitle(movie);
  const year = getYear(movie);
  const backdrop = tmdbImage(movie.backdrop_path ?? movie.poster_path, "backdrop");
  const rating = formatRating(movie.vote_average);

  return (
    <section className="relative isolate flex min-h-[68vh] items-end overflow-hidden md:min-h-[80vh]">
      {backdrop ? (
        <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover object-top" />
      ) : (
        <div className="absolute inset-0 bg-surface-2" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-36 sm:px-6 md:pb-20">
        <div className="max-w-2xl animate-fade-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </span>

          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide text-foreground text-balance sm:text-6xl md:text-7xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            {rating && (
              <span className="flex items-center gap-1.5 font-semibold text-accent">
                <FiStar className="size-4 fill-accent" />
                {rating}
              </span>
            )}
            {year && <span>{year}</span>}
          </div>

          {genres.length > 0 && (
            <div className="mt-4">
              <GenreChips genres={genres.slice(0, 4)} asLinks={false} />
            </div>
          )}

          {movie.overview && (
            <p className="mt-4 max-w-xl leading-relaxed text-muted line-clamp-3 text-pretty">{movie.overview}</p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            {trailerKey && <TrailerModal videoKey={trailerKey} />}
            <Link
              href={`/movie/${movie.id}`}
              className={
                trailerKey
                  ? "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-accent/60"
                  : "inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
              }
            >
              <FiInfo className="size-4" />
              View details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
