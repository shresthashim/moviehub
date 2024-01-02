import Results from "@/components/Results";

const API_KEY = process.env.API_KEY;

// @ts-ignore
export default async function Home({searchParams}) {
    const genre = searchParams.genre || 'fetchTrending';
    const endpoint = genre === 'fetchTopRated' ? 'movie/top_rated' : 'trending/all/week';
    const res = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`, {next: {revalidate: 9000}});

    if (!res.ok) {
        throw new Error('Something went wrong');

    }

    const data = await res.json();

    const results = data.results;

    return (
        <div>

            <Results results={results}/>

        </div>
    );
}
