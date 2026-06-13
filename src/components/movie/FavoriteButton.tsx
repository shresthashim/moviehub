"use client";

import { useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FiHeart, FiLoader } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

export type FavoritePayload = {
  movieId: string;
  title: string;
  image: string;
  overview: string;
  releaseDate: string;
  voteCount: number;
  rating?: number;
};

export default function FavoriteButton({ movieId, title, image, overview, releaseDate, voteCount, rating = 0 }: FavoritePayload) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  // Source of truth derived from Clerk metadata (no setState-in-effect needed).
  const serverIsFav = useMemo(() => {
    if (!isLoaded || !isSignedIn || !user) return false;
    const favs = Array.isArray(user.publicMetadata?.favs) ? (user.publicMetadata.favs as string[]) : [];
    return favs.includes(movieId);
  }, [movieId, isLoaded, isSignedIn, user]);

  const [override, setOverride] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFav = override ?? serverIsFav;

  const handleClick = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setIsLoading(true);
    const previous = isFav;
    setOverride(!previous); // optimistic
    try {
      const res = await fetch("/api/user/fav", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId, title, overview, releaseDate, voteCount, rating, image }),
      });
      if (!res.ok) {
        setOverride(previous);
        console.error("Failed to update favorites");
      } else {
        // Refresh Clerk's client-side user so the derived state stays correct
        // after client-side navigation, then revalidate server components.
        await user?.reload();
        router.refresh();
      }
    } catch (error) {
      setOverride(previous);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || !isLoaded}
      aria-pressed={isFav}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all disabled:opacity-60 ${
        isFav
          ? "bg-rose-500/15 text-rose-400 hover:bg-rose-500/25"
          : "border border-border bg-surface/60 text-foreground hover:border-accent/60"
      }`}
    >
      {isLoading ? (
        <FiLoader className="size-4 animate-spin" />
      ) : isFav ? (
        <AiFillHeart className="size-4" />
      ) : (
        <FiHeart className="size-4" />
      )}
      {isFav ? "In favorites" : "Add to favorites"}
    </button>
  );
}
