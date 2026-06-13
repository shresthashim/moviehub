"use client";

import type { ReactNode } from "react";
import * as Tabs from "@radix-ui/react-tabs";

export type MovieTab = { value: string; label: string; count?: number; content: ReactNode };

/**
 * Tabbed container for related movie strips (e.g. Recommended / More Like This).
 * The strips are server-rendered and passed in as `content`, so this stays a
 * thin client leaf around Radix Tabs.
 */
export default function MovieTabs({ tabs }: { tabs: MovieTab[] }) {
  if (!tabs.length) return null;

  return (
    <Tabs.Root defaultValue={tabs[0].value}>
      <Tabs.List className="mb-5 flex gap-6 border-b border-border" aria-label="Related movies">
        {tabs.map((t) => (
          <Tabs.Trigger
            key={t.value}
            value={t.value}
            className="group relative -mb-px flex items-center gap-2 border-b-2 border-transparent pb-3 font-display text-2xl tracking-wide text-muted outline-none transition-colors hover:text-foreground focus-visible:text-foreground data-[state=active]:border-accent data-[state=active]:text-foreground sm:text-3xl"
          >
            {t.label}
            {typeof t.count === "number" && (
              <span className="rounded-full bg-surface-2 px-2 py-0.5 font-sans text-xs font-semibold text-muted transition-colors group-data-[state=active]:bg-accent/15 group-data-[state=active]:text-accent">
                {t.count}
              </span>
            )}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((t) => (
        <Tabs.Content key={t.value} value={t.value} className="outline-none data-[state=active]:animate-fade-rise">
          {t.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
