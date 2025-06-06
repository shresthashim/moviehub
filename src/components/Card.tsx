import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";

interface Result {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  overview: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

interface CardProps {
  result: Result;
}

const Card: React.FC<CardProps> = ({ result }) => {
  return (
    <div className='cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200 group'>
      <Link href={`/movie/${result.id}`}>
        <Image
          alt='Image'
          src={`https://image.tmdb.org/t/p/original/${result.backdrop_path || result.poster_path}`}
          width={500}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          className='sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200'
          placeholder='blur'
          blurDataURL='/spinner.svg'
        ></Image>

        <div className='p-2'>
          <p className='line-clamp-3 text-md'>{result.overview}</p>
          <h2 className='truncate text-lg font-bold'>{result.title || result.name}</h2>
          <p className='flex items-center'>
            <MdDateRange className='h-5 w-5 mr-1' />
            <span>{result.release_date || result.first_air_date}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
