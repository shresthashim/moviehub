import { MovieGridSkeleton } from "@/components/ui/Skeletons";

export default function DiscoverLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="skeleton mb-2 h-4 w-24 rounded" />
      <div className="skeleton mb-6 h-12 w-80 max-w-full rounded" />
      <div className="mb-6 flex gap-2.5">
        <div className="skeleton h-10 w-32 rounded-full" />
        <div className="skeleton h-10 w-32 rounded-full" />
        <div className="skeleton h-10 w-28 rounded-full" />
      </div>
      <MovieGridSkeleton count={15} />
    </div>
  );
}
