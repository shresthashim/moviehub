"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type AddToFavProps = {
  movieId: string;
  title: string;
  image: string;
  overview: string;
  releaseDate: string;
  voteCount: number;
};

export default function Favorites({ movieId, title, image, overview, releaseDate, voteCount }: AddToFavProps) {
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (isLoaded && isSignedIn && user) {
      const favs = Array.isArray(user.publicMetadata?.favs) ? user.publicMetadata.favs : [];
      setIsFav(favs.includes(movieId));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [movieId, isLoaded, isSignedIn, user]);

  const handleFavClick = async () => {
    setIsLoading(true);
    if (!isSignedIn) {
      setIsLoading(false);
      router.push("/sign-in");
      return;
    }
    try {
      const res = await fetch("/api/user/fav", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          title,
          overview,
          releaseDate,
          voteCount,
          image,
        }),
      });

      if (res.ok) {
        setIsFav(!isFav);
      } else {
        console.error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFavClick}
        className={`px-4 mt-3 py-2 rounded-2xl font-medium transition-colors duration-200 shadow-sm 
      ${
        isFav
          ? "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      }
      disabled:opacity-50 disabled:cursor-not-allowed
    `}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
      </button>
    </div>
  );
}
