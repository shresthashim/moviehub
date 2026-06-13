"use client";

import Image from "next/image";
import { tmdbImage, type WatchProviderRegion } from "@/lib/tmdb";
import Tooltip from "@/components/ui/Tooltip";

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
          <Tooltip key={p.provider_id} label={p.provider_name}>
            <span className="block overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-transform hover:-translate-y-0.5">
              <Image src={logo} alt={p.provider_name} width={44} height={44} className="size-11 object-cover" />
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
}
