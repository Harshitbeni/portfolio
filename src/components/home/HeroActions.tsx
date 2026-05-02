"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const vimeoId = process.env.NEXT_PUBLIC_VIMEO_SHOWREEL_ID;

export function HeroActions() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center gap-3"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative flex h-11 items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm ring-1 ring-zinc-900/10 transition hover:bg-zinc-800"
        >
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            aria-hidden
          />
          <span className="relative">Showreel</span>
        </button>
        <Link
          href="/cv"
          className="flex h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-zinc-600 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.03),0_1px_2px_0_rgba(0,0,0,0.05)] ring-1 ring-zinc-200/80 transition hover:bg-zinc-50 hover:text-zinc-900"
        >
          Resume
        </Link>
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
                {vimeoId ? (
                  <iframe
                    title="Showreel video"
                    src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                    <p className="text-sm text-zinc-400">
                      Vimeo showreel embed. Set{" "}
                      <code className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-200">
                        NEXT_PUBLIC_VIMEO_SHOWREEL_ID
                      </code>{" "}
                      to your video ID to enable the player (matches the live
                      site’s Vimeo integration).
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
