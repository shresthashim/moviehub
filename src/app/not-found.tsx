import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className='flex flex-col mt-4 justify-center items-center px-4 text-center max-w-3xl mx-auto'>
      <h1 className='text-9xl font-extrabold text-amber-500 mb-6 select-none'>404</h1>
      <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Page Not Found</h2>
      <p className='mb-6 text-gray-300'>Sorry, we couldn’t find the page you’re looking for.</p>
      <Link href='/'>
        <span className='inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'>
          Go Back Home
        </span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
