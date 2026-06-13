import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MainNav from "@/components/layout/MainNav";
import SearchBox from "@/components/layout/SearchBox";
import ThemeToggle from "@/components/layout/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="MovieHub home">
          <span className="grid size-9 place-items-center rounded-lg bg-accent font-display text-xl leading-none text-accent-foreground shadow-glow">
            M
          </span>
          <span className="font-display text-2xl tracking-wide text-foreground">
            Movie<span className="text-accent">Hub</span>
          </span>
        </Link>

        <MainNav className="hidden items-center gap-1 md:flex" />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <SearchBox className="hidden w-52 md:block lg:w-72" />
          <ThemeToggle />

          {/* Desktop auth */}
          <div className="hidden items-center gap-3 md:flex">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9",
                    userButtonAvatar: "w-9 h-9 rounded-full",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
              >
                <FaUser className="text-sm" />
                Sign in
              </Link>
            </SignedOut>
          </div>

          {/* Mobile hamburger drawer */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
