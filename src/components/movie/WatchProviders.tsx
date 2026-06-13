import Image from "next/image";
import { tmdbImage, type WatchProviderRegion } from "@/lib/tmdb";

export default function WatchProviders({ region }: { region?: WatchProviderRegion }) {
  const all = region ? [...(region.flatrate ?? []), ...(region.rent ?? []), ...(region.buy ?? [])] : [];
  const unique = Array.from(new Map(all.map((p) => [p.provider_id, p])).values());

  if (!unique.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {unique.map((p) => {
        const logo = tmdbImage(p.logo_path, "logo");
        if (!logo) return null;
        return (
          <span
            key={p.provider_id}
            title={p.provider_name}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
          >
            <Image src={logo} alt={p.provider_name} width={44} height={44} className="size-11 object-cover" />
          </span>
        );
      })}
    </div>
  );
}
