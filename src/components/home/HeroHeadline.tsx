"use client";

import { motion, useReducedMotion } from "framer-motion";

const headlineWords = ["Product", "designer", "who", "loves", "Software"];

export function HeroHeadline() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: reduce
        ? {}
        : { staggerChildren: 0.045, delayChildren: 0.08 },
    },
  };

  const item = {
    hidden: reduce
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 10, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[1.2] tracking-tight text-zinc-900 [text-shadow:0_2px_2px_rgba(17,24,39,0.16)]"
    >
      <span className="flex flex-wrap gap-x-[0.35em] gap-y-1">
        {headlineWords.map((word) => (
          <motion.span key={word} variants={item} className="inline-block">
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}
