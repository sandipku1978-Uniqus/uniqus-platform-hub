"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Rocket,
  ClipboardCheck,
  Bot,
  FileText,
  Search,
  TrendingUp,
  BookOpen,
  Users,
  MessageCircle,
  LayoutDashboard,
  Sparkles,
  Compass,
  Trophy,
  Shield,
  BarChart3,
} from "lucide-react";
import { CategoryBadge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Platform } from "@/types/platform";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Rocket,
  ClipboardCheck,
  Bot,
  FileText,
  Search,
  TrendingUp,
  BookOpen,
  Users,
  MessageCircle,
  LayoutDashboard,
  Sparkles,
  Compass,
  Trophy,
  Shield,
  BarChart3,
};

const categoryGradients: Record<string, string> = {
  Enterprise: "from-brand-primary/30 to-brand-secondary/30",
  Intelligence: "from-brand-secondary/30 to-indigo-600/30",
  Personal: "from-blue-600/30 to-cyan-600/30",
  "Early Stage": "from-zinc-600/30 to-zinc-500/30",
};

export function PlatformCard({ platform }: { platform: Platform }) {
  const Icon = iconMap[platform.icon] || Rocket;
  const gradient = categoryGradients[platform.category] || categoryGradients.Enterprise;
  const maxChips = 3;
  const extraCount = platform.techStack.length - maxChips;
  const isClickable = !!platform.url;

  const cardContent = (
    <>
      {/* Screenshot / Gradient area */}
      <div
        className={`relative h-40 sm:h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        <Icon
          size={48}
          className="text-foreground/40 group-hover:text-foreground/60 transition-colors"
        />
        {platform.status === "Coming Soon" && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-sm font-medium text-muted px-3 py-1 rounded-full border border-border bg-card/80">
              Coming Soon
            </span>
          </div>
        )}
        {isClickable && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border">
              <ExternalLink size={14} className="text-brand-primary-light" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={platform.category} />
          <StatusBadge status={platform.status} />
        </div>

        {/* Name & tagline */}
        <h3 className="text-lg font-semibold tracking-tight">{platform.name}</h3>
        <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2">
          {platform.tagline}
        </p>

        {/* Tech chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {platform.techStack.slice(0, maxChips).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-card-hover text-muted border border-border"
            >
              {tech}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-card-hover text-muted-foreground border border-border">
              +{extraCount}
            </span>
          )}
        </div>

        {/* Highlights */}
        <ul className="mt-3 space-y-1">
          {platform.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-1 h-1 rounded-full bg-brand-primary-light shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Launch indicator */}
        <div className="mt-auto pt-4">
          {isClickable ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary-light group-hover:text-brand-primary transition-colors">
              Launch
              <ExternalLink size={14} />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </>
  );

  const motionProps = {
    layout: true,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    whileHover: { y: -4 },
    transition: { duration: 0.3 },
    className:
      "group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-border-hover hover:shadow-lg hover:shadow-brand-primary/5 transition-[border-color,box-shadow] duration-300" +
      (isClickable ? " cursor-pointer" : ""),
  };

  if (isClickable) {
    return (
      <motion.a
        href={platform.url!}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {cardContent}
      </motion.a>
    );
  }

  return <motion.div {...motionProps}>{cardContent}</motion.div>;
}
