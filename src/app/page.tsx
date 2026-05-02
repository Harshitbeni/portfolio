import { HeroActions } from "@/components/home/HeroActions";
import { HeroBio } from "@/components/home/HeroBio";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { HeroVisual } from "@/components/home/HeroVisual";
import { ProjectCard } from "@/components/home/ProjectCard";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { portfolioItems } from "@/data/home-portfolio";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
            <div className="space-y-8">
              <HeroHeadline />
              <HeroBio />
              <HeroActions />
            </div>
            <HeroVisual />
          </div>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="scroll-mt-24 border-t border-zinc-200/80 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <h2
              id="work-heading"
              className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
            >
              Selected work
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {portfolioItems.map((item, index) => (
                <ProjectCard key={item.href + item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
