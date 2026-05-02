import { HeroActions } from "@/components/home/HeroActions";
import { HeroBio } from "@/components/home/HeroBio";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { ProjectCard } from "@/components/home/ProjectCard";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { portfolioItems } from "@/data/home-portfolio";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="mx-auto max-w-[832px] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <div className="space-y-6">
            <HeroHeadline />
            <HeroBio />
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
          <div className="mx-auto flex max-w-[832px] flex-col gap-12 px-4 pb-16 sm:px-6 sm:pb-24">
            {portfolioItems.map((item, index) => (
              <ProjectCard key={item.href + item.title} item={item} index={index} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
