"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/** Default matches https://vimeo.com/848991756 — override with NEXT_PUBLIC_VIMEO_SHOWREEL_ID if needed. */
const VIMEO_SHOWREEL_DEFAULT = "848991756";

const vimeoId =
  process.env.NEXT_PUBLIC_VIMEO_SHOWREEL_ID?.trim() || VIMEO_SHOWREEL_DEFAULT;

const RESUME_PDF =
  process.env.NEXT_PUBLIC_RESUME_PDF_URL?.trim() ||
  "/Harshit-Beniwal-Resume.pdf";

export function HeroActions() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 items-center rounded-full bg-zinc-900 px-4 text-[13px] font-medium text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.18)] ring-1 ring-zinc-900/10 transition hover:bg-zinc-800"
        >
          Showreel
        </button>
        <div className="relative" ref={menuRef}>
          <div className="inline-flex h-9 items-stretch overflow-hidden rounded-full border border-black/[0.08] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            <Link
              href="/cv"
              className="inline-flex items-center px-3.5 text-[13px] font-medium text-zinc-900 transition hover:bg-zinc-50"
            >
              Resume
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Resume options"
              className="inline-flex items-center border-l border-black/[0.06] px-2 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
            >
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                className="size-3 fill-none stroke-current"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 4.5 3 3 3-3" />
              </svg>
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: reduce ? 0 : 0.15 }}
                className="absolute right-0 top-[calc(100%+6px)] z-30 w-44 overflow-hidden rounded-lg border border-black/[0.08] bg-white p-1 shadow-lg"
              >
                <Link
                  href="/cv"
                  role="menuitem"
                  className="block rounded-md px-2.5 py-1.5 text-[13px] text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
                  onClick={() => setMenuOpen(false)}
                >
                  View resume
                </Link>
                <a
                  href={RESUME_PDF}
                  role="menuitem"
                  className="block rounded-md px-2.5 py-1.5 text-[13px] text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
                  download
                  onClick={() => setMenuOpen(false)}
                >
                  Download PDF
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Showreel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96, y: 8 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-zinc-950 shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-sm font-medium text-white">Showreel</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-3 py-1 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                  Close
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  title="Showreel — Harshit Beniwal on Vimeo"
                  src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
