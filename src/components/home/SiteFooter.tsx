"use client";

import { IconArrowUpRight } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconArrowUpRight";
import { IconCheckmark1Small } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconCheckmark1Small";
import { IconClipboard2 } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconClipboard2";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SITE } from "@/lib/site";

const footLink =
  "underline decoration-zinc-300/90 underline-offset-[3px] transition-colors hover:text-zinc-900 hover:decoration-zinc-500";

const body = "text-[14px] leading-[18px] text-zinc-600";

/** Small outbound-link mark — reads like the Framer footer glyph beside “Elsewhere”. */
function ElsewhereGlyph() {
  return (
    <IconArrowUpRight
      size={16}
      className="size-4 shrink-0 text-[rgb(127,136,153)]"
      aria-hidden
    />
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [ok, setOk] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setOk(true);
      window.setTimeout(() => setOk(false), 1600);
    } catch {
      setOk(false);
    }
  }, [email]);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={ok ? "Copied" : `Copy ${email}`}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-300/35 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
    >
      {ok ? (
        <IconCheckmark1Small
          size={16}
          className="size-4 shrink-0 text-current"
          aria-hidden
        />
      ) : (
        <IconClipboard2
          size={16}
          className="size-4 shrink-0 text-current"
          aria-hidden
        />
      )}
    </button>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-8 w-full">
      <div className="w-full rounded-t-[32px] bg-[linear-gradient(180deg,#e5e7eb_0%,rgba(229,231,235,0)_100%)]">
        <div className="mx-auto max-w-[832px] px-4 pb-32 pt-10 sm:px-6 sm:pt-14">
          <div className={`space-y-3 ${body}`}>
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

          <div className="mt-10">
            <div className="flex items-center gap-2">
              <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-[rgb(127,136,153)]">
                Elsewhere
              </p>
              <ElsewhereGlyph />
            </div>
            <div className="mt-2 h-px w-full bg-zinc-300" aria-hidden />
            <ul className={`mt-4 space-y-2 ${body}`}>
              <li>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className={`text-zinc-700 ${footLink}`}
                  >
                    {SITE.email}
                  </a>
                  <CopyEmailButton email={SITE.email} />
                </div>
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

          <div className="flex justify-center pt-8">
            <div
              tabIndex={0}
              role="img"
              aria-label={`Sticker portrait of ${SITE.name}. ${SITE.footerPortraitTooltip.replace(/\n/g, " ")}`}
              className="group relative inline-block cursor-help overflow-hidden rounded-md outline-none transition-[overflow] duration-150 hover:overflow-visible focus-visible:overflow-visible focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f4f6]"
            >
              {/* Matches Framer `footer/me` + `extras/tooltip`: top -23px, right -114px, 3px radius, dual shadow, Inter 12/16 semibold on zinc-900. */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-[-114px] top-[-23px] z-10 w-max max-w-[min(280px,calc(100vw-2rem))] rounded-[3px] bg-zinc-900 p-[6px] text-center text-[12px] font-semibold leading-4 text-zinc-200 opacity-0 shadow-[0px_10px_8px_0px_rgba(0,0,0,0.04),0px_4px_8px_-4px_rgba(0,0,0,0.1)] transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 whitespace-pre-line"
              >
                {SITE.footerPortraitTooltip}
              </span>
              <Image
                src={SITE.assets.heroPortrait}
                alt=""
                width={130}
                height={113}
                className="h-auto w-[130px] select-none rounded-md opacity-90"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
