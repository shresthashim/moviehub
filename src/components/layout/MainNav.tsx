"use client";

import MenuItem from "@/components/layout/MenuItem";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { FiCompass } from "react-icons/fi";

/**
 * Primary navigation. Kept client-side so the react-icon references stay on the
 * client and are never serialized across the server -> client boundary.
 */
export default function MainNav() {
  return (
    <nav
      aria-label="Primary"
      className="order-3 flex w-full items-center justify-around gap-1 border-t border-border/60 pt-2 sm:order-none sm:w-auto sm:justify-start sm:border-0 sm:pt-0"
    >
      <MenuItem title="Home" address="/" Icon={AiFillHome} />
      <MenuItem title="Discover" address="/discover" Icon={FiCompass} />
      <MenuItem title="Favorites" address="/favorites" Icon={AiFillStar} />
    </nav>
  );
}
