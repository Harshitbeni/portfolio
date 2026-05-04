import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { InterfaceKit } from "interface-kit/react";
import "./globals.css";
import { AgentationDevToolbar } from "@/components/agentation-dev-toolbar";
import { Dock } from "@/components/home/Dock";
import { NowPlaying } from "@/components/home/NowPlaying";
import { SiteHeader } from "@/components/home/SiteHeader";
import { IconProvider } from "@/lib/icon-context";
import { ShapeProvider } from "@/lib/shape-context";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Optical headline family — matches harshitbeni.com “Inter Display” feel for the hero only. */
const interDisplay = Inter({
  variable: "--font-inter-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      {
        url: "https://framerusercontent.com/images/nxvOBARz9XmAVrWRlaJO2d7uJo.png",
      },
    ],
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.title,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://framerusercontent.com/images/P5zjHDdff5ydQZXLSQIUg8BRB8.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [
      "https://framerusercontent.com/images/P5zjHDdff5ydQZXLSQIUg8BRB8.png",
    ],
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
      className={`${inter.variable} ${interDisplay.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <ShapeProvider>
          <SiteHeader />
          <div className="md:pt-14">
            <IconProvider>{children}</IconProvider>
          </div>
          <NowPlaying />
          <Dock />
        </ShapeProvider>
        {process.env.NODE_ENV === "development" ? <InterfaceKit /> : null}
        <AgentationDevToolbar />
      </body>
    </html>
  );
}
