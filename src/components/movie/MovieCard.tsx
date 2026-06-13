import Link from "next/link";
import Image from "next/image";
import { FiFilm } from "react-icons/fi";
import { tmdbImage, type MovieListItem } from "@/lib/tmdb";
import { getTitle, getYear } from "@/lib/utils";
import RatingBadge from "@/components/ui/RatingBadge";

export default function MovieCard({ movie, priority = false }: { movie: MovieListItem; priority?: boolean }) {
  const title = getTitle(movie);
  const year = getYear(movie);
  const image = tmdbImage(movie.poster_path ?? movie.backdrop_path, "poster");

  return (
    <Link href={`/movie/${movie.id}`} className="group block focus:outline-none">
      <article className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-surface-2 shadow-card transition-all duration-300 ease-out-expo group-hover:-translate-y-1.5 group-hover:border-accent/50 group-hover:shadow-card-hover group-focus-visible:ring-2 group-focus-visible:ring-accent">
        {image ? (
          <Image
            alt={`${title} poster`}
            src={image}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-muted">
            <FiFilm className="size-8" />
            <span className="text-xs">No artwork</span>
          </div>
        )}

        <RatingBadge value={movie.vote_average} className="absolute right-2 top-2" />

        <div className="absolute inset-x-0 bottom-0 bg-poster-fade p-3 pt-12">
          <h3 className="truncate font-semibold leading-tight text-white" title={title}>
            {title}
          </h3>
          <div className="mt-1 flex items-center justify-between text-xs text-white/70">
            {year && <span>{year}</span>}
            <span className="font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
