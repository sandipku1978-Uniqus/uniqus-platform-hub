import { cn } from "@/lib/utils";
import type { PlatformCategory } from "@/types/platform";

const categoryStyles: Record<PlatformCategory, string> = {
  Enterprise:
    "bg-[var(--badge-enterprise)] text-[var(--badge-enterprise-text)] border-[var(--badge-enterprise-border)]",
  Intelligence:
    "bg-[var(--badge-intelligence)] text-[var(--badge-intelligence-text)] border-[var(--badge-intelligence-border)]",
  Personal:
    "bg-[var(--badge-personal)] text-[var(--badge-personal-text)] border-[var(--badge-personal-border)]",
  "Early Stage":
    "bg-[var(--badge-earlystage)] text-[var(--badge-earlystage-text)] border-[var(--badge-earlystage-border)]",
};

export function CategoryBadge({ category }: { category: PlatformCategory }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        categoryStyles[category]
      )}
    >
      {category}
    </span>
  );
}
