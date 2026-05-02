import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const footLink =
  "underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-500";

export function SiteFooter() {
  return (
    <footer className="mt-8">
      <div className="mx-auto flex max-w-[832px] flex-col gap-10 px-4 py-16 sm:px-6">
        <div className="space-y-3 text-[15px] leading-[24px] text-zinc-600">
          <p>
            harshitbeni.com is my internet home and a repository of my work and
            experiments.
          </p>
          <p>
            This is{" "}
            <Link href="/archive" className={footLink}>
              v3
            </Link>
            , made with{" "}
            <a
              href={SITE.framer}
              target="_blank"
              rel="noopener noreferrer"
              className={footLink}
            >
              Framer
            </a>
            . Open to new projects, collaborations and non-profit work.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Elsewhere
          </p>
          <ul className="space-y-1.5 text-[15px] leading-[22px] text-zinc-600">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className={`text-zinc-700 ${footLink}`}
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-zinc-700 ${footLink}`}
              >
                @harshitbeni
              </a>
            </li>
            <li>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-zinc-700 ${footLink}`}
              >
                @harshit-beniwal
              </a>
            </li>
            <li>
              <a
                href={SITE.social.bluesky}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-zinc-700 ${footLink}`}
              >
                @harshitbeni.bsky.social
              </a>
            </li>
          </ul>
        </div>

        <div className="flex justify-center pt-4">
          <Image
            src={SITE.assets.heroPortrait}
            alt=""
            width={130}
            height={113}
            className="h-auto w-[130px] select-none opacity-90"
            unoptimized
          />
        </div>
      </div>
    </footer>
  );
}
