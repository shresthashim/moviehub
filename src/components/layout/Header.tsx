import Link from "next/link";
import MainNav from "@/components/layout/MainNav";
import SearchBox from "@/components/layout/SearchBox";
import ThemeToggle from "@/components/layout/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import Logo from "@/components/layout/Logo";
import DesktopAuth from "@/components/layout/DesktopAuth";

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-90" aria-label="MovieHub home">
          <Logo />
        </Link>

        <MainNav className="hidden items-center justify-self-center gap-1 md:flex" />

        <div className="col-start-3 flex items-center gap-2 sm:gap-3">
          <SearchBox className="hidden w-52 md:block lg:w-72" />
          <ThemeToggle />

          <DesktopAuth />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
