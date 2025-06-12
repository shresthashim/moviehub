"use client";

import Results from "@/components/Results";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Loading from "../loading";

type Fav = {
  movieId: string;
  title?: string;
  description?: string;
  releaseDate?: string;
  rating?: number;
  imageUrl?: string;
};

export default function Favorites() {
  const [results, setResults] = useState<Fav[] | null>(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/getFav", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data: { favs: Fav[] } = await res.json();
          setResults(data.favs);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && isSignedIn && user) {
      fetchData();
    }
  }, [isLoaded, isSignedIn, user]);
  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <div className='text-center mt-10'>
        <h1 className='text-xl my-5'>Please sign in to view your favorites</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='text-center pt-6'>
        <Loading />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <h1 className='text-center pt-6'>No results found</h1>;
  }

  return (
    <Results
      results={results.map((result) => ({
        id: Number(result.movieId) || 0,
        original_title: result.title ?? "",
        title: result.title ?? "",
        backdrop_path: result.imageUrl ?? "",
        overview: result.description ?? "",
        release_date: result.releaseDate ? result.releaseDate.substring(0, 10) : "",
      }))}
    />
  );
}
