import { cn } from "@/lib/utils";
import type { PlatformStatus } from "@/types/platform";

const statusStyles: Record<PlatformStatus, string> = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Beta: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "Coming Soon": "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
};

const dotColors: Record<PlatformStatus, string> = {
  Live: "bg-emerald-400",
  Beta: "bg-amber-400",
  "Coming Soon": "bg-zinc-400",
};

export function StatusBadge({ status }: { status: PlatformStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status]
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full", dotColors[status])}
      />
      {status}
    </span>
  );
}
