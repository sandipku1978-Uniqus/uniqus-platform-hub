"use client";

import { useState, useMemo } from "react";
import { platforms } from "@/data/platforms";
import { SearchBar } from "@/components/platform/search-bar";
import { CategoryFilter } from "@/components/platform/category-filter";
import { TechFilter } from "@/components/platform/tech-filter";
import { PlatformGrid } from "@/components/platform/platform-grid";
import type { PlatformCategory } from "@/types/platform";

export function PlatformsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PlatformCategory | "All">("All");
  const [activeTechStacks, setActiveTechStacks] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return platforms.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;

      const matchesTech =
        activeTechStacks.length === 0 ||
        activeTechStacks.some((t) => p.techStack.includes(t));

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [searchQuery, activeCategory, activeTechStacks]);

  const toggleTech = (tech: string) => {
    setActiveTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <section id="platforms" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Our Platforms
          </h2>
          <p className="mt-3 text-muted text-lg">
            Browse, filter, and launch any platform in the Uniqus ecosystem.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          <TechFilter active={activeTechStacks} onToggle={toggleTech} />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} of {platforms.length} platforms
        </p>

        {/* Grid */}
        <PlatformGrid platforms={filtered} />
      </div>
    </section>
  );
}
