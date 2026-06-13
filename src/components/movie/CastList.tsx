import Image from "next/image";
import { FiUser } from "react-icons/fi";
import { tmdbImage, type CastMember } from "@/lib/tmdb";

export default function CastList({ cast }: { cast: CastMember[] }) {
  if (!cast.length) return null;

  return (
    <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
      {cast.map((person) => {
        const img = tmdbImage(person.profile_path, "profile");
        return (
          <figure key={`${person.id}-${person.character}`} className="w-[112px] shrink-0">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-surface-2">
              {img ? (
                <Image src={img} alt={person.name} fill sizes="112px" className="object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-muted">
                  <FiUser className="size-7" />
                </div>
              )}
            </div>
            <figcaption className="mt-2">
              <p className="truncate text-sm font-semibold text-foreground" title={person.name}>
                {person.name}
              </p>
              <p className="truncate text-xs text-muted" title={person.character}>
                {person.character}
              </p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
