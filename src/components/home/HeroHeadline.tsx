"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const ROTATING_PHRASES = ["Software", "Stories"] as const;

const PREFIX_WORDS = ["Product", "Designer", "who", "loves"] as const;

const ease = [0.22, 1, 0.36, 1] as const;

/** Prefix words — stagger in once. */
const wordStagger = 0.052;

/** Rotating word — letter-by-letter (OG-style). */
const letterStagger = 0.032;

const enterDuration = 0.44;
const exitDuration = 0.34;

/** Prefix line: stagger in once, no exit. */
const prefixContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: wordStagger,
      delayChildren: 0.06,
    },
  },
} as const;

/** Start rotating word after prefix stagger on first paint only. */
const phraseDelayAfterPrefix =
  0.06 + (PREFIX_WORDS.length - 1) * wordStagger + 0.04;

const wordToken = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(8px)",
    transition: { duration: exitDuration, ease },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: enterDuration, ease },
  },
} as const;

export function HeroHeadline() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const hasRotatedOnce = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_PHRASES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (index > 0) hasRotatedOnce.current = true;
  }, [index]);

  const phrase = ROTATING_PHRASES[index];
  const letters = useMemo(() => Array.from(phrase), [phrase]);

  const letterPhraseContainer = useMemo(
    () =>
      ({
        hidden: {
          transition: {
            staggerChildren: letterStagger * 0.88,
            staggerDirection: -1,
          },
        },
        visible: {
          transition: {
            staggerChildren: letterStagger,
            delayChildren:
              index === 0 && !hasRotatedOnce.current
                ? phraseDelayAfterPrefix
                : 0.02,
          },
        },
      }) as const,
    [index],
  );

  const slotCh = useMemo(
    () => Math.max(...ROTATING_PHRASES.map((p) => p.length)),
    [],
  );

  return (
    <motion.h1
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="font-[family-name:var(--font-display)] text-[18px] font-medium leading-[1.28] tracking-[-0.02em] text-zinc-900 [text-shadow:0_1px_0_rgba(255,255,255,0.5),0_1px_2px_rgba(17,24,39,0.1)]"
    >
      <span className="inline-flex flex-wrap items-baseline gap-x-[0.28em]">
        {reduce ? (
          <>
            <span className="inline-block whitespace-nowrap">
              {PREFIX_WORDS.join(" ")}
            </span>
            <span
              className="relative inline-flex align-baseline"
              aria-live="polite"
              aria-atomic="true"
              style={{ minWidth: `${slotCh}ch` }}
            >
              <span className="inline-block whitespace-nowrap">{phrase}</span>
            </span>
          </>
        ) : (
          <>
            <motion.span
              className="inline-flex flex-wrap items-baseline gap-x-[0.28em]"
              variants={prefixContainer}
              initial="hidden"
              animate="visible"
            >
              {PREFIX_WORDS.map((w) => (
                <motion.span
                  key={w}
                  variants={wordToken}
                  className="inline-block whitespace-nowrap will-change-[opacity,transform,filter]"
                >
                  {w}
                </motion.span>
              ))}
            </motion.span>
            <span
              className="relative inline-flex flex-wrap items-baseline gap-x-[0.28em] align-baseline"
              aria-live="polite"
              aria-atomic="true"
              style={{ minWidth: `${slotCh}ch` }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phrase}
                  className="inline-flex whitespace-nowrap will-change-[opacity,transform,filter]"
                  variants={letterPhraseContainer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {letters.map((ch, i) => (
                    <motion.span
                      key={`${phrase}-${i}`}
                      variants={wordToken}
                      className="inline-block will-change-[opacity,transform,filter]"
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </>
        )}
      </span>
    </motion.h1>
  );
}
