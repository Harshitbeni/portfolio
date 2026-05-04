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
      className="flex items-center gap-2 text-sm [&_span]:text-sm [&_p]:text-sm [&_label]:text-sm [&_a]:text-sm"
    >
      <span className="relative inline-block size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10">
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
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {SITE.name}
        </span>
        <span className="text-sm text-muted-foreground">{location}</span>
      </span>
    </Link>
  );
}
