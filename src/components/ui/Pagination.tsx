import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function Pagination({
  page,
  totalPages,
  params = {},
}: {
  page: number;
  totalPages: number;
  params?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const q = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) q.set(key, value);
    }
    q.set("page", String(p));
    return `?${q.toString()}`;
  };

  const base = "inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors";

  return (
    <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Pagination">
      {page > 1 ? (
        <Link href={href(page - 1)} className={cn(base, "text-foreground hover:border-accent/60 hover:text-accent")}>
          <FiChevronLeft className="size-4" />
          Previous
        </Link>
      ) : (
        <span className={cn(base, "cursor-not-allowed text-muted opacity-50")}>
          <FiChevronLeft className="size-4" />
          Previous
        </span>
      )}

      <span className="text-sm text-muted">
        Page <span className="font-semibold text-foreground">{page}</span> of {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={href(page + 1)} className={cn(base, "text-foreground hover:border-accent/60 hover:text-accent")}>
          Next
          <FiChevronRight className="size-4" />
        </Link>
      ) : (
        <span className={cn(base, "cursor-not-allowed text-muted opacity-50")}>
          Next
          <FiChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
