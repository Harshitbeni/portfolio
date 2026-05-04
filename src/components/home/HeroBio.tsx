"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

type ChipProps = {
  href: string;
  label: string;
  logo: string;
  external?: boolean;
};

function CompanyChip({ href, label, logo, external = true }: ChipProps) {
  const className =
    "inline-flex items-center gap-1.5 rounded-[4px] border-0 border-none border-transparent bg-transparent p-0 align-middle text-[16px] font-normal text-foreground transition-opacity hover:opacity-80 [&_span]:font-normal [&_p]:font-normal [&_h1]:font-normal [&_h2]:font-normal [&_h3]:font-normal [&_h4]:font-normal [&_h5]:font-normal [&_h6]:font-normal [&_label]:font-normal [&_a]:font-normal";
  const inner = (
    <>
      <span className="relative inline-block size-4 overflow-hidden rounded-sm">
        <Image
          src={logo}
          alt=""
          width={16}
          height={16}
          className="h-full w-full object-cover"
          unoptimized
        />
      </span>
      <span>{label}</span>
    </>
  );
  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function HeroBio() {
  const reduce = useReducedMotion();

  return (
    <motion.p
      className="w-[506px] max-w-full text-[16px] leading-[1.25] text-muted-foreground [&_span]:leading-[1.25] [&_p]:leading-[1.25] [&_label]:leading-[1.25] [&_a]:leading-[1.25]"
      initial={
        reduce ? false : { opacity: 0, y: 14, filter: "blur(8px)" }
      }
      animate={
        reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      transition={{ duration: 0.58, delay: 0.14, ease }}
    >
      Studying Interaction Design at{" "}
      <CompanyChip href={SITE.cca} label="CCA" logo={SITE.assets.logos.cca} />{" "}
      in San Francisco. Previously I have worked with{" "}
      <CompanyChip
        href={SITE.employers.privado}
        label="Privado,"
        logo={SITE.assets.logos.privado}
      />{" "}
      <CompanyChip
        href={SITE.employers.fold}
        label="Fold,"
        logo={SITE.assets.logos.fold}
      />{" "}
      <CompanyChip
        href={SITE.employers.thursday}
        label="Thursday,"
        logo={SITE.assets.logos.thursday}
      />{" "}
      <CompanyChip
        href={SITE.employers.thence}
        label="Thence,"
        logo={SITE.assets.logos.thence}
      />{" "}
      shipping products from 0→1.
    </motion.p>
  );
}
