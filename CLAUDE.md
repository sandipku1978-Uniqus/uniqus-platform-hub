# Uniqus Platform Hub

Public-facing app-store-style dashboard showcasing 12 platforms built by Sandip Khetan / Uniqus Consultech.

## Tech Stack
- Next.js 16+ (App Router) with TypeScript
- Tailwind CSS v4 (using @import "tailwindcss" and @theme block)
- Framer Motion for animations
- Lucide React for icons
- Deployed on Vercel

## Architecture
- Single-page static site — no database, no auth, no API routes
- All platform data lives in src/data/platforms.ts
- Dark/light mode via data-theme attribute on <html> + CSS variables
- Brand colors: Primary #B21E7D (magenta), Secondary #482879 (deep purple)

## Conventions
- Path alias: @/* maps to ./src/*
- CSS variables for all colors (dark mode default, light mode override)
- Tailwind v4 @theme block maps CSS vars to utility classes
- Components are functional, "use client" only when state/effects needed
- Fonts: Geist (sans) and Geist Mono

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build

## File Organization
- src/app/ — App Router pages and layout
- src/components/sections/ — Full-width page sections
- src/components/platform/ — Platform card, grid, filters
- src/components/ui/ — Reusable UI primitives
- src/data/ — Static platform data
- src/types/ — TypeScript interfaces
- public/screenshots/ — Platform screenshot images
