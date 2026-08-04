"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function Mission() {
  const sweepRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const el = sweepRef.current;
    if (!el || prefersReducedMotion()) return;

    gsap.fromTo(
      el,
      { xPercent: -120 },
      {
        xPercent: 220,
        duration: 2.2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
      },
    );
  }, []);

  return (
    <section id="mission" className="relative overflow-hidden bg-background py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-knight-blue/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl overflow-hidden px-6 text-center lg:px-10">
        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-knight-blue-bright/15 to-transparent"
          aria-hidden="true"
        />
        <Reveal>
          <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">Our Mission</p>
        </Reveal>
        <SplitHeading
          as="h2"
          type="words"
          className="mx-auto mt-6 max-w-4xl text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          We build the promotional partnerships that turn brands into cultural events —
          engineered with the discipline of a studio and the imagination of a blockbuster.
        </SplitHeading>
      </div>

      <div className="relative mx-auto mt-20 grid max-w-5xl gap-8 px-6 sm:grid-cols-3 lg:px-10">
        <Reveal className="hud-corners border border-knight-blue/15 bg-knight-panel/40 p-8 text-center">
          <p className="font-display text-4xl font-semibold text-knight-blue-bright">
            <CountUp value={360} suffix="°" />
          </p>
          <p className="mt-3 text-sm text-knight-gray">Full-funnel creative, from concept to launch</p>
        </Reveal>
        <Reveal delay={0.1} className="hud-corners border border-knight-blue/15 bg-knight-panel/40 p-8 text-center">
          <p className="font-display text-4xl font-semibold text-knight-blue-bright">
            <CountUp value={8} suffix="+" />
          </p>
          <p className="mt-3 text-sm text-knight-gray">Industries served, one cinematic standard</p>
        </Reveal>
        <Reveal delay={0.2} className="hud-corners border border-knight-blue/15 bg-knight-panel/40 p-8 text-center">
          <p className="font-display text-4xl font-semibold text-knight-blue-bright">Global</p>
          <p className="mt-3 text-sm text-knight-gray">Built for partners operating across markets</p>
        </Reveal>
      </div>
    </section>
  );
}
