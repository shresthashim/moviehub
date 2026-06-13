import Hero from "@/components/movie/Hero";
import MovieRow from "@/components/movie/MovieRow";
import GenreChips from "@/components/movie/GenreChips";
import SectionHeader from "@/components/ui/SectionHeader";
import { getTrending, getMovies, getMovieDetails, getGenres, getBestTrailer, type Category, type MovieListItem } from "@/lib/tmdb";
import { HOME_SECTIONS } from "@/lib/constants";

export default async function Home() {
  const [trending, popular, topRated, nowPlaying, upcoming, genres] = await Promise.all([
    getTrending("week"),
    getMovies("popular"),
    getMovies("top_rated"),
    getMovies("now_playing"),
    getMovies("upcoming"),
    getGenres(),
  ]);

  const featured = trending[0];
  // One extra request enriches the hero with genres + a playable trailer.
  const featuredDetails = featured ? await getMovieDetails(String(featured.id)) : null;
  const trailer = featuredDetails ? getBestTrailer(featuredDetails.videos) : undefined;

  const rowsByCategory: Record<Category, MovieListItem[]> = {
    popular,
    top_rated: topRated,
    now_playing: nowPlaying,
    upcoming,
  };

  return (
    <div>
      {featured && (
        <Hero
          movie={featured}
          genres={featuredDetails?.genres ?? []}
          trailerKey={trailer?.key}
          eyebrow="Featured · Trending"
        />
      )}

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6">
        <MovieRow
          title="Trending This Week"
          subtitle="What everyone's watching right now"
          href="/discover?sort_by=popularity.desc"
          movies={trending}
        />

        {HOME_SECTIONS.map((section) => (
          <MovieRow
            key={section.category}
            title={section.label}
            href={section.href}
            movies={rowsByCategory[section.category]}
          />
        ))}

        <section>
          <SectionHeader title="Browse by Genre" subtitle="Jump straight into a mood" />
          <GenreChips genres={genres} />
        </section>
      </div>
    </div>
  );
}
