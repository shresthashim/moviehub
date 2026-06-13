"use client";

import { MdLightMode } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import Tooltip from "@/components/ui/Tooltip";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDark = resolvedTheme === "dark";
  const canToggle = mounted && resolvedTheme !== undefined;
  const label = canToggle && isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip label={label}>
      <button
        type="button"
        onClick={() => canToggle && setTheme(isDark ? "light" : "dark")}
        aria-label={label}
        className="grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition-colors hover:border-accent/60 hover:text-accent"
      >
        {canToggle ? (
          isDark ? (
            <MdLightMode className="size-[1.15rem]" />
          ) : (
            <BsFillMoonStarsFill className="size-[1.05rem]" />
          )
        ) : (
          <span className="size-[1.05rem]" />
        )}
      </button>
    </Tooltip>
  );
}
