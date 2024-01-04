import React from 'react';

// @ts-ignore
const SearchPage = async ({params}) => {

    const searchTerm = params.searchTerm;

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&include_adult=false`);

    if (!res.ok) {
        throw new Error('Something went wrong');
    }

    const data = await res.json();
    const results = data.results;


    return (
        <div>
            haha
        </div>
    );
};

export default SearchPage;