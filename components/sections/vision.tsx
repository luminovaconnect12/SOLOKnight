"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneViewport } from "@/components/three/scene-viewport";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const orbColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const section = sectionRef.current;
      if (!section || !textColRef.current || !orbColRef.current) return;

      gsap.fromTo(
        textColRef.current,
        { yPercent: 6 },
        { yPercent: -6, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 } },
      );
      gsap.fromTo(
        orbColRef.current,
        { yPercent: -10, scale: 0.92, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: orbColRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section id="vision" ref={sectionRef as never} className="relative overflow-hidden bg-knight-ink py-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div ref={textColRef}>
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Brand Story &amp; Vision
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mt-6 text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Born from a simple belief: partnerships are the highest form of storytelling.
          </SplitHeading>
          <Reveal delay={0.15} className="mt-6 max-w-lg space-y-4 text-knight-gray">
            <p>
              Solo Knight exists at the intersection of entertainment, technology, and
              culture — a studio built to give ambitious brands the creative gravity of a
              franchise launch, whether it&apos;s their first campaign or their fiftieth.
            </p>
            <p>
              We think in universes, not assets. Every collaboration is built to extend
              past a single channel — into gaming, anime, motorsport, aerospace, and the
              cultural moments that actually move an audience.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 grid grid-cols-2 gap-6 border-t border-knight-blue/15 pt-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">Vision</p>
              <p className="mt-2 text-sm text-knight-gray">
                Become the studio the world&apos;s biggest entertainment brands call first.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">Craft</p>
              <p className="mt-2 text-sm text-knight-gray">
                Cinematic production values applied to every deliverable, every time.
              </p>
            </div>
          </Reveal>
        </div>

        <div ref={orbColRef} className="relative aspect-square w-full">
          <div className="hud-corners glow-ring relative h-full w-full overflow-hidden rounded-2xl border border-knight-blue/20 bg-knight-panel/30">
            <SceneViewport scene="orbit" />
          </div>
        </div>
      </div>
    </section>
  );
}
