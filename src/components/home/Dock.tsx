"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconEmojiSmile } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconEmojiSmile";
import { IconFiles } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconFiles";
import { IconHome } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconHome";
import { IconPencil } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconPencil";
import { IconSparklesTwo } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconSparklesTwo";
import { SITE } from "@/lib/site";

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
  return (
    <motion.nav
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <ul className="pointer-events-auto flex items-end gap-1 rounded-t-[20px] bg-[color-mix(in_oklab,var(--background)_88%,transparent)] px-2 pb-2 pt-2 backdrop-blur-md sm:gap-2 sm:rounded-full sm:px-3 sm:pb-2.5 sm:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.04)] sm:ring-1 sm:ring-black/[0.06]">
        {items.map((item) => {
          const inner = (
            <span className="flex w-[64px] flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-zinc-700 transition-colors hover:text-zinc-900 sm:w-[68px]">
              <span className="text-zinc-700">{item.icon}</span>
              <span className="text-[11px] font-medium leading-none tracking-tight text-zinc-700">
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
                  className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
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
