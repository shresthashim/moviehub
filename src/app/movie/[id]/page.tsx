// @ts-ignore
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {FiCalendar, FiStar, FiTrendingUp, FiClock, FiCheckCircle, FiDollarSign} from 'react-icons/fi';

// @ts-ignore
export default async function MoviePage({params}) {
    const movieId = params.id;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`)
    const movie = await res.json();

    return (
        <div className='w-full'>

            <div
                className='py-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6'>
                <Image alt="The Godfather Poster"
                       src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                       width={300} height={450}
                       style={{
                           maxWidth: '100%',
                           height: '100%',
                       }}
                       className='rounded-lg shadow-md'
                       placeholder='blur'
                       blurDataURL='/spinner.svg'
                />
                <div className='p-2 flex flex-col'>
                    <h2 className='text-2xl md:text-3xl mb-3 font-bold'>{movie.title || movie.name}</h2>

                    <p className='text-lg mb-3'>{movie.tagline}</p>
                    <p className='text-lg mb-3'>{movie.overview}</p>

                    <div className='mb-3 flex items-center'>
                        <span className='font-semibold mr-2'><FiCalendar/></span>
                        <span className='font-semibold'>Release Date :</span>{' '}
                        {new Date(movie.release_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                    <div className='mb-3 flex items-center'>
                        <span className='font-semibold mr-2'><FiStar/></span>
                        <span className='font-semibold'>Rating :</span> {movie.vote_average} / 10
                        ({movie.vote_count} votes)
                    </div>
                    <div className='mb-3 flex items-center'>
                        <span className='font-semibold mr-2'><FiTrendingUp/></span>
                        <span className='font-semibold'>Popularity :</span> {movie.popularity}
                    </div>
                    <div className='mb-3 flex items-center'>
                        <span className='font-semibold mr-2'><FiDollarSign/></span>
                        <span className='font-semibold'>Revenue :</span> ${movie.revenue.toLocaleString()}
                    </div>
                    <div className='mb-3 flex items-center'>
                        <span className='font-semibold mr-2'><FiClock/></span>
                        <span className='font-semibold'>Runtime :</span> {movie.runtime} minutes
                    </div>
                    <div className='mb-3 flex items-center'>
                        <span className='font-semibold mr-2'><FiCheckCircle/></span>
                        <span className='font-semibold'>Status :</span> {movie.status === 'Released' ?
                        <span className="text-green-500">Released</span> :
                        <span className="text-red-500">{movie.status}</span>}
                    </div>
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
