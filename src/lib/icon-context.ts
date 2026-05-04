"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Icon contract for Fluid `MenuItem` (optional) and shared UI such as `Button`. */
export type IconComponent = LucideIcon;

/** No-op provider — keeps layout compatible; icons are passed explicitly (e.g. Lucide). */
export function IconProvider({ children }: { children: ReactNode }) {
  return children;
}
