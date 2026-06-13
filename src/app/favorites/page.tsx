import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { FiHeart } from "react-icons/fi";
import User, { type FavoriteMovie } from "@/lib/db/models/user";
import { connect } from "@/lib/db/mongoose";
import MovieGrid from "@/components/movie/MovieGrid";
import EmptyState from "@/components/ui/EmptyState";
import type { MovieListItem } from "@/lib/tmdb";

export const metadata: Metadata = { title: "Favorites" };
export const dynamic = "force-dynamic";

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm uppercase tracking-widest text-accent">Your collection</p>
      <h1 className="mt-1 font-display text-5xl tracking-wide text-foreground sm:text-6xl">Favorites</h1>
      <div className="mt-8">{children}</div>
    </div>
  );
}

const accentButton = "rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105";

export default async function FavoritesPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <PageShell>
        <EmptyState
          icon={<FiHeart />}
          title="Sign in to view your favorites"
          description="Save the films you love and find them here across every session."
          action={
            <Link href="/sign-in" className={accentButton}>
              Sign in
            </Link>
          }
        />
      </PageShell>
    );
  }

  let favs: FavoriteMovie[] = [];
  try {
    const mongoId = user.publicMetadata?.userMongoId;
    if (mongoId) {
      await connect();
      const dbUser = await User.findById(String(mongoId));
      favs = dbUser?.favoriteMovies ?? [];
    }
  } catch (error) {
    console.error("Failed to load favorites:", error);
  }

  if (favs.length === 0) {
    return (
      <PageShell>
        <EmptyState
          icon={<FiHeart />}
          title="No favorites yet"
          description="Browse the catalogue and tap the heart on any film to start your collection."
          action={
            <Link href="/discover" className={accentButton}>
              Discover films
            </Link>
          }
        />
      </PageShell>
    );
  }

  const movies: MovieListItem[] = favs.map((f) => ({
    id: Number(f.movieId) || 0,
    title: f.title,
    overview: f.description ?? "",
    poster_path: f.imageUrl ?? "",
    release_date: f.releaseDate ? new Date(f.releaseDate).toISOString().slice(0, 10) : "",
    vote_average: f.rating ?? 0,
  }));

  return (
    <PageShell>
      <p className="mb-6 -mt-4 text-sm text-muted">
        {movies.length} saved title{movies.length > 1 ? "s" : ""}
      </p>
      <MovieGrid movies={movies} />
    </PageShell>
  );
}
