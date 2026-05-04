"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconEmojiSmile } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconEmojiSmile";
import { IconFiles } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconFiles";
import { IconHome } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconHome";
import { IconPencil } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPencil";
import { IconSparklesTwo } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconSparklesTwo";
import { SITE } from "@/lib/site";
import { useShapeContext } from "@/lib/shape-context";
import { cn } from "@/lib/utils";

type DockItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
};

const dockIconSize = 22;

const items: DockItem[] = [
  {
    href: "/",
    label: "home",
    icon: <IconHome size={dockIconSize} className="shrink-0" />,
  },
  {
    href: "/about",
    label: "about",
    icon: <IconEmojiSmile size={dockIconSize} className="shrink-0" />,
  },
  {
    href: "/play",
    label: "play",
    icon: <IconSparklesTwo size={dockIconSize} className="shrink-0" />,
  },
  {
    href: SITE.notes,
    label: "notes",
    icon: <IconPencil size={dockIconSize} className="shrink-0" />,
    external: true,
  },
  {
    href: "/cv",
    label: "cv",
    icon: <IconFiles size={dockIconSize} className="shrink-0" />,
  },
];

export function Dock() {
  const { shape, classes } = useShapeContext();

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
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <ul
        className={cn(
          "pointer-events-auto flex items-end gap-1 bg-[color-mix(in_oklab,var(--background)_88%,transparent)] px-2 pb-2 pt-2 backdrop-blur-md sm:gap-2 sm:px-3 sm:pb-2.5 sm:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.04)] sm:ring-1 sm:ring-border/60",
          shellRadius,
        )}
      >
        {items.map((item) => {
          const inner = (
            <span className="flex w-[64px] flex-col items-center gap-1 px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:w-[68px]">
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="text-[11px] font-medium leading-none tracking-tight text-muted-foreground">
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
