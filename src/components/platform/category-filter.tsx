"use client";

import { cn } from "@/lib/utils";
import { categories } from "@/data/platforms";
import type { PlatformCategory } from "@/types/platform";

export function CategoryFilter({
  active,
  onChange,
}: {
  active: PlatformCategory | "All";
  onChange: (c: PlatformCategory | "All") => void;
}) {
  const items: (PlatformCategory | "All")[] = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
            active === cat
              ? "bg-brand-primary text-white border-brand-primary"
              : "bg-card text-muted border-border hover:border-border-hover hover:text-foreground"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
