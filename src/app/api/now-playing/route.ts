import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "edge";
export const revalidate = 60;

type LastFmTrack = {
  name: string;
  artist: { "#text": string };
  image: { size: string; "#text": string }[];
  url: string;
  "@attr"?: { nowplaying?: string };
  date?: { uts: string };
};

type LastFmResponse = {
  recenttracks?: { track: LastFmTrack[] };
};

export type NowPlaying = {
  name: string;
  artist: string;
  url: string;
  image: string | null;
  nowPlaying: boolean;
  playedAt: number | null;
};

const FALLBACK: NowPlaying = {
  name: "Heartless",
  artist: "Kanye West",
  url: "https://www.last.fm/music/Kanye+West/_/Heartless",
  image: "https://lastfm.freetls.fastly.net/i/u/300x300/a10a67180b666ce93a3bb79c49faca0b.jpg",
  nowPlaying: false,
  playedAt: null,
};

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USER || SITE.lastfmUser;

  if (!apiKey) {
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  }

  try {
    const url = new URL("https://ws.audioscrobbler.com/2.0/");
    url.searchParams.set("method", "user.getrecenttracks");
    url.searchParams.set("user", user);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`last.fm ${res.status}`);
    const data = (await res.json()) as LastFmResponse;
    const track = data.recenttracks?.track?.[0];
    if (!track) throw new Error("no recent tracks");

    const big = track.image.find((i) => i.size === "extralarge") ?? track.image.at(-1);

    const payload: NowPlaying = {
      name: track.name,
      artist: track.artist["#text"],
      url: track.url,
      image: big?.["#text"] || null,
      nowPlaying: track["@attr"]?.nowplaying === "true",
      playedAt: track.date ? Number(track.date.uts) * 1000 : null,
    };

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json(FALLBACK, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
