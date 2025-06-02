import React from "react";
import { FiCalendar, FiUser } from "react-icons/fi";

interface Review {
  id: number;
  author: string;
  content: string;
  created_at: string;
}

interface ReviewPageProps {
  params: {
    id: string;
  };
}

const API_KEY = process.env.API_KEY;

const ReviewPage: React.FC<ReviewPageProps> = async ({ params }) => {
  const movieId = params.id;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();

  const reviews: Review[] = data.results;

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <h2 className='text-3xl font-bold text-center mb-8'>Movie Reviews</h2>

      {reviews.length === 0 ? (
        <p className='text-center text-gray-500 dark:text-gray-400'>No reviews available for this movie.</p>
      ) : (
        <div className='space-y-6'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border dark:border-gray-700'
            >
              <div className='flex items-center text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400'>
                <FiUser className='mr-2' />
                {review.author}
              </div>

              <p className='text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-4 whitespace-pre-line'>
                {review.content}
              </p>

              <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                <FiCalendar className='mr-2' />
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
