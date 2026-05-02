"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

const navLink =
  "rounded-full px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[color-mix(in_oklab,var(--background)_92%,transparent)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900"
        >
          {SITE.name.split(" ")[0]}
          <span className="font-normal text-zinc-500"> beni</span>
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-1 sm:gap-2"
          aria-label="Primary"
        >
          <Link href="/#work" className={navLink}>
            work
          </Link>
          <Link href="/about" className={navLink}>
            about
          </Link>
          <a
            href={SITE.notes}
            className={navLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            notes
          </a>
          <Link href="/archive" className={navLink}>
            v3
          </Link>
          <a
            href={SITE.framer}
            className={navLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            Framer
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
