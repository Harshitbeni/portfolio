"use client";

import { IconChevronDownSmall } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconChevronDownSmall";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useIcon } from "@/lib/icon-context";
import { useShape } from "@/lib/shape-context";
import { cn } from "@/lib/utils";

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
  const PlayIcon = useIcon("play");
  const shape = useShape();

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
        <Button
          type="button"
          variant="primary"
          size="md"
          leadingIcon={PlayIcon}
          onClick={() => setOpen(true)}
          className="font-medium [&_span]:font-medium [&_p]:font-medium [&_label]:font-medium [&_a]:font-medium shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2),0px_1px_2px_-1px_rgba(0,0,0,0.12)]"
        >
          Showreel
        </Button>
        <div className="relative" ref={menuRef}>
          <div
            className={cn(
              "inline-flex h-8 items-stretch overflow-hidden border border-border bg-background shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.05)]",
              shape.mergedBg,
            )}
          >
            <Button
              asChild
              variant="secondary"
              size="md"
              className="h-8 rounded-none border-0 px-3.5 text-[14px] font-medium shadow-none"
            >
              <Link href="/cv">Resume</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Resume options"
              className="h-8 w-8 shrink-0 rounded-none border-0 border-l border-border shadow-none"
            >
              <IconChevronDownSmall
                aria-hidden
                size={12}
                className="shrink-0 text-current"
              />
            </Button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: reduce ? 0 : 0.15 }}
                className={cn(
                  "absolute right-0 top-[calc(100%+6px)] z-30 w-44 overflow-hidden border border-border bg-background p-1 shadow-lg",
                  shape.bg,
                )}
              >
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-auto w-full justify-start rounded-md px-2.5 py-1.5 text-[14px] font-normal shadow-none"
                >
                  <Link
                    href="/cv"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    View resume
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-auto w-full justify-start rounded-md px-2.5 py-1.5 text-[14px] font-normal shadow-none"
                >
                  <a
                    href={RESUME_PDF}
                    role="menuitem"
                    download
                    onClick={() => setMenuOpen(false)}
                  >
                    Download PDF
                  </a>
                </Button>
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
              className={cn(
                "relative w-full max-w-4xl overflow-hidden bg-foreground shadow-2xl ring-1 ring-background/10",
                shape.container,
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-background/10 px-4 py-3">
                <p className="text-sm font-medium text-background">Showreel</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                  className="text-background/70 hover:bg-background/10 hover:text-background"
                >
                  Close
                </Button>
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
