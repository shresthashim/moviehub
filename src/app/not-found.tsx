import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-[8rem] leading-none tracking-wide text-accent sm:text-[11rem]">404</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Page not found</h1>
      <p className="mt-3 text-muted">Sorry, we couldn&apos;t find the page you were looking for.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
      >
        <FiArrowLeft className="size-4" />
        Back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
