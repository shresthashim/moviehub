import React from "react";
import Results from "@/components/Results";

// @ts-ignore
const SearchPage = async ({ params }) => {
  const searchTerm = params.searchTerm;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&include_adult=false`
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div>
      {results && results.length === 0 && <h1 className='text-2xl text-center pt-6'>No results found</h1>}

      {results && <Results results={results} />}
    </div>
  );
};

export default SearchPage;
