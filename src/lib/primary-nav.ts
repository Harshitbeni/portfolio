import { SITE } from "@/lib/site";

export type PrimaryNavItem = {
  href: string;
  label: string;
  external?: boolean;
};

/** Same IA as the mobile Dock — single source of truth for primary navigation. */
export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { href: "/#work", label: "work" },
  { href: "/about", label: "about" },
  { href: "/play", label: "play" },
  { href: SITE.notes, label: "notes", external: true },
  { href: "/cv", label: "cv" },
];

export function isNavActive(
  pathname: string,
  href: string,
  external?: boolean,
): boolean {
  if (external) return false;

  const hashIdx = href.indexOf("#");
  if (hashIdx >= 0) {
    const pathPart = href.slice(0, hashIdx);
    const base =
      pathPart === "" || pathPart === "/"
        ? "/"
        : pathPart.replace(/\/$/, "") || "/";
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(`${base}/`);
  }

  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
