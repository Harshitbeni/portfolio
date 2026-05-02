import Link from "next/link";
import { SITE } from "@/lib/site";

const footLink =
  "text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-500";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-gradient-to-b from-zinc-50/50 to-zinc-100/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-md space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Elsewhere
            </p>
            <p className="text-sm leading-relaxed text-zinc-600">
              harshitbeni.com is my internet home and a repository of my work
              and experiments.
            </p>
            <p className="text-sm leading-relaxed text-zinc-600">
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4"
              >
                {SITE.email}
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Links
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/archive" className={footLink}>
                    v3
                  </Link>
                </li>
                <li>
                  <a
                    href={SITE.framer}
                    className={footLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Framer
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Contact
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className={footLink}
                  >
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.social.x}
                    className={footLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @harshitbeni
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.social.linkedin}
                    className={footLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @harshit-beniwal
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.social.bluesky}
                    className={footLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @harshitbeni.bsky.social
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
