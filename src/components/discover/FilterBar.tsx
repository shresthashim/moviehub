"use client";

import * as RSelect from "@radix-ui/react-select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiCheck, FiX } from "react-icons/fi";
import { SORT_OPTIONS } from "@/lib/constants";
import type { Genre } from "@/lib/tmdb";

// Radix Select forbids empty-string item values, so map "all/any" to a sentinel.
const ALL = "__all";

type Option = { value: string; label: string };

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
}) {
  return (
    <RSelect.Root value={value || ALL} onValueChange={(v) => onChange(v === ALL ? "" : v)}>
      <RSelect.Trigger
        aria-label={label}
        className="inline-flex h-10 min-w-[8.5rem] items-center justify-between gap-2 rounded-full border border-border bg-surface/70 pl-4 pr-3 text-sm font-medium text-foreground outline-none ring-accent/40 transition hover:border-accent/40 focus:border-accent/60 focus:ring-2 data-[state=open]:border-accent/60"
      >
        <RSelect.Value />
        <RSelect.Icon>
          <FiChevronDown className="size-4 text-muted transition-transform" />
        </RSelect.Icon>
      </RSelect.Trigger>

      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          sideOffset={6}
          className="glass z-[70] max-h-[18rem] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-border/60 shadow-card-hover data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in"
        >
          <RSelect.ScrollUpButton className="flex h-6 items-center justify-center text-muted">
            <FiChevronUp className="size-4" />
          </RSelect.ScrollUpButton>
          <RSelect.Viewport className="p-1.5">
            {options.map((o) => (
              <RSelect.Item
                key={o.value || ALL}
                value={o.value || ALL}
                className="relative flex cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-8 text-sm text-foreground outline-none transition-colors data-[highlighted]:bg-surface-2 data-[state=checked]:font-semibold data-[state=checked]:text-accent"
              >
                <RSelect.ItemText>{o.label}</RSelect.ItemText>
                <RSelect.ItemIndicator className="absolute right-2.5 inline-flex">
                  <FiCheck className="size-4" />
                </RSelect.ItemIndicator>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
          <RSelect.ScrollDownButton className="flex h-6 items-center justify-center text-muted">
            <FiChevronDown className="size-4" />
          </RSelect.ScrollDownButton>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
}

export default function FilterBar({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentGenre = params.get("with_genres") ?? "";
  const currentSort = params.get("sort_by") ?? "popularity.desc";
  const currentYear = params.get("year") ?? "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page"); // reset pagination when filters change
    router.push(next.toString() ? `${pathname}?${next.toString()}` : pathname);
  };

  const hasFilters = currentGenre || currentYear || currentSort !== "popularity.desc";

  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: thisYear - 1969 }, (_, i) => thisYear - i);

  const genreOptions: Option[] = [
    { value: "", label: "All genres" },
    ...genres.map((g) => ({ value: String(g.id), label: g.name })),
  ];
  const sortOptions: Option[] = SORT_OPTIONS.map((o) => ({ value: o.value, label: o.label }));
  const yearOptions: Option[] = [
    { value: "", label: "Any year" },
    ...years.map((y) => ({ value: String(y), label: String(y) })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Select label="Genre" value={currentGenre} options={genreOptions} onChange={(v) => update("with_genres", v)} />
      <Select label="Sort by" value={currentSort} options={sortOptions} onChange={(v) => update("sort_by", v)} />
      <Select label="Year" value={currentYear} options={yearOptions} onChange={(v) => update("year", v)} />

      {hasFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <FiX className="size-4" />
          Reset
        </button>
      )}
    </div>
  );
}
