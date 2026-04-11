"use client";

import { AnimatePresence } from "framer-motion";
import { PlatformCard } from "./platform-card";
import type { Platform } from "@/types/platform";

export function PlatformGrid({ platforms }: { platforms: Platform[] }) {
  if (platforms.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted text-lg">No platforms match your filters.</p>
        <p className="text-muted-foreground text-sm mt-1">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </AnimatePresence>
    </div>
  );
}
