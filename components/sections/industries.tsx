"use client";

import { industries } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { Materialize } from "@/components/motion/materialize";
import { SplitHeading } from "@/components/motion/split-heading";
import { useTilt } from "@/hooks/use-tilt";

function IndustryCard({ title, description, stat }: (typeof industries)[number]) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(10);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor-hover
      className="hud-corners scanline-hover group relative flex h-full flex-col justify-between overflow-hidden border border-knight-blue/15 bg-knight-panel/40 p-7 transition-colors duration-300 hover:border-knight-blue-bright/60 hover:bg-knight-panel/70"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-knight-blue/0 blur-2xl transition-all duration-500 group-hover:bg-knight-blue/25"
        aria-hidden="true"
      />
      <span className="font-hud text-xs text-knight-blue-bright/70">{stat}</span>
      <div className="mt-8">
        <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-3 text-sm text-knight-gray">{description}</p>
      </div>
    </div>
  );
}

export function Industries() {
  return (
    <section id="industries" className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Industries
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mt-6 text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Built to move fluently across the industries that shape culture.
          </SplitHeading>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <Materialize key={industry.id} index={i} delay={(i % 4) * 0.08} className="h-full">
              <IndustryCard {...industry} />
            </Materialize>
          ))}
        </div>
      </div>
    </section>
  );
}
