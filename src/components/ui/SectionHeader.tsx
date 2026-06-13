import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function SectionHeader({
  title,
  subtitle,
  href,
  hrefLabel = "See all",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1 rounded-full bg-accent" aria-hidden />
          <h2 className="font-display text-2xl tracking-wide text-foreground sm:text-3xl">{title}</h2>
        </div>
        {subtitle && <p className="mt-1 pl-3.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          {hrefLabel}
          <FiChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
