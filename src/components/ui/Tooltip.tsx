"use client";

import type { ReactNode } from "react";
import * as RT from "@radix-ui/react-tooltip";

/**
 * Thin wrapper over Radix Tooltip. Relies on a single <Tooltip.Provider/> mounted
 * at the app root (see Providers). `children` must be a single focusable element.
 */
export default function Tooltip({
  label,
  children,
  side = "top",
}: {
  label: string;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <RT.Root>
      <RT.Trigger asChild>{children}</RT.Trigger>
      <RT.Portal>
        <RT.Content
          side={side}
          sideOffset={6}
          className="z-[80] select-none rounded-md border border-border/60 bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground shadow-card data-[state=closed]:animate-pop-out data-[state=delayed-open]:animate-pop-in data-[state=instant-open]:animate-pop-in"
        >
          {label}
          <RT.Arrow className="fill-surface" />
        </RT.Content>
      </RT.Portal>
    </RT.Root>
  );
}
