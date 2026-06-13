import type { Metadata } from "next";
import FaqAccordion from "@/components/ui/FaqAccordion";

export const metadata: Metadata = { title: "FAQ" };

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is MovieHub?",
    answer: "MovieHub is a movie-discovery platform showcasing trending, popular, top-rated, now-playing and upcoming films — with rich details, cast, trailers and reviews.",
  },
  {
    question: "How can I find a specific movie?",
    answer: "Use the search bar in the header on any page, or head to the Discover page to filter the entire catalogue by genre, release year and sort order.",
  },
  {
    question: "Where does the data come from?",
    answer: "All movie data, artwork, cast information and trailers are provided by the TMDB (The Movie Database) API.",
  },
  {
    question: "What can I see on a movie page?",
    answer: "Overview, rating and vote count, runtime, release date, revenue, genres, the top cast, a trailer, where to watch, plus recommended and similar titles.",
  },
  {
    question: "How do favorites work?",
    answer: "Sign in, then tap the heart on any movie. Your saved titles are stored to your account and appear on the Favorites page across every session and device.",
  },
  {
    question: "Is MovieHub free to use?",
    answer: "Yes. MovieHub is a free movie-discovery experience built on top of the free TMDB API.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-accent">Need help?</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide text-foreground sm:text-6xl">
          Frequently asked questions
        </h1>
      </div>

      <div className="mt-10">
        <FaqAccordion items={faqs} />
      </div>
    </div>
  );
}
