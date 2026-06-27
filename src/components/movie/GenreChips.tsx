import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Genre } from "@/lib/tmdb";

export default function GenreChips({ genres, asLinks = true }: { genres: Genre[]; asLinks?: boolean }) {
  if (!genres.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) =>
        asLinks ? (
          <Link
            key={g.id}
            href={`/discover?with_genres=${g.id}`}
            prefetch={false}
            className={cn(
              "rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-muted transition-colors",
              "hover:border-accent/50 hover:text-accent"
            )}
          >
            {g.name}
          </Link>
        ) : (
          <span key={g.id} className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
            {g.name}
          </span>
        )
      )}
    </div>
  );
}
