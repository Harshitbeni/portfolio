"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IconEmojiSmile } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconEmojiSmile";
import { IconFiles } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconFiles";
import { IconHome } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconHome";
import { IconPencil } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPencil";
import { IconSparklesTwo } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconSparklesTwo";
import { PRIMARY_NAV_ITEMS, isNavActive } from "@/lib/primary-nav";
import { useShapeContext } from "@/lib/shape-context";
import { cn } from "@/lib/utils";

const dockIconSize = 22;

const DOCK_ICONS: ReactNode[] = [
  <IconHome key="home" size={dockIconSize} className="shrink-0" />,
  <IconEmojiSmile key="about" size={dockIconSize} className="shrink-0" />,
  <IconSparklesTwo key="play" size={dockIconSize} className="shrink-0" />,
  <IconPencil key="notes" size={dockIconSize} className="shrink-0" />,
  <IconFiles key="cv" size={dockIconSize} className="shrink-0" />,
];

type DockItem = (typeof PRIMARY_NAV_ITEMS)[number] & { icon: ReactNode };

const items: DockItem[] = PRIMARY_NAV_ITEMS.map((item, i) => ({
  ...item,
  icon: DOCK_ICONS[i]!,
}));

export function Dock() {
  const { shape, classes } = useShapeContext();
  const pathname = usePathname();

  const shellRadius =
    shape === "pill"
      ? "rounded-t-[20px] sm:rounded-full"
      : "rounded-t-xl sm:rounded-xl";

  return (
    <motion.nav
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(env(safe-area-inset-bottom),0.5rem)] md:hidden"
    >
      <ul
        className={cn(
          "pointer-events-auto flex items-end gap-1 bg-[color-mix(in_oklab,var(--background)_88%,transparent)] px-2 pb-2 pt-2 backdrop-blur-md sm:gap-2 sm:px-3 sm:pb-2.5 sm:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.04)] sm:ring-1 sm:ring-border/60",
          shellRadius,
        )}
      >
        {items.map((item) => {
          const active = isNavActive(pathname, item.href, item.external);
          const inner = (
            <span
              className={cn(
                "flex w-[64px] flex-col items-center gap-1 px-2 py-1.5 transition-colors sm:w-[68px]",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  active &&
                    "[&_svg_path]:fill-foreground [&_svg_path]:stroke-none [&_svg_line]:stroke-none",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.icon}
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium leading-none tracking-tight",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </span>
          );
          return (
            <li key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
                    classes.item,
                  )}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
                    classes.item,
                  )}
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
