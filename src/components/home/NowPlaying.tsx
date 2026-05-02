"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NowPlaying = {
  name: string;
  artist: string;
  url: string;
  image: string | null;
  nowPlaying: boolean;
  playedAt: number | null;
};

function formatRelative(ts: number | null, now: boolean): string {
  if (now) return "now playing";
  if (!ts) return "";
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
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

  if (!data) return null;

  const relative = formatRelative(data.playedAt, data.nowPlaying);

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Last played: ${data.name} by ${data.artist}`}
      className="hidden items-center gap-2 rounded-full px-2 py-1 transition hover:bg-zinc-100/70 sm:flex"
    >
      <span className="relative size-9 shrink-0">
        {data.image ? (
          <Image
            src={data.image}
            alt={`${data.name} album art`}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover ring-1 ring-zinc-900/10"
            unoptimized
          />
        ) : (
          <span className="size-9 rounded-full bg-zinc-200" />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/5"
        />
      </span>
      <span className="flex max-w-[180px] flex-col leading-tight">
        <span className="truncate text-[11px] uppercase tracking-wide text-zinc-500">
          {relative}
        </span>
        <span className="truncate text-[13px] font-medium text-zinc-900">
          {data.name}
        </span>
        <span className="truncate text-[12px] text-zinc-500">
          {data.artist}
        </span>
      </span>
    </a>
  );
}
