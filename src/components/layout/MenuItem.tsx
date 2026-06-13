"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type MenuItemProps = {
  title: string;
  address: string;
  Icon: React.ElementType;
};

export default function MenuItem({ title, address, Icon }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = address === "/" ? pathname === "/" : pathname.startsWith(address);

  return (
    <Link
      href={address}
      aria-current={isActive ? "page" : undefined}
      title={title}
      className={`group flex items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3 ${
        isActive ? "text-accent" : "text-muted hover:text-foreground"
      }`}
    >
      <Icon className="size-[1.05rem] shrink-0 transition-transform group-hover:scale-110 sm:size-4" />
      <span className="hidden sm:inline">{title}</span>
    </Link>
  );
}
