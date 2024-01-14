import Link from "next/link";

export default function About() {
    return (
        <div className="max-w-6xl mx-auto space-y-4 p-4 text-center">
            <h1 className="text-4xl font-bold text-amber-600">Welcome to Our Movie World</h1>
            <p className="text-lg">
                Embark on a cinematic journey with us! We&apos;re a dedicated team of movie
                enthusiasts, committed to bringing you the best in the world of cinema.
            </p>

            <p className="text-lg">
                Discover a vast collection of movies from around the globe. Stay updated
                with the latest news, insightful reviews, and gripping trailers. Our
                constantly evolving movie database ensures you never miss out on the
                cinematic wonders.
            </p>

            <p className="text-lg">
                Dive into the world of movies by exploring our comprehensive database.
                Search for your favorites by title, director, actor, genre, or release
                date – finding the perfect movie for any mood has never been easier.
            </p>

            <p className="text-lg">
                Join our vibrant community, a place for movie lovers to connect, share
                thoughts, and discuss the latest releases. Engage in lively conversations,
                read reviews, and stay in the loop with the hottest news and trailers.
                Your passion for movies finds a home here!
            </p>

            <p className="text-lg">
                Thank you for being a part of our journey. Explore, connect, and enjoy
                the world of cinema. If you have any feedback or suggestions, we&apos;re
                eager to hear from you. Happy browsing!
            </p>

            <Link href="/"
                  className="bg-amber-600 text-white py-2 px-4 rounded-full inline-block mt-4 hover:bg-amber-700">
                Explore Movies
            </Link>
        </div>
    );
}
