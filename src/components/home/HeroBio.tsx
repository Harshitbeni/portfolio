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
    "inline-flex items-center gap-1.5 rounded-[4px] bg-transparent p-0 align-middle text-[16px] font-normal text-zinc-900 transition-opacity hover:opacity-80";
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
      className="max-w-[36rem] text-[16px] leading-6 text-zinc-600"
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
