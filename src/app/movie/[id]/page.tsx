import Image from "next/image";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FiStar, FiClock, FiCalendar, FiDollarSign, FiTrendingUp, FiFilm, FiMessageSquare, FiMonitor } from "react-icons/fi";
import {
  getMovieDetails,
  getTopCast,
  getDirector,
  getBestTrailer,
  getRegionProviders,
  tmdbImage,
} from "@/lib/tmdb";
import { getTitle, getYear, formatRating, formatRuntime, formatDate, formatCurrency, formatCompact } from "@/lib/utils";
import { WATCH_REGION } from "@/lib/constants";
import GenreChips from "@/components/movie/GenreChips";
import CastList from "@/components/movie/CastList";
import WatchProviders from "@/components/movie/WatchProviders";
import MovieScroller from "@/components/movie/MovieScroller";
import MovieTabs, { type MovieTab } from "@/components/movie/MovieTabs";
import TrailerModal from "@/components/movie/TrailerModal";
import FavoriteButton from "@/components/movie/FavoriteButton";
import SectionHeader from "@/components/ui/SectionHeader";

export const revalidate = 9000;

type MoviePageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) return { title: "Movie not found" };
  return { title: getTitle(movie), description: movie.overview?.slice(0, 160) };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) notFound();

  const title = getTitle(movie);
  const year = getYear(movie);
  const poster = tmdbImage(movie.poster_path ?? movie.backdrop_path, "posterLarge");
  const backdrop = tmdbImage(movie.backdrop_path ?? movie.poster_path, "backdrop");
  const rating = formatRating(movie.vote_average);
  const runtime = formatRuntime(movie.runtime);
  const director = getDirector(movie.credits);
  const cast = getTopCast(movie.credits, 14);
  const trailer = getBestTrailer(movie.videos);
  const providers = getRegionProviders(movie, WATCH_REGION);
  const recommendations = movie.recommendations?.results ?? [];
  const similar = movie.similar?.results ?? [];

  const relatedTabs: MovieTab[] = [
    recommendations.length > 0 && {
      value: "recommended",
      label: "Recommended",
      count: recommendations.length,
      content: <MovieScroller movies={recommendations} />,
    },
    similar.length > 0 && {
      value: "similar",
      label: "More Like This",
      count: similar.length,
      content: <MovieScroller movies={similar} />,
    },
  ].filter(Boolean) as MovieTab[];

  return (
    <div>
      {/* Backdrop band */}
      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden md:h-[52vh]">
        {backdrop ? (
          <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 bg-surface-2" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          {/* Poster */}
          <div className="mx-auto -mt-32 w-44 shrink-0 sm:w-56 md:mx-0 md:-mt-48 md:w-64">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-card-hover">
              {poster ? (
                <Image src={poster} alt={`${title} poster`} fill sizes="256px" priority className="object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-muted">
                  <FiFilm className="size-10" />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 md:pt-10">
            <h1 className="font-display text-4xl leading-[0.95] tracking-wide text-foreground text-balance sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {movie.tagline && <p className="mt-3 text-lg italic text-muted">{movie.tagline}</p>}

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {rating && (
                <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">
                  <FiStar className="size-3.5 fill-accent" />
                  {rating}
                  {movie.vote_count ? <span className="font-normal text-muted">({formatCompact(movie.vote_count)})</span> : null}
                </span>
              )}
              {year && <span className="rounded-full border border-border px-3 py-1 text-sm text-muted">{year}</span>}
              {runtime && (
                <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-muted">
                  <FiClock className="size-3.5" />
                  {runtime}
                </span>
              )}
              {movie.status && (
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    movie.status === "Released" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
                  }`}
                >
                  {movie.status}
                </span>
              )}
            </div>

            {director && (
              <p className="mt-4 text-sm text-muted">
                Directed by <span className="font-medium text-foreground">{director.name}</span>
              </p>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className="mt-4">
                <GenreChips genres={movie.genres} />
              </div>
            )}

            {movie.overview && (
              <p className="mt-6 max-w-2xl leading-relaxed text-foreground/90 text-pretty">{movie.overview}</p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {trailer && <TrailerModal videoKey={trailer.key} />}
              <FavoriteButton
                movieId={String(movie.id)}
                title={title}
                overview={movie.overview}
                releaseDate={movie.release_date ?? ""}
                voteCount={movie.vote_count ?? 0}
                rating={movie.vote_average ?? 0}
                image={movie.poster_path || movie.backdrop_path || ""}
              />
              <Link
                href={`/movie/${movie.id}/review`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
              >
                <FiMessageSquare className="size-4" />
                Reviews
              </Link>
            </div>

            {providers && (
              <div className="mt-8">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
                  <FiMonitor className="size-4" />
                  Where to watch
                </p>
                <WatchProviders region={providers} />
              </div>
            )}
          </div>
        </div>

        {/* Stat grid */}
        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          <Stat icon={<FiCalendar />} label="Release" value={formatDate(movie.release_date)} />
          <Stat icon={<FiClock />} label="Runtime" value={runtime ?? "N/A"} />
          <Stat icon={<FiDollarSign />} label="Revenue" value={formatCurrency(movie.revenue) ?? "N/A"} />
          <Stat icon={<FiTrendingUp />} label="Popularity" value={formatCompact(movie.popularity) ?? "N/A"} />
        </dl>

        {cast.length > 0 && (
          <section className="mt-14">
            <SectionHeader title="Top Cast" />
            <CastList cast={cast} />
          </section>
        )}

        {relatedTabs.length > 0 && (
          <section className="mt-14">
            <MovieTabs tabs={relatedTabs} />
          </section>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 bg-surface px-4 py-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
        <dd className="truncate font-semibold text-foreground">{value}</dd>
      </div>
    </div>
  );
}
