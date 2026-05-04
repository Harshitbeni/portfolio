"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import type { PortfolioItem } from "@/data/home-portfolio";
import { ProjectTag } from "@/components/home/ProjectTag";

type Props = {
  item: PortfolioItem;
  index: number;
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

export function ProjectCard({ item, index }: Props) {
  const reduce = useReducedMotion();
  const fineHover = useHasHoverMedia();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const tagsVisible = !fineHover || hovered || focused;

  const overlayTransition: Transition = reduce
    ? { duration: 0.15 }
    : { duration: 0.38, ease };

  const tagMotion: Transition = reduce
    ? { duration: 0.12 }
    : { duration: 0.32, ease };

  const tagOffset = { x: -12, y: 12 };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : index * 0.06,
        ease,
      }}
    >
      <Link
        href={item.href}
        className="group block overflow-hidden transition"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div className="relative w-full overflow-hidden">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-muted">
            {item.media.kind === "video" ? (
              <video
                className="absolute inset-0 size-full min-h-0 min-w-0 object-cover object-center transition duration-500 will-change-transform group-hover:scale-[1.01]"
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
                className="absolute inset-0 size-full object-cover object-center transition duration-500 will-change-transform group-hover:scale-[1.01]"
              />
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[4] rounded-lg ring-1 ring-inset ring-black/15"
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
              {item.tags.map((tag) => (
                <motion.span
                  key={tag}
                  initial={false}
                  animate={{
                    opacity: tagsVisible ? 1 : 0,
                    x: tagsVisible ? 0 : tagOffset.x,
                    y: tagsVisible ? 0 : tagOffset.y,
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
          </div>
          <div className="space-y-1.5 py-4">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold leading-snug text-foreground">
              {item.titleLogo ? (
                <span className="relative inline-block size-4 shrink-0 overflow-hidden rounded-[4px] ring-1 ring-inset ring-[rgba(0,0,0,0.16)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2),0px_1px_2px_-1px_rgba(0,0,0,0.12)]">
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
