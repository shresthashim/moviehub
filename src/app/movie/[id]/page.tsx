// @ts-ignore

import Image from "next/image";
import React from "react";
import Link from "next/link";

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
            <div className='p-2'>
                <h2 className='text-lg mb-3 font-bold'>{movie.title || movie.name}</h2>

                <p className='text-lg mb-3'><span className='font-semibold mr-1'>Overview :</span>{movie.overview}</p>
                <p className='mb-3'><span
                    className='font-semibold mr-1'>Date Released :</span>{movie.release_date || movie.first_air_date}
                </p> <p className='mb-3'><span
                className='font-semibold mr-1'>Rating :</span>{movie.vote_count}</p>
                <p className='mb-3'><span
                    className='font-semibold mr-1'>Popularity :</span>{movie.popularity}</p>
                <p className='mb-3'><span className='font-semibold mr-1'>Runtime :</span>{movie.runtime} minutes </p>

            </div>


        </div>
        <div className='flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6'>
            <Link href={`/movie/${movieId}/review`}>
                <button className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg my-2'>Check
                    reviews
                </button>
            </Link>
        </div>


    </div>
        ;
}