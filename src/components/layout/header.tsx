"use client";

import { Blocks } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
            <Blocks size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Uniqus <span className="text-brand-primary-light">Hub</span>
          </span>
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="#platforms"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Platforms
          </a>
          <a
            href="#about"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            About
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
