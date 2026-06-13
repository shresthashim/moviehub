import { FiStar } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function RatingBadge({ value, className }: { value?: number; className?: string }) {
  if (!value || value <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs font-semibold text-accent backdrop-blur-sm",
        className
      )}
    >
      <FiStar className="size-3 fill-accent" />
      {value.toFixed(1)}
    </span>
  );
}
