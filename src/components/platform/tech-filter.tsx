"use client";

import { cn } from "@/lib/utils";
import { allTechStacks } from "@/data/platforms";

export function TechFilter({
  active,
  onToggle,
}: {
  active: string[];
  onToggle: (tech: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {allTechStacks.map((tech) => {
        const isActive = active.includes(tech);
        return (
          <button
            key={tech}
            onClick={() => onToggle(tech)}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-medium border transition-colors",
              isActive
                ? "bg-brand-secondary text-white border-brand-secondary"
                : "bg-card text-muted-foreground border-border hover:border-border-hover hover:text-muted"
            )}
          >
            {tech}
          </button>
        );
      })}
    </div>
  );
}
