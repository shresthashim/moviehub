import { HeroSkeleton, MovieRowSkeleton, TextSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading home page">
      <HeroSkeleton />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <MovieRowSkeleton key={index} withHeader />
        ))}

        <section>
          <div className="mb-5 space-y-2">
            <TextSkeleton className="h-7 w-48" />
            <TextSkeleton className="h-4 w-56" />
          </div>
          <div className="flex flex-wrap gap-2.5">
            {["w-20", "w-24", "w-16", "w-28", "w-20", "w-24", "w-16", "w-20", "w-28", "w-24"].map(
              (width, index) => (
                <TextSkeleton key={index} className={`h-10 ${width} rounded-full`} />
              ),
            )}
          </div>
        </section>
      </div>
      <span className="sr-only">Loading movies</span>
    </div>
  );
}
