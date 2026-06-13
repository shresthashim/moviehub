import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Link href="/" className="font-display text-2xl tracking-wide text-foreground">
            Movie<span className="text-accent">Hub</span>
          </Link>
          <p className="mt-1 max-w-sm text-sm text-muted">
            A cinematic movie-discovery platform. Browse, search and save the films you love.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" aria-label="Footer">
          <Link href="/discover" className="text-muted transition-colors hover:text-accent">
            Discover
          </Link>
          <Link href="/favorites" className="text-muted transition-colors hover:text-accent">
            Favorites
          </Link>
          <Link href="/about" className="text-muted transition-colors hover:text-accent">
            About
          </Link>
          <Link href="/faq" className="text-muted transition-colors hover:text-accent">
            FAQ
          </Link>
        </nav>
      </div>

      <div className="border-t border-border/60 py-5 text-center text-xs text-muted">
        Data &amp; imagery by{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-accent hover:underline"
        >
          TMDB
        </a>
        . This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );
}
