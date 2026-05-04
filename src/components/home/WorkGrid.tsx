"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { ProjectCard } from "@/components/home/ProjectCard";
import { HERO_INTRO_GATE_MS } from "@/lib/hero-intro";
import type { PortfolioItem } from "@/data/home-portfolio";

type Props = {
  items: PortfolioItem[];
};

export function WorkGrid({ items }: Props) {
  const reduceMotion = useReducedMotion();
  const reduce = reduceMotion === true;
  const [introGate, setIntroGate] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      setIntroGate(true);
      return;
    }
    const id = window.setTimeout(() => setIntroGate(true), HERO_INTRO_GATE_MS);
    return () => window.clearTimeout(id);
  }, [reduce]);

  return (
    <>
      {items.map((item, index) => (
        <ProjectCard
          key={item.href + item.title}
          item={item}
          index={index}
          introGate={introGate}
        />
      ))}
    </>
  );
}
