import React from 'react';
import Link from "next/link";
import Image from "next/image";
// @ts-ignore
const Card = ({result}) => {
    return (
        <div
            className='cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200 group'>
            <Link href={`/movie/${result.id}`}>
                <Image alt="Image"
                       src={`https://image.tmdb.org/t/p/original/${result.backdrop_path || result.poster_path}`}
                       width={500} height={300}
                       style={
                           {
                               maxWidth: '100%',
                               height: 'auto',
                           }
                       }
                       className='sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200'
                       placeholder='blur'
                       blurDataURL='/spinner.svg'>

                </Image>

                <div className='p-2'>
                    <p className='line-clamp-4'>{result.overview}</p>
                </div>
            </Link>
        </div>
    );
};

export default Card;