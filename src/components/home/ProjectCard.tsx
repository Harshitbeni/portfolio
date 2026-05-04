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
import { useShape } from "@/lib/shape-context";
import { cn } from "@/lib/utils";

type Props = {
  item: PortfolioItem;
  index: number;
};

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];

const overlayProgressiveMask = {
  WebkitMaskImage:
    "linear-gradient(to top, #fff 0%, #fff 10%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.12) 68%, transparent 100%)",
  maskImage:
    "linear-gradient(to top, #fff 0%, #fff 10%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.12) 68%, transparent 100%)",
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
  const shape = useShape();
  const reduce = useReducedMotion();
  const fineHover = useHasHoverMedia();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const tagsVisible = !fineHover || hovered || focused;
  const n = item.tags.length;

  const overlayTransition: Transition = reduce
    ? { duration: 0.15 }
    : { duration: 0.38, ease };

  const tagTransition = (i: number): Transition =>
    reduce
      ? { duration: 0.12 }
      : {
          duration: 0.32,
          ease,
          delay: tagsVisible ? 0.06 + i * 0.055 : (n - 1 - i) * 0.04,
        };

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
        className={cn(
          "group block overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-border transition hover:shadow-md hover:ring-border/80",
          shape.mergedBg,
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div className="relative w-full overflow-hidden bg-white">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
            {item.media.kind === "video" ? (
              <video
                className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-center transition duration-500 will-change-transform group-hover:scale-[1.01]"
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
                className="object-cover object-center transition duration-500 will-change-transform group-hover:scale-[1.01]"
              />
            )}
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/[0.04]"
              aria-hidden
            />
            <motion.div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[58%] bg-gradient-to-t from-white/18 via-white/6 to-transparent ${
                reduce ? "" : "backdrop-blur-lg backdrop-saturate-[1.12] sm:backdrop-blur-xl"
              }`}
              style={overlayProgressiveMask}
              initial={false}
              animate={{ opacity: tagsVisible ? 1 : 0 }}
              transition={overlayTransition}
            />
            <div
              className={`absolute left-3 top-3 z-[3] flex flex-wrap gap-1.5 ${tagsVisible ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              {item.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={false}
                  animate={{
                    opacity: tagsVisible ? 1 : 0,
                    y: tagsVisible ? 0 : 10,
                    filter: reduce
                      ? "blur(0px)"
                      : tagsVisible
                        ? "blur(0px)"
                        : "blur(6px)",
                  }}
                  transition={tagTransition(i)}
                  className="inline-flex items-center rounded-sm border border-border bg-background/95 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="space-y-1.5 px-4 py-4">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold leading-snug text-foreground">
              {item.titleLogo ? (
                <span className="relative inline-block size-4 shrink-0 overflow-hidden rounded-[4px]">
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
