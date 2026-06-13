
export function CardSkeleton() {
  return <div className="skeleton aspect-[2/3] w-full rounded-xl" />;
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function MovieRowSkeleton({
  count = 7,
  withHeader = false,
}: {
  count?: number;
  withHeader?: boolean;
}) {
  return (
    <section>
      {withHeader && (
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <TextSkeleton className="h-7 w-44 sm:w-56" />
            <TextSkeleton className="h-4 w-56 max-w-[65vw]" />
          </div>
          <TextSkeleton className="hidden h-4 w-16 sm:block" />
        </div>
      )}
      <div className="flex gap-3 overflow-hidden sm:gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="w-[42vw] shrink-0 sm:w-[170px]">
            <CardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}

export function TextSkeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded ${className}`} />;
}

export function HeroSkeleton() {
  return (
    <section className="relative isolate flex min-h-[68vh] items-end overflow-hidden md:min-h-[80vh]">
      <div className="skeleton absolute inset-0 rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-36 sm:px-6 md:pb-20">
        <div className="max-w-2xl">
          <TextSkeleton className="h-7 w-40 rounded-full" />
          <div className="mt-5 space-y-3">
            <TextSkeleton className="h-12 w-[85%] sm:h-16 md:h-20" />
            <TextSkeleton className="h-12 w-[58%] sm:h-16 md:hidden" />
          </div>
          <div className="mt-5 flex gap-4">
            <TextSkeleton className="h-4 w-14" />
            <TextSkeleton className="h-4 w-10" />
          </div>
          <div className="mt-5 flex gap-2">
            <TextSkeleton className="h-8 w-20 rounded-full" />
            <TextSkeleton className="h-8 w-24 rounded-full" />
            <TextSkeleton className="h-8 w-16 rounded-full" />
          </div>
          <div className="mt-5 max-w-xl space-y-2.5">
            <TextSkeleton className="h-4 w-full" />
            <TextSkeleton className="h-4 w-[92%]" />
            <TextSkeleton className="h-4 w-[68%]" />
          </div>
          <div className="mt-7 flex gap-3">
            <TextSkeleton className="h-12 w-36 rounded-full" />
            <TextSkeleton className="h-12 w-36 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
