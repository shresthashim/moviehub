import { TextSkeleton } from "@/components/ui/Skeletons";

function ReviewCardSkeleton({ lines }: { lines: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="skeleton size-10 shrink-0 rounded-full" />
          <div className="space-y-2">
            <TextSkeleton className="h-4 w-28" />
            <TextSkeleton className="h-3 w-20" />
          </div>
        </div>
        <TextSkeleton className="h-7 w-14 rounded-full" />
      </div>

      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, index) => (
          <TextSkeleton
            key={index}
            className={`h-4 ${index === lines - 1 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ReviewLoading() {
  return (
    <div
      className="mx-auto max-w-3xl px-4 py-10 sm:px-6"
      role="status"
      aria-label="Loading reviews"
    >
      <TextSkeleton className="mb-6 h-5 w-32" />
      <TextSkeleton className="h-12 w-44 sm:h-14" />
      <TextSkeleton className="mt-2 h-4 w-36" />

      <div className="mt-8 space-y-5">
        <ReviewCardSkeleton lines={4} />
        <ReviewCardSkeleton lines={6} />
        <ReviewCardSkeleton lines={3} />
      </div>
      <span className="sr-only">Loading community reviews</span>
    </div>
  );
}
