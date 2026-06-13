"use client";

import MenuItem from "@/components/layout/MenuItem";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { FiCompass } from "react-icons/fi";

/**
 * Desktop primary navigation. Kept client-side so the react-icon references stay
 * on the client and are never serialized across the server -> client boundary.
 * On mobile, navigation lives in the hamburger drawer (MobileMenu) instead.
 */
export default function MainNav({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="Primary" className={className}>
      <MenuItem title="Home" address="/" Icon={AiFillHome} />
      <MenuItem title="Discover" address="/discover" Icon={FiCompass} />
      <MenuItem title="Favorites" address="/favorites" Icon={AiFillStar} />
    </nav>
  );
}
