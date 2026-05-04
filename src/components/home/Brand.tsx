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
    <Link
      href="/"
      className="flex items-center gap-2 [&_span]:leading-4 [&_p]:leading-4 [&_p]:text-[12px] [&_label]:leading-4 [&_label]:text-[12px] [&_a]:leading-4 [&_h1]:leading-4 [&_h2]:leading-4 [&_h3]:leading-4 [&_h4]:leading-4 [&_h5]:leading-4 [&_h6]:leading-4"
    >
      <span className="relative inline-block size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10">
        <Image
          src={SITE.assets.avatarIllustrated}
          alt="Harshit Beniwal — illustrated avatar"
          width={32}
          height={32}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span className="flex flex-col">
        <span className="text-[12px] font-semibold leading-4 tracking-tight text-foreground">
          {SITE.name}
        </span>
        <span className="text-[12px] leading-4 text-muted-foreground">{location}</span>
      </span>
    </Link>
  );
}
