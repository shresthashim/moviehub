import React from 'react';

// @ts-ignore
const Card = ({result}) => {
    return (
        <div
            className='cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
            {result.id}
        </div>
    );
};

export default Card;