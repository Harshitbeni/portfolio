import { SITE } from "@/lib/site";

export type PortfolioMedia =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string; width: number; height: number };

export type PortfolioItem = {
  href: string;
  tags: string[];
  title: string;
  description: string;
  media: PortfolioMedia;
  /** Small logo prefixed inline next to the title, mirroring harshitbeni.com. */
  titleLogo?: { src: string; alt: string };
};

export const portfolioItems: PortfolioItem[] = [
  {
    href: "/work/privado-mobile-app-scan",
    tags: ["B2B SaaS", "Dev-Tool", "Privado.ai"],
    title: "Privacy Tools for Mobiles Apps",
    description:
      "We were losing 50% of the market as Privado couldn't scan mobile apps. I led the design for the feature that changed that.",
    media: {
      kind: "video",
      src: "https://framerusercontent.com/assets/H0KHtJxd3hM9TO2AEfyPB7Uh34I.mp4",
    },
    titleLogo: { src: SITE.assets.logos.privadoSquare, alt: "Privado logo" },
  },
  {
    href: "/work/thursday",
    tags: ["B2B SaaS", "Video conferencing", "Thursday.social"],
    title: "Culture-Building for Remote Teams",
    description:
      "Designing a platform for remote teams to build a strong culture using thoughtfully designed social activities and mixers to boost engagement.",
    media: {
      kind: "video",
      src: "https://framerusercontent.com/assets/eS18CdlqrjtJqkDNUhIaAsDJE.mp4",
    },
    titleLogo: { src: SITE.assets.logos.thursday, alt: "Thursday logo" },
  },
  {
    href: "/work/privado-assessments",
    tags: ["B2B SaaS", "Video conferencing", "Privado.ai"],
    title: "Rethinking Privacy Compliance for Software Teams",
    description:
      "Turning an unwanted chore that takes months to complete into a streamlined workflow that is done within a week.",
    media: {
      kind: "video",
      src: "https://framerusercontent.com/assets/SAkCxtLV2FtYfT4PEJ1SN4Rsfs.mp4",
    },
    titleLogo: { src: SITE.assets.logos.privadoSquare, alt: "Privado logo" },
  },
  {
    href: "/journal",
    tags: ["iOS", "Productivity", "personal", "Coming Soon"],
    title: "Flora - a New Kind of Journaling",
    description:
      "Flora brings the context of your life to your journal: health, activity, events, and much more. Private by design.",
    media: {
      kind: "video",
      src: "https://framerusercontent.com/assets/1XzPxAPpu0J4hzSkTdXNw8DAjmM.mp4",
    },
    titleLogo: { src: SITE.assets.logos.flora, alt: "Flora logo" },
  },
  {
    href: "/work/thursday-websites",
    tags: ["Web Design", "Thursday.social"],
    title: "Thursday: Award-Winning Websites",
    description:
      "A set of thoughtfully designed websites for Thursday and its mixers that contributed to our Product Hunt Product of the Year award.",
    media: {
      kind: "image",
      src: "https://framerusercontent.com/images/gtnDX0WLDA6wG7cgMOt1ShTAGY.png?width=1280&height=1120",
      width: 1280,
      height: 1120,
    },
    titleLogo: { src: SITE.assets.logos.thursday, alt: "Thursday logo" },
  },
  {
    href: "/work/things-4",
    tags: ["macOS", "Productivity", "Concept"],
    title: "Things 4",
    description:
      "A practice in auto-layout turned into a full-blown rethink of what Things 4 would look like.",
    media: {
      kind: "image",
      src: "https://framerusercontent.com/images/qAtCRuSUETV9wRjXwTqoJoPUdo.png?width=1600&height=1088",
      width: 1600,
      height: 1088,
    },
    titleLogo: { src: SITE.assets.logos.thingsCheck, alt: "Things 4 logo" },
  },
];
