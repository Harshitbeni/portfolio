"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { Brand } from "./Brand";
import { NowPlaying } from "./NowPlaying";

const navLink =
  "rounded-full px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-[color-mix(in_oklab,var(--background)_92%,transparent)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Brand />
        </div>
        <nav
          className="flex flex-wrap items-center justify-end gap-1 sm:gap-1"
          aria-label="Primary"
        >
          <NowPlaying />
          <Link href="/#work" className={navLink}>
            work
          </Link>
          <Link href="/about" className={navLink}>
            about
          </Link>
          <Link href="/play" className={navLink}>
            play
          </Link>
          <a
            href={SITE.notes}
            className={navLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            notes
          </a>
          <Link href="/cv" className={navLink}>
            resume
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
