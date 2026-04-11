export type PlatformCategory = "Enterprise" | "Intelligence" | "Personal" | "Early Stage";
export type PlatformStatus = "Live" | "Beta" | "Coming Soon";

export interface Platform {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string | null;
  screenshot: string;
  category: PlatformCategory;
  status: PlatformStatus;
  techStack: string[];
  highlights: string[];
  icon: string;
}
