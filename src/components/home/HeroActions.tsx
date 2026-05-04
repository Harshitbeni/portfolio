"use client";

import { IconChevronDownSmall } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconChevronDownSmall";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { MenuItem } from "@/components/ui/menu-item";
import { ShapeProvider, useShape } from "@/lib/shape-context";
import { cn } from "@/lib/utils";

/** Default matches https://vimeo.com/848991756 — override with NEXT_PUBLIC_VIMEO_SHOWREEL_ID if needed. */
const VIMEO_SHOWREEL_DEFAULT = "848991756";

const vimeoId =
  process.env.NEXT_PUBLIC_VIMEO_SHOWREEL_ID?.trim() || VIMEO_SHOWREEL_DEFAULT;

const RESUME_PDF =
  process.env.NEXT_PUBLIC_RESUME_PDF_URL?.trim() ||
  "/Harshit-Beniwal-Resume.pdf";

export function HeroActions() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const shape = useShape();
  const resumeWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!resumeMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        resumeWrapRef.current &&
        e.target instanceof Node &&
        !resumeWrapRef.current.contains(e.target)
      ) {
        setResumeMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResumeMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [resumeMenuOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center gap-3"
      >
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => setOpen(true)}
          className="text-[13px] font-medium leading-none [&_span]:font-medium [&_p]:font-medium [&_label]:font-medium [&_a]:font-medium shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2),0px_1px_2px_-1px_rgba(0,0,0,0.12)]"
        >
          Showreel
        </Button>
        <div className="relative" ref={resumeWrapRef}>
          <div
            className={cn(
              "inline-flex h-8 items-stretch overflow-hidden rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] ring-0 outline-none",
            )}
          >
            <Link
              href="/cv"
              onClick={() => setResumeMenuOpen(false)}
              className="inline-flex h-full items-center pl-[16px] pr-[10px] text-[14px] font-medium leading-none text-[#4A5568] transition-colors hover:bg-neutral-50 active:bg-neutral-100/90 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6B97FF] focus-visible:ring-inset"
            >
              Resume
            </Link>
            <button
              type="button"
              onClick={() => setResumeMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={resumeMenuOpen}
              aria-label="Resume options"
              className="inline-flex h-full w-10 shrink-0 items-center justify-center border-l border-border bg-white text-[#4A5568] transition-colors hover:bg-neutral-50 active:bg-neutral-100/90 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6B97FF] focus-visible:ring-inset"
            >
              <IconChevronDownSmall
                aria-hidden
                size={14}
                strokeWidth={1.5}
                className="shrink-0 text-current"
              />
            </button>
          </div>
          {resumeMenuOpen ? (
            <div className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[11rem]">
              <ShapeProvider defaultShape="rounded" enableKeyboardShortcut={false}>
                <Dropdown className="w-full min-w-[11rem] max-w-[min(100vw-2rem,18rem)] overflow-hidden shadow-lg">
                  <MenuItem
                    label="View Resume"
                    index={0}
                    onSelect={() => {
                      setResumeMenuOpen(false);
                      router.push("/cv");
                    }}
                  />
                  <MenuItem
                    label="Download PDF"
                    index={1}
                    onSelect={() => {
                      setResumeMenuOpen(false);
                      const a = document.createElement("a");
                      a.href = RESUME_PDF;
                      a.download = "";
                      a.rel = "noopener noreferrer";
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                    }}
                  />
                </Dropdown>
              </ShapeProvider>
            </div>
          ) : null}
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
