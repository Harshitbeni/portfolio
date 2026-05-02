import Link from "next/link";
import { SITE } from "@/lib/site";

export function HeroBio() {
  return (
    <div className="max-w-xl space-y-4 text-base leading-relaxed text-zinc-600">
      <p>
        Studying Interaction Design at{" "}
        <Link
          href={SITE.cca}
          className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-500"
        >
          CCA
        </Link>{" "}
        in San Francisco. Previously, I have worked with{" "}
        <Link
          href={SITE.employers.privado}
          className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-500"
        >
          Privado
        </Link>
        ,{" "}
        <Link
          href={SITE.employers.fold}
          className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-500"
        >
          Fold
        </Link>
        ,{" "}
        <Link
          href={SITE.employers.thursday}
          className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-500"
        >
          Thursday
        </Link>
        ,{" "}
        <Link
          href={SITE.employers.thence}
          className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-500"
        >
          Thence
        </Link>
        , shipping products from 0→1.
      </p>
      <p>
        I am currently shaping how remote teams build culture with Thursday™,
        and crafting simple tools and interface experiments (such as this
        website) on the side. If you are interested in such areas, please get in
        touch.
      </p>
    </div>
  );
}
