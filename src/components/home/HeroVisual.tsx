"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** Hero visual from the live Framer build (portrait / composite). */
const HERO_IMAGE =
  "https://framerusercontent.com/images/GJmnvDBERzblVCsQeiLFp3S4go.png?width=520&height=452";

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_24px_80px_-24px_rgba(17,24,39,0.15)] ring-1 ring-zinc-900/5 lg:sticky lg:top-24">
        <div className="relative aspect-[520/452] w-full bg-zinc-100">
          <Image
            src={HERO_IMAGE}
            alt=""
            width={520}
            height={452}
            className="h-full w-full object-cover object-top"
            priority
            sizes="(min-width: 1024px) 42vw, 0px"
          />
        </div>
      </div>
    </motion.div>
  );
}
