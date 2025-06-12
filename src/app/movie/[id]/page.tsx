import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FiCalendar, FiStar, FiTrendingUp, FiClock, FiCheckCircle, FiDollarSign } from "react-icons/fi";
import Favorites from "@/components/Favorites";

type MoviePageProps = {
  params: {
    id: string;
  };
};

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = params.id;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`);
  const movie = await res.json();

  return (
    <div className='w-full  text-gray-800 dark:text-gray-100'>
      <div className='py-8 flex flex-col md:flex-row items-start max-w-6xl mx-auto px-4 md:space-x-8'>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <Image
            alt='Movie Poster'
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            width={500}
            height={750}
            className='rounded-xl shadow-lg w-full h-auto object-cover'
            placeholder='blur'
            blurDataURL='/spinner.svg'
          />
        </div>

        <div className='w-full md:w-2/3'>
          <h1 className='text-3xl md:text-4xl font-extrabold mb-4'>{movie.title || movie.name}</h1>
          <p className='italic text-lg text-gray-500 dark:text-gray-400 mb-4'>{movie.tagline}</p>
          <p className='text-base leading-relaxed mb-6'>{movie.overview}</p>

          <ul className='space-y-4'>
            <InfoItem icon={<FiCalendar />} label='Release Date'>
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown"}
            </InfoItem>

            <InfoItem icon={<FiStar />} label='Rating'>
              {movie.vote_average != null ? `${movie.vote_average} / 10` : "N/A"}{" "}
              <span className='ml-2'>({movie.vote_count != null ? `${movie.vote_count} votes` : "No votes"})</span>
            </InfoItem>

            <InfoItem icon={<FiTrendingUp />} label='Popularity'>
              {movie.popularity != null ? movie.popularity : "N/A"}
            </InfoItem>

            <InfoItem icon={<FiDollarSign />} label='Revenue'>
              {movie.revenue != null ? `$${movie.revenue.toLocaleString()}` : "N/A"}
            </InfoItem>

            <InfoItem icon={<FiClock />} label='Runtime'>
              {movie.runtime != null ? `${movie.runtime} minutes` : "N/A"}
            </InfoItem>

            <InfoItem icon={<FiCheckCircle />} label='Status'>
              {movie.status === "Released" ? (
                <span className='text-green-600 font-semibold'>Released</span>
              ) : (
                <span className='text-red-600 font-semibold'>{movie.status}</span>
              )}
            </InfoItem>
          </ul>

          <div className='mt-8'>
            <Link href={`/movie/${movieId}/review`}>
              <button className='bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-5 rounded-xl transition'>
                Check Reviews
              </button>
            </Link>
            <Favorites
              movieId={movieId}
              title={movie.title || movie.name}
              overview={movie.overview}
              releaseDate={movie.release_date}
              voteCount={movie.vote_count}
              image={movie.poster_path || movie.backdrop_path}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

function InfoItem({ icon, label, children }: InfoItemProps) {
  return (
    <li className='flex items-center'>
      <span className='text-lg text-blue-600 dark:text-blue-400 mr-2'>{icon}</span>
      <span className='font-semibold mr-2'>{label}:</span>
      <span>{children}</span>
    </li>
  );
}
