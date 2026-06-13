import { MovieGridSkeleton } from "@/components/ui/Skeletons";

export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="skeleton mb-2 h-4 w-28 rounded" />
      <div className="skeleton mb-3 h-10 w-64 max-w-full rounded" />
      <div className="skeleton mb-8 h-4 w-32 rounded" />
      <MovieGridSkeleton count={10} />
    </div>
  );
}
