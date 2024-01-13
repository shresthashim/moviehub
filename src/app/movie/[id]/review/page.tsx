import React from 'react';
import {FiCalendar, FiUser} from 'react-icons/fi';

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
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`);
    const review = await res.json();
    console.log(review);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl mb-6 font-bold text-center">Movie Reviews</h2>
            <div className="space-y-6">
                {review.results.map((result: Review) => (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md" key={result.id}>
                        <h2 className="text-xl mb-3 font-bold flex items-center">
                            <FiUser className="mr-2"/>
                            {result.author}
                        </h2>
                        <p className="text-lg mb-3">
                            <span className="font-semibold mr-2">Content:</span>
                            {result.content}
                        </p>
                        <p className="text-sm flex items-center">
                            <span className="font-semibold mr-2">
                                <FiCalendar className="mr-1"/>
                                Date:
                            </span>
                            {new Date(result.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewPage;
