import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "edge";

export type GeoResponse = {
  city: string;
  region: string;
  country: string;
};

export async function GET(req: NextRequest) {
  const headers = req.headers;
  const city =
    decode(headers.get("x-vercel-ip-city")) ||
    SITE.defaultLocation.city;
  const region =
    headers.get("x-vercel-ip-country-region") ||
    SITE.defaultLocation.region;
  const country =
    headers.get("x-vercel-ip-country") || SITE.defaultLocation.country;

  return NextResponse.json<GeoResponse>(
    { city, region, country },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}

function decode(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
