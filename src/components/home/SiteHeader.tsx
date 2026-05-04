"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { PRIMARY_NAV_ITEMS, isNavActive } from "@/lib/primary-nav";
import { cn } from "@/lib/utils";
import { Brand } from "./Brand";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "z-40 w-full",
        "md:fixed md:top-0 md:inset-x-0",
        "md:bg-[color-mix(in_oklab,var(--background)_92%,transparent)] md:backdrop-blur-md",
        "max-md:bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 pt-4 md:min-h-14 md:py-3 md:pt-3">
        <Brand />
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex flex-wrap items-center justify-end gap-2">
            {PRIMARY_NAV_ITEMS.map((item) => {
              const active = isNavActive(pathname, item.href, item.external);
              const className = cn(
                "rounded-sm px-[12px] py-[6px] text-sm font-normal transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-accent [&_span]:font-normal [&_p]:font-normal [&_h1]:font-normal [&_h2]:font-normal [&_h3]:font-normal [&_h4]:font-normal [&_h5]:font-normal [&_h6]:font-normal [&_a]:font-normal [&_label]:font-normal",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              );
              return (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={className}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
