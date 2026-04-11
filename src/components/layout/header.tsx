"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/components/theme-provider";

export function Header() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src={theme === "dark" ? "/logos/uniqus-logo-white.png" : "/logos/uniqus-logo-color.png"}
            alt="Uniqus"
            width={120}
            height={42}
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-brand-primary-light">Hub</span>
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
