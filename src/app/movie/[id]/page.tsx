// @ts-ignore

import Image from "next/image";
import React from "react";

// @ts-ignore
export default async function MoviePage({params}) {
    const movieId = params.id;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`)
    const movie = await res.json();
    return <div className='w-full'>

        <div
            className='py-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6'>
            <Image alt="Image"
                   src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                   width={500} height={300}
                   style={
                       {
                           maxWidth: '100%',
                           height: '100%',
                       }
                   }
                   className='rounded-lg'
                   placeholder='blur'
                   blurDataURL='/spinner.svg'>

            </Image>

        </div>
    </div>;
}