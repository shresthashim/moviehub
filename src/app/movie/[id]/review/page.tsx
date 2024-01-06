import React from 'react';

interface Review {
    id: number;
    author: string;
    content: string;
    created_at: string; // Change the type to the actual type of 'created_at'
}

interface ReviewPageProps {
    params: {
        id: string;
    };
}

const API_KEY = process.env.API_KEY;

const ReviewPage: React.FC<ReviewPageProps> = async ({params}) => {
    const movieId = params.id;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
    const review = await res.json();
    console.log(review);

    return (
        <div>
            <h2 className='text-lg mb-3 font-bold'>Reviews</h2>
            <div className='flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6'>
                {review.results.map((result: Review) => (
                    <div className='p-2' key={result.id}>
                        <h2 className='text-lg mb-3 font-bold'>{result.author}</h2>
                        <p className='text-lg mb-3'>
                            <span className='font-semibold mr-1'>Content :</span>
                            {result.content}
                        </p>
                        <p className='mb-3'>
                            <span className='font-semibold mr-1'>Date :</span>
                            {result.created_at}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;