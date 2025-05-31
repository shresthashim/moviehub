import React from "react";
import Card from "@/components/Card";

interface Result {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

interface ResultsProps {
  results: Result[];
}
const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div className='sm:grid sm:sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4'>
      {results.map((result: Result) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  );
};

export default Results;
