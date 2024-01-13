// @ts-ignore
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {FiCalendar, FiStar, FiTrendingUp, FiClock, FiCheckCircle} from 'react-icons/fi';

// @ts-ignore
export default async function MoviePage({params}) {
    const movieId = params.id;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`)
    const movie = await res.json();

    return (
        <div className='w-full'>

            <div
                className='py-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6'>
                <Image alt="Image"
                       src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
                       width={500} height={300}
                       style={{
                           maxWidth: '100%',
                           height: '100%',
                       }}
                       className='rounded-lg'
                       placeholder='blur'
                       blurDataURL='/spinner.svg'
                />
                <div className='p-2 flex flex-col'>
                    <h2 className='text-lg mb-3 font-bold'>{movie.title || movie.name}</h2>

                    <p className='text-lg mb-3'><span className='font-semibold mr-1'>Overview :</span>{movie.overview}
                    </p>
                    <p className='mb-3 flex items-center'>
                        <span className='font-semibold mr-2'><FiCalendar/></span>
                        <span className='font-semibold'>Release Date :</span>{' '}
                        {movie.release_date || movie.first_air_date}
                    </p>
                    <p className='mb-3 flex items-center'><span className='font-semibold mr-1'><FiStar/></span>
                        {movie.vote_count}
                    </p>
                    <p className='mb-3 flex items-center'><span className='font-semibold mr-1'><FiTrendingUp/></span>
                        {movie.popularity}
                    </p>
                    <p className='mb-3 flex items-center'><span className='font-semibold mr-1'><FiClock/></span>
                        {movie.runtime} minutes
                    </p>
                    <p className='mb-3 flex items-center'><span className='font-semibold mr-1'><FiCheckCircle/></span>
                        {movie.status === 'Released' ? <span className="text-green-500">Released</span> :
                            <span className="text-red-500">{movie.status}</span>}
                    </p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6'>
                <Link href={`/movie/${movieId}/review`}>
                    <button className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg my-2'>
                        Check Reviews
                    </button>
                </Link>
            </div>
        </div>
    );
}
