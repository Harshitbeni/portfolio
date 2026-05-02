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
        className="group block overflow-hidden rounded-lg border border-zinc-200/90 bg-zinc-50/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-zinc-900/5 transition hover:border-zinc-300 hover:shadow-md"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
          {item.media.kind === "video" ? (
            <video
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
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
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.06]"
            aria-hidden
          />
        </div>
        <div className="space-y-2 px-4 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {item.tags.join(" · ")}
          </p>
          <h2 className="text-base font-semibold leading-snug text-zinc-900">
            {item.title}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
