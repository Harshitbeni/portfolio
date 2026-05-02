"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const ROTATING_WORDS = ["Software", "Stories"];

const STATIC_PREFIX = ["Product", "Designer", "who", "loves"];

export function HeroHeadline() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

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

  const word = ROTATING_WORDS[index];

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-[family-name:var(--font-display)] text-[20px] font-medium leading-[1.3] tracking-tight text-zinc-900 [text-shadow:0_2px_2px_rgba(17,24,39,0.16)]"
    >
      <span className="flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1">
        {STATIC_PREFIX.map((w) => (
          <motion.span key={w} variants={item} className="inline-block">
            {w}
          </motion.span>
        ))}
        <span
          className="relative inline-flex"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={word}
              className="inline-flex whitespace-nowrap"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04 } },
              }}
            >
              {word.split("").map((ch, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block"
                  variants={{
                    hidden: reduce
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 10, filter: "blur(10px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </motion.h1>
  );
}
