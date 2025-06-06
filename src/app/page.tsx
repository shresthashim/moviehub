import Results from "@/components/Results";

const API_KEY = process.env.API_KEY;

interface HomeProps {
  searchParams: { genre?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const genre = searchParams.genre || "fetchTrending";

  const endpoint =
    genre === "fetchTopRated"
      ? "movie/top_rated"
      : genre === "fetchPopular"
      ? "movie/popular"
      : genre === "fetchNowPlaying"
      ? "movie/now_playing"
      : "trending/all/week";

  const res = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`, {
    next: { revalidate: 9000 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();

  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
