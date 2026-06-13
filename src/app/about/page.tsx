import Link from "next/link";
import { FiSearch, FiStar, FiUsers, FiFilm } from "react-icons/fi";

export const metadata = { title: "About" };

const features = [
  { icon: FiFilm, title: "Vast catalogue", body: "Explore trending, top-rated, popular and now-playing titles, refreshed continuously from TMDB." },
  { icon: FiSearch, title: "Instant search", body: "Find any film by title in seconds and jump straight to its details and reviews." },
  { icon: FiStar, title: "Build favorites", body: "Save the films you love to your personal collection and pick up right where you left off." },
  { icon: FiUsers, title: "Community reviews", body: "Read what other viewers think before you commit your next two hours." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-accent">About MovieHub</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide text-foreground text-balance sm:text-6xl">
          Your gateway to the world of cinema
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
          MovieHub is built by film lovers, for film lovers. Discover a vast collection of movies from around the globe,
          stay current with the latest releases, dive into reviews, and curate a collection that&apos;s entirely your own.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
              <Icon className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
        >
          Explore movies
        </Link>
      </div>
    </div>
  );
}
