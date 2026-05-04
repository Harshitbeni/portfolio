import { HeroActions } from "@/components/home/HeroActions";
import { HeroBio } from "@/components/home/HeroBio";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { WorkGrid } from "@/components/home/WorkGrid";
import { SiteFooter } from "@/components/home/SiteFooter";
import { portfolioItems } from "@/data/home-portfolio";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <section className="mx-auto max-w-[832px] pt-[32px] pr-[16px] pb-[64px] pl-[16px]">
          <div className="space-y-6">
            <div className="space-y-3">
              <HeroHeadline />
              <HeroBio />
            </div>
            <HeroActions />
          </div>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="scroll-mt-24"
        >
          <h2 id="work-heading" className="sr-only">
            Selected work
          </h2>
          <div className="mx-auto flex max-w-[832px] flex-col gap-[100px] pt-[64px] pl-[16px] pr-[16px] pb-12 sm:pb-20">
            <WorkGrid items={portfolioItems} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
