import { MovieRowSkeleton } from "@/components/ui/Skeletons";

export default function MovieLoading() {
  return (
    <div>
      <div className="skeleton h-[42vh] min-h-[280px] w-full md:h-[52vh]" />
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          <div className="mx-auto -mt-32 w-44 shrink-0 sm:w-56 md:mx-0 md:-mt-48 md:w-64">
            <div className="skeleton aspect-[2/3] w-full rounded-2xl" />
          </div>
          <div className="flex-1 space-y-4 md:pt-10">
            <div className="skeleton h-12 w-3/4 rounded" />
            <div className="skeleton h-5 w-1/2 rounded" />
            <div className="flex gap-2.5">
              <div className="skeleton h-8 w-20 rounded-full" />
              <div className="skeleton h-8 w-16 rounded-full" />
              <div className="skeleton h-8 w-24 rounded-full" />
            </div>
            <div className="skeleton h-24 w-full rounded" />
          </div>
        </div>
        <div className="mt-14">
          <MovieRowSkeleton />
        </div>
      </div>
    </div>
  );
}
