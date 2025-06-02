"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface NavbarItemProps {
  title: string;
  param: string;
}

const NavbarItem = ({ title, param }: NavbarItemProps) => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  const isActive = genre === param;

  return (
    <Link
      href={`/?genre=${param}`}
      className={`inline-block font-semibold px-2 py-1 text-sm sm:text-base md:text-lg hover:text-amber-600 ${
        isActive && "underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg"
      }`}
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
