import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const revalidate = 3600;

type Location = { city: string; region: string; country: string };

const FALLBACK: Location = SITE.defaultLocation;

/**
 * Minimal slug → ISO 3166-1 alpha-2 map for the countries Harshit has
 * visited / is most likely to visit. Anything else falls back to "".
 */
const COUNTRY_SLUG_TO_ISO: Record<string, string> = {
  "united-states": "US",
  "united-kingdom": "GB",
  "united-arab-emirates": "AE",
  india: "IN",
  thailand: "TH",
  indonesia: "ID",
  vietnam: "VN",
  "south-korea": "KR",
  japan: "JP",
  germany: "DE",
  france: "FR",
  spain: "ES",
  portugal: "PT",
  netherlands: "NL",
  italy: "IT",
  mexico: "MX",
  canada: "CA",
  brazil: "BR",
  australia: "AU",
  singapore: "SG",
  malaysia: "MY",
  philippines: "PH",
  taiwan: "TW",
  turkey: "TR",
  greece: "GR",
};

function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

function parseCitySlug(slug: string): { region: string; country: string } {
  // slug examples: "san-francisco-ca-united-states", "delhi-india", "pune-india"
  const parts = slug.split("-");
  // Walk country slugs from longest known suffix to shortest.
  for (let take = Math.min(3, parts.length); take >= 1; take--) {
    const candidate = parts.slice(parts.length - take).join("-");
    const iso = COUNTRY_SLUG_TO_ISO[candidate];
    if (iso) {
      const beforeCountry = parts.slice(0, parts.length - take);
      const last = beforeCountry[beforeCountry.length - 1] ?? "";
      const region = last.length === 2 ? last.toUpperCase() : "";
      return { region, country: iso };
    }
  }
  return { region: "", country: "" };
}

type Trip = {
  trip_id?: string;
  epoch_start?: number;
  epoch_end?: number;
  city_slug?: string;
  city?: string;
};

function extractTripsArray(html: string): Trip[] | null {
  const marker = "var tripsCoords=";
  const idx = html.indexOf(marker);
  if (idx < 0) return null;
  // tripsCoords is an object keyed by user hash whose values are arrays.
  // Walk braces from the start of the object until the JSON terminates.
  let i = idx + marker.length;
  while (i < html.length && html[i] !== "{") i++;
  if (i >= html.length) return null;
  let depth = 0;
  let end = -1;
  let inString = false;
  let stringQuote: '"' | "'" | null = null;
  let escape = false;
  for (let j = i; j < html.length; j++) {
    const ch = html[j];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (ch === "\\") {
        escape = true;
      } else if (ch === stringQuote) {
        inString = false;
        stringQuote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      stringQuote = ch as '"' | "'";
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = j + 1;
        break;
      }
    }
  }
  if (end < 0) return null;
  try {
    const obj = JSON.parse(html.slice(i, end)) as Record<string, Trip[]>;
    const firstKey = Object.keys(obj)[0];
    if (!firstKey) return null;
    return obj[firstKey] ?? null;
  } catch {
    return null;
  }
}

function pickCurrentTrip(trips: Trip[]): Trip | null {
  if (!trips.length) return null;
  return trips.reduce<Trip | null>((best, cur) => {
    if (!cur.epoch_start) return best;
    if (!best || (best.epoch_start ?? 0) < (cur.epoch_start ?? 0)) return cur;
    return best;
  }, null);
}

async function fetchLocation(): Promise<Location> {
  const url = `https://nomads.com/@${SITE.nomadsUser}`;
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      accept: "text/html",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`nomads.com responded ${res.status}`);
  const html = await res.text();

  const trips = extractTripsArray(html);
  const current = trips ? pickCurrentTrip(trips) : null;

  if (current?.city_slug) {
    const { region, country } = parseCitySlug(current.city_slug);
    // current.city is already nicely formatted (e.g., "San Francisco, CA" or "Delhi")
    // but we want just the city without region tail.
    const rawCity = current.city ?? "";
    const cityOnly = rawCity.split(",")[0]?.trim() || "";
    if (cityOnly) {
      return {
        city: cityOnly,
        region,
        country: country || FALLBACK.country,
      };
    }
  }

  // Fallback: parse meta description. Pattern: "is now in (City) for"
  const meta = html.match(/is now in ([^.]+?) for /);
  if (meta?.[1]) {
    const cityRaw = meta[1].trim();
    return {
      city: titleCase(cityRaw),
      region: cityRaw.toLowerCase() === "san francisco" ? "CA" : "",
      country: cityRaw.toLowerCase() === "san francisco" ? "US" : "",
    };
  }

  throw new Error("Could not parse nomads.com profile");
}

export async function GET() {
  try {
    const loc = await fetchLocation();
    return NextResponse.json(loc, {
      headers: {
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(FALLBACK, {
      headers: {
        "cache-control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  }
}
