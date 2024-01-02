


const API_KEY = process.env.API_KEY;
// @ts-ignore
export default async function Home({searchParams}) {
    const genre = searchParams.genre || 'fetchTrending';
    const res = await fetch(`https://api.themoviedb.org/3/movie/${genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"}?api_key=${API_KEY}&language=en-US&page=1`);



    return (


        <h1 className='text-4xl'>Home</h1>
    )
}
