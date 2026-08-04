"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { timeline } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const section = sectionRef.current;
      const line = lineRef.current;
      if (!section || !line) return;

      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-knight-ink py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Experience Timeline
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mx-auto mt-6 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            The road from signal to global creative force.
          </SplitHeading>
        </div>

        <div className="relative mt-20 pl-10 sm:pl-16">
          <div className="absolute left-[7px] top-1 h-full w-px bg-knight-blue/15 sm:left-[15px]" aria-hidden="true" />
          <div
            ref={lineRef}
            className="absolute left-[7px] top-1 h-full w-px origin-top bg-knight-blue-bright sm:left-[15px]"
            aria-hidden="true"
          />

          <div className="space-y-16">
            {timeline.map((entry, i) => (
              <Reveal key={entry.year} delay={i * 0.05} y={24} className="relative">
                <span
                  className="absolute -left-10 top-1.5 h-3 w-3 rounded-full bg-knight-blue-bright shadow-[0_0_16px_2px_rgba(111,143,255,0.7)] sm:-left-16"
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-knight-blue-bright opacity-60" />
                </span>
                <p className="font-hud text-xs uppercase tracking-[0.3em] text-knight-blue-bright/80">
                  {entry.year}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-knight-gray">{entry.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
