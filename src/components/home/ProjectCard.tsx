"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioItem } from "@/data/home-portfolio";

type Props = {
  item: PortfolioItem;
  index: number;
};

export function ProjectCard({ item, index }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={item.href}
        className="group block overflow-hidden rounded-[8px] border border-black/[0.1] bg-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-black/[0.16] hover:shadow-md"
      >
        <div className="relative w-full overflow-hidden">
          <div className="relative aspect-[16/10] w-full bg-zinc-100">
            {item.media.kind === "video" ? (
              <video
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.01]"
                src={item.media.src}
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay
              />
            ) : (
              <Image
                src={item.media.src}
                alt=""
                width={item.media.width}
                height={item.media.height}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.01]"
                sizes="(min-width: 880px) 832px, 100vw"
              />
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.04]"
              aria-hidden
            />
          </div>
          <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="pointer-events-auto inline-flex items-center rounded-[4px] border border-black/[0.08] bg-white/95 px-1.5 py-0.5 text-[11px] font-medium text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 px-4 py-4">
          <h2 className="flex items-center gap-2 text-[14px] font-semibold leading-snug text-zinc-900">
            {item.titleLogo ? (
              <span className="relative inline-block size-4 shrink-0 overflow-hidden rounded-[3px]">
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
          <p className="text-[14px] leading-[20px] text-zinc-600">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
