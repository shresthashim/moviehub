/**
 * MovieHub wordmark. A pure styled element (no link wrapper) so it can sit inside
 * a <Link> (header/footer) or a Dialog.Title (mobile drawer) interchangeably.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-2xl uppercase leading-none tracking-[0.16em] text-foreground sm:text-[1.7rem] ${className}`}
    >
      Movie
      <span className="bg-gradient-to-br from-amber-300 via-accent to-amber-500 bg-clip-text text-transparent">
        Hub
      </span>
    </span>
  );
}
