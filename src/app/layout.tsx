import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uniqus Platform Hub — 15 AI-Powered Platforms",
  description:
    "The Uniqus product ecosystem: 15 platforms, 122+ AI agents, 6 jurisdictions. IPO readiness, M&A due diligence, treasury management, and more — built by Sandip Khetan.",
  keywords: [
    "Uniqus",
    "Sandip Khetan",
    "IPO Platform",
    "AI Consulting",
    "DealSight",
    "UniTreasury",
    "IFFCO Policy Engine",
    "Claude AI",
  ],
  openGraph: {
    title: "Uniqus Platform Hub",
    description:
      "15 AI-powered platforms. 122+ agents. 6 jurisdictions. The Uniqus product ecosystem.",
    type: "website",
    siteName: "Uniqus Platform Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uniqus Platform Hub",
    description:
      "15 AI-powered platforms. 122+ agents. 6 jurisdictions. The Uniqus product ecosystem.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
