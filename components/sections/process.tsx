"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { NumberGlitch } from "@/components/motion/number-glitch";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

function ProcessRow({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      const border = borderRef.current;
      if (!el || !border) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, x: 0 });
        gsap.set(border, { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      });
      tl.fromTo(border, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out" }).fromTo(
        el,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3",
      );
    },
    { scope: ref, dependencies: [index] },
  );

  return (
    <div className="relative py-8">
      <span
        ref={borderRef}
        className="absolute left-0 top-0 h-full w-[2px] origin-top bg-knight-blue-bright"
        aria-hidden="true"
      />
      <div
        ref={ref}
        className="group grid gap-4 pl-6 transition-colors duration-300 sm:grid-cols-[100px_1fr_1.4fr] sm:items-center sm:gap-8"
      >
        <NumberGlitch value={step.index} className="font-hud text-sm text-knight-blue-bright/70" />
        <h3 className="font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-knight-blue-bright sm:text-3xl">
          {step.title}
        </h3>
        <p className="text-sm text-knight-gray sm:text-base">{step.description}</p>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative bg-knight-ink py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Creative Process
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mt-6 text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Five phases. One standard of craft.
          </SplitHeading>
        </div>

        <div className="mt-16 divide-y divide-knight-blue/15 border-y border-knight-blue/15">
          {processSteps.map((step, i) => (
            <ProcessRow key={step.index} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
