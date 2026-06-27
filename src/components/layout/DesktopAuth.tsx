"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function DesktopAuth() {
  return (
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
  );
}
