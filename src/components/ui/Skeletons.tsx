
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

export function MovieRowSkeleton({ count = 7 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-hidden sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[42vw] shrink-0 sm:w-[170px]">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function TextSkeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded ${className}`} />;
}
