"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ProjectTagVariant = "light" | "dark";

type Props = {
  children: ReactNode;
  className?: string;
  /** Light mode default: bg #000 50%, text #fff 86%. Dark flips black/white. */
  variant?: ProjectTagVariant;
};

const styles: Record<
  ProjectTagVariant,
  { surface: string; label: string }
> = {
  light: {
    surface: "bg-[rgba(0,0,0,0.5)]",
    label: "text-[rgba(255,255,255,0.86)]",
  },
  dark: {
    surface: "bg-[rgba(255,255,255,0.5)]",
    label: "text-[rgba(0,0,0,0.86)]",
  },
};

export function ProjectTag({
  children,
  className,
  variant = "light",
}: Props) {
  const s = styles[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[11px] font-medium",
        s.surface,
        s.label,
        className,
      )}
    >
      {children}
    </span>
  );
}
