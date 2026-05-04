"use client";

import { IconAudio } from "@central-icons-react/round-outlined-radius-2-stroke-1.5/IconAudio";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type NowPlaying = {
  name: string;
  artist: string;
  url: string;
  image: string | null;
  nowPlaying: boolean;
  playedAt: number | null;
};

function MusicNoteIcon() {
  return (
    <IconAudio
      size={17}
      className="size-[17px] shrink-0 text-muted-foreground"
      aria-hidden
    />
  );
}

/** Album-art disc — fixed 40×40 circle, soft lift + inset rim (Framer-style widget). */
function DiscArtwork({ imageUrl }: { imageUrl: string | null }) {
  return (
    <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75),0_2px_6px_rgba(0,0,0,0.08),0_8px_24px_-4px_rgba(0,0,0,0.14)] ring-1 ring-border/60">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
          unoptimized
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-muted/90">
          <MusicNoteIcon />
        </span>
      )}
    </span>
  );
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetch("/api/now-playing")
        .then((r) => (r.ok ? r.json() : null))
        .then((d: NowPlaying | null) => {
          if (!cancelled && d) setData(d);
        })
        .catch(() => {});
    load();
    const id = window.setInterval(load, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const hasData = !!data;
  const ariaLabel = hasData
    ? data!.nowPlaying
      ? `Now playing: ${data!.name} by ${data!.artist}`
      : `Last played: ${data!.name} by ${data!.artist}`
    : "Now playing";
  const tooltip = hasData ? `${data!.name} — ${data!.artist}` : "Now playing";
  const imageUrl = hasData && data!.image ? data!.image : null;
  const live = hasData && data!.nowPlaying;

  const inner = (
    <span className="relative inline-block h-10 w-10 shrink-0 leading-none">
      <DiscArtwork imageUrl={imageUrl} />
      {live ? (
        <span
          className="pointer-events-none absolute -bottom-px -right-px z-[1] size-2 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(255,255,255,0.95)]"
          aria-hidden
        />
      ) : null}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] z-50 leading-none sm:right-6 sm:bottom-6"
    >
      {hasData ? (
        <a
          href={data!.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          title={tooltip}
          className="pointer-events-auto inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-visible rounded-full align-top outline-none transition-transform duration-200 ease-out hover:scale-[1.04] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {inner}
        </a>
      ) : (
        <span
          aria-label={ariaLabel}
          title={tooltip}
          className="pointer-events-auto inline-flex h-10 w-10 shrink-0 items-center justify-center align-top"
        >
          {inner}
        </span>
      )}
    </motion.div>
  );
}
