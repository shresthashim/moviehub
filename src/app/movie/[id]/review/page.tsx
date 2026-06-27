import Link from "next/link";
import { FiCalendar, FiStar, FiArrowLeft, FiMessageSquare } from "react-icons/fi";
import { getMovieReviews } from "@/lib/tmdb";
import { formatDate } from "@/lib/utils";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = { title: "Reviews" };
export const revalidate = 1800;

interface ReviewPageProps {
  params: Promise<{ id: string }>;
}

const ReviewPage = async ({ params }: ReviewPageProps) => {
  const { id } = await params;
  const reviews = await getMovieReviews(id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/movie/${id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <FiArrowLeft className="size-4" />
        Back to movie
      </Link>

      <h1 className="font-display text-4xl tracking-wide text-foreground sm:text-5xl">Reviews</h1>
      <p className="mt-1 text-sm text-muted">
        {reviews.length > 0 ? `${reviews.length} community review${reviews.length > 1 ? "s" : ""}` : "Community reviews"}
      </p>

      {reviews.length === 0 ? (
        <div className="mt-10">
          <EmptyState icon={<FiMessageSquare />} title="No reviews yet" description="Be the first to discuss this title once reviews are available." />
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {reviews.map((review) => {
            const rating = review.author_details?.rating;
            return (
              <article
                key={review.id}
                className="rounded-2xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <header className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-lg text-accent">
                      {review.author.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <p className="flex items-center gap-1.5 text-xs text-muted">
                        <FiCalendar className="size-3" />
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                  {rating != null && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-sm font-semibold text-accent">
                      <FiStar className="size-3.5 fill-accent" />
                      {rating}
                    </span>
                  )}
                </header>
                <p className="whitespace-pre-line leading-relaxed text-foreground/90">{review.content}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
