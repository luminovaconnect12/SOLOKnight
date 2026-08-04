"use client";

import { Reveal } from "@/components/motion/reveal";
import { Materialize } from "@/components/motion/materialize";
import { SplitHeading } from "@/components/motion/split-heading";
import { useTilt } from "@/hooks/use-tilt";
import {
  EnergyCoreArt,
  HolographicCityArt,
  OrbitStationArt,
  VelocityJetArt,
  ArenaProtocolArt,
  ApexConceptArt,
} from "@/components/gallery/generative-art";

const galleryItems = [
  { Art: EnergyCoreArt, title: "Energy Core", tag: "Technology", span: "sm:row-span-2" },
  { Art: HolographicCityArt, title: "Holographic City", tag: "Entertainment", span: "" },
  { Art: OrbitStationArt, title: "Orbit Station", tag: "Aerospace", span: "" },
  { Art: VelocityJetArt, title: "Velocity Program", tag: "Aviation", span: "sm:row-span-2" },
  { Art: ArenaProtocolArt, title: "Arena Protocol", tag: "Esports", span: "" },
  { Art: ApexConceptArt, title: "Apex Concept", tag: "Automotive", span: "" },
];

function GalleryTile({ item }: { item: (typeof galleryItems)[number] }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(6);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor-hover
      className="hud-corners glow-ring-hover group relative h-full w-full overflow-hidden rounded-xl border border-knight-blue/15"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 scale-105 transition-transform duration-700 ease-out group-hover:scale-125">
        <item.Art />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-knight-ink via-knight-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-hud text-[10px] uppercase tracking-[0.25em] text-knight-blue-bright">
          {item.tag}
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-foreground">{item.title}</p>
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Interactive Gallery
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mt-6 text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Original visual worlds, built for what comes next.
          </SplitHeading>
        </div>

        <div className="mt-16 grid auto-rows-[220px] gap-5 sm:grid-cols-3">
          {galleryItems.map((item, i) => (
            <Materialize key={item.title} index={i} delay={(i % 3) * 0.08} rotate={4} className={item.span}>
              <GalleryTile item={item} />
            </Materialize>
          ))}
        </div>
      </div>
    </section>
  );
}
