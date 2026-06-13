import type { Metadata } from "next";
import { FiPlus } from "react-icons/fi";

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

      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            open={i === 0}
            className="group rounded-2xl border border-border bg-surface transition-colors open:border-accent/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
              <h2 className="text-base font-semibold text-foreground sm:text-lg">{faq.question}</h2>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-2 text-muted transition-all duration-300 group-open:rotate-45 group-open:bg-accent group-open:text-accent-foreground">
                <FiPlus className="size-4" />
              </span>
            </summary>
            <p className="px-6 pb-5 leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
