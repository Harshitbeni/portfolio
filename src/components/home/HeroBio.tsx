import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

type ChipProps = {
  href: string;
  label: string;
  logo: string;
  external?: boolean;
};

function CompanyChip({ href, label, logo, external = true }: ChipProps) {
  const className =
    "inline-flex items-center gap-1.5 rounded-[4px] border border-black/[0.16] bg-white px-1.5 py-0.5 align-middle text-[15px] font-normal text-zinc-900 shadow-[0_1px_2px_0_rgba(0,0,0,0.2),0_1px_2px_-1px_rgba(0,0,0,0.12)] transition hover:bg-zinc-50";
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
  return (
    <p className="max-w-[34rem] text-[15px] leading-[24px] text-zinc-600">
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
    </p>
  );
}
