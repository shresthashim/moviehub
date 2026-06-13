export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <span className="size-10 animate-spin rounded-full border-[3px] border-border border-t-accent" />
    </div>
  );
}
