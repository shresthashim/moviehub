


// @ts-ignore

export default async function MoviePage({params}) {
    const movieId = params.id;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`)
    const movie = await res.json();
    return <div>
        <h1>{movie.title || movie.name}</h1>
    </div>;
}