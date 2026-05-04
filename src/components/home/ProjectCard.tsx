"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore, useState, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import type { PortfolioItem } from "@/data/home-portfolio";
import { ProjectTag } from "@/components/home/ProjectTag";

type Props = {
  item: PortfolioItem;
  index: number;
  /** When set, entrance waits for this flag (hero finished) and viewport. */
  introGate?: boolean;
};

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Mask for progressive blur: white = visible frosted band, fading toward top (see mask-image alpha). */
const overlayProgressiveMask = {
  WebkitMaskImage:
    "linear-gradient(to top, #fff 0%, #fff 14%, rgba(255,255,255,0.9) 32%, rgba(255,255,255,0.4) 58%, rgba(255,255,255,0.1) 82%, transparent 100%)",
  maskImage:
    "linear-gradient(to top, #fff 0%, #fff 14%, rgba(255,255,255,0.9) 32%, rgba(255,255,255,0.4) 58%, rgba(255,255,255,0.1) 82%, transparent 100%)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
} as const;

function useHasHoverMedia(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(hover: hover)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(hover: hover)").matches,
    () => false,
  );
}

export function ProjectCard({ item, index, introGate }: Props) {
  const reduce = useReducedMotion();
  const fineHover = useHasHoverMedia();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const inView = useInView(articleRef, { once: true, margin: "-40px" });

  const tagsVisible = !fineHover || hovered || focused;

  const overlayTransition: Transition = reduce
    ? { duration: 0.15 }
    : { duration: 0.38, ease };

  const tagMotion: Transition = reduce
    ? { duration: 0.12 }
    : { duration: 0.32, ease };

  const tagOffsetMain = { x: -12, y: 12 };
  const tagOffsetLast = { x: 14, y: 14 };

  const mainTags =
    item.tags.length > 1 ? item.tags.slice(0, -1) : ([] as string[]);
  const lastTag =
    item.tags.length > 0 ? item.tags[item.tags.length - 1] : null;

  const gateActive = introGate !== undefined;
  const introUnlocked = !gateActive || introGate;
  const shouldEnter = reduce || (introUnlocked && inView);

  return (
    <motion.article
      ref={articleRef}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={
        reduce ? undefined : shouldEnter ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
      }
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : index * 0.06,
        ease,
      }}
    >
      <Link
        href={item.href}
        className="group block overflow-visible transition"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div className="relative w-full overflow-visible">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[8px] bg-muted">
            {item.media.kind === "video" ? (
              <video
                className="absolute inset-0 size-full min-h-0 min-w-0 rounded-[8px] object-cover object-center transition duration-500 will-change-transform group-hover:scale-[1.01]"
                src={item.media.src}
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay
                {...(item.media.poster ? { poster: item.media.poster } : {})}
              />
            ) : (
              <Image
                src={item.media.src}
                alt=""
                fill
                sizes="(min-width: 880px) 832px, 100vw"
                className="absolute inset-0 size-full rounded-[8px] object-cover object-center transition duration-500 will-change-transform group-hover:scale-[1.01]"
              />
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[4] rounded-[8px] ring-1 ring-inset ring-[rgba(0,0,0,0.1)]"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/[0.04]"
              aria-hidden
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[27%] bg-white/[0.01]"
              style={
                reduce
                  ? overlayProgressiveMask
                  : {
                      ...overlayProgressiveMask,
                      WebkitBackdropFilter: "blur(24px)",
                      backdropFilter: "blur(24px)",
                    }
              }
              initial={false}
              animate={{ opacity: tagsVisible ? 1 : 0 }}
              transition={overlayTransition}
            />
            <div
              className={`absolute bottom-3 left-3 z-[5] flex flex-wrap gap-1.5 ${tagsVisible ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              {mainTags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={false}
                  animate={{
                    opacity: tagsVisible ? 1 : 0,
                    x: tagsVisible ? 0 : tagOffsetMain.x,
                    y: tagsVisible ? 0 : tagOffsetMain.y,
                    filter: reduce
                      ? "blur(0px)"
                      : tagsVisible
                        ? "blur(0px)"
                        : "blur(6px)",
                  }}
                  transition={tagMotion}
                  className="inline-block"
                >
                  <ProjectTag>{tag}</ProjectTag>
                </motion.span>
              ))}
            </div>
            {lastTag ? (
              <div
                className={`absolute bottom-3 right-3 z-[5] ${tagsVisible ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <motion.span
                  key={`tag-last-${lastTag}`}
                  initial={false}
                  animate={{
                    opacity: tagsVisible ? 1 : 0,
                    x: tagsVisible ? 0 : tagOffsetLast.x,
                    y: tagsVisible ? 0 : tagOffsetLast.y,
                    filter: reduce
                      ? "blur(0px)"
                      : tagsVisible
                        ? "blur(0px)"
                        : "blur(6px)",
                  }}
                  transition={tagMotion}
                  className="inline-block"
                >
                  <ProjectTag>{lastTag}</ProjectTag>
                </motion.span>
              </div>
            ) : null}
          </div>
          <div className="space-y-1.5 overflow-visible py-4">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold leading-snug text-foreground">
              {item.titleLogo ? (
                <span className="relative box-border inline-block size-4 shrink-0 overflow-hidden rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2),0px_1px_2px_-1px_rgba(0,0,0,0.12)] ring-1 ring-inset ring-[rgba(0,0,0,0.1)]">
                  <Image
                    src={item.titleLogo.src}
                    alt={item.titleLogo.alt}
                    width={16}
                    height={16}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </span>
              ) : null}
              <span>{item.title}</span>
            </h2>
            <p className="max-w-[36rem] text-balance text-[14px] leading-[20px] text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
