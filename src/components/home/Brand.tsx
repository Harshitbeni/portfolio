"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

type Geo = { city: string; region: string; country: string };

export function Brand() {
  const [geo, setGeo] = useState<Geo>(SITE.defaultLocation);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/location")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Geo | null) => {
        if (!cancelled && data && data.city) setGeo(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const location = `${geo.city}, ${geo.region}, ${geo.country}`;

  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="relative inline-block size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-900/10">
        <Image
          src={SITE.assets.avatarIllustrated}
          alt="Harshit Beniwal — illustrated avatar"
          width={40}
          height={40}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[14px] font-semibold tracking-tight text-zinc-900">
          {SITE.name}
        </span>
        <span className="text-[13px] text-zinc-500">{location}</span>
      </span>
    </Link>
  );
}
