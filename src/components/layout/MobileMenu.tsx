"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { FiMenu, FiX, FiCompass, FiChevronRight } from "react-icons/fi";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchBox from "@/components/layout/SearchBox";
import Logo from "@/components/layout/Logo";

const LINKS = [
  { title: "Home", href: "/", Icon: AiFillHome },
  { title: "Discover", href: "/discover", Icon: FiCompass },
  { title: "Favorites", href: "/favorites", Icon: AiFillStar },
] as const;

/**
 * Mobile navigation drawer built on Radix Dialog — handles focus trapping,
 * scroll lock, Escape and ARIA for free. Hidden from md upward, where the inline
 * header nav (MainNav) takes over. Server pages stay untouched.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-accent/60 hover:text-accent md:hidden"
        >
          <FiMenu className="size-[1.15rem]" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in md:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="glass fixed inset-y-0 right-0 z-[60] flex h-full w-[82%] max-w-xs flex-col border-l border-border/60 shadow-card-hover focus:outline-none data-[state=closed]:animate-drawer-out data-[state=open]:animate-drawer-in md:hidden"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <Dialog.Title asChild>
              <Logo />
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                <FiX className="size-[1.15rem]" />
              </button>
            </Dialog.Close>
          </div>

          {/* Search */}
          <div className="border-b border-border/60 px-4 py-4">
            <SearchBox className="w-full" onSubmitted={close} />
          </div>

          {/* Nav links */}
          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1.5">
              {LINKS.map(({ title, href, Icon }, i) => {
                const active = isActive(href);
                return (
                  <li
                    key={href}
                    className={open ? "animate-fade-rise" : ""}
                    style={open ? { animationDelay: `${i * 60 + 120}ms` } : undefined}
                  >
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3.5 rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                        active ? "bg-accent/12 text-accent" : "text-foreground hover:bg-surface-2"
                      }`}
                    >
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-lg transition-colors ${
                          active ? "bg-accent/20 text-accent" : "bg-surface-2 text-muted group-hover:text-foreground"
                        }`}
                      >
                        <Icon className="size-5" />
                      </span>
                      {title}
                      <FiChevronRight
                        className={`ml-auto size-4 transition-all ${
                          active ? "text-accent" : "text-muted opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Auth footer */}
          <div className="border-t border-border/60 px-5 py-5">
            <SignedOut>
              <Link
                href="/sign-in"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
              >
                <FaUser className="size-3.5" />
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                      userButtonAvatar: "w-10 h-10 rounded-full",
                    },
                  }}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">Your account</p>
                  <p className="truncate text-xs text-muted">Manage profile &amp; sign out</p>
                </div>
              </div>
            </SignedIn>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
