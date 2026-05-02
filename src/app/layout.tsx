import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AgentationDevToolbar } from "@/components/agentation-dev-toolbar";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <AgentationDevToolbar />
      </body>
    </html>
  );
}
