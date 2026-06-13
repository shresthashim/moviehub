"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FiPlay, FiX } from "react-icons/fi";

export default function TrailerModal({ videoKey, label = "Watch trailer" }: { videoKey: string; label?: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
        >
          <FiPlay className="size-4 fill-accent-foreground" />
          {label}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[100] w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=closed]:animate-pop-out data-[state=open]:animate-pop-in"
        >
          <Dialog.Title className="sr-only">Trailer</Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close trailer"
              className="absolute -top-11 right-0 text-white/80 transition-colors hover:text-white"
            >
              <FiX className="size-7" />
            </button>
          </Dialog.Close>
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="size-full overflow-hidden rounded-xl border border-white/10 bg-black"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
