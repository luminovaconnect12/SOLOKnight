"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SceneViewport } from "@/components/three/scene-viewport";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic-button";
import { useBootReady } from "@/hooks/use-boot-ready";
import { useClickBurst } from "@/hooks/use-click-burst";
import { heroScrollState } from "@/lib/scroll-state";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ready = useBootReady();
  const sectionRef = useRef<HTMLElement>(null);
  const burst = useClickBurst<HTMLAnchorElement>();

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          heroScrollState.progress = self.progress;
        },
      });

      return () => {
        trigger.kill();
        heroScrollState.progress = 0;
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="top"
      ref={sectionRef as never}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-knight-ink"
    >
      <SceneViewport scene="hero" />
      <div className="bg-hud-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-knight-ink via-transparent to-knight-ink/60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-32 pb-24 lg:px-10">
        <Reveal y={16} duration={0.8}>
          <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
            Solo Knight &middot; Creative Entertainment Studio
          </p>
        </Reveal>

        {ready ? (
          <SplitHeading
            as="h1"
            type="words"
            trigger="load"
            className="text-glow mt-6 max-w-5xl text-balance font-display text-[13vw] font-semibold leading-[0.95] tracking-tight text-foreground sm:text-[9vw] lg:text-[6.4vw]"
          >
            Creating The Future Of Entertainment Partnerships.
          </SplitHeading>
        ) : (
          <h1
            style={{ opacity: 0 }}
            className="mt-6 max-w-5xl text-balance font-display text-[13vw] font-semibold leading-[0.95] tracking-tight text-foreground sm:text-[9vw] lg:text-[6.4vw]"
          >
            Creating The Future Of Entertainment Partnerships.
          </h1>
        )}

        <Reveal y={24} delay={0.4} className="mt-8 max-w-xl">
          <p className="text-base text-knight-gray sm:text-lg">
            A futuristic creative studio built for the brands defining gaming, entertainment,
            esports, aerospace, and culture — engineered for partners who think in franchises,
            not campaigns.
          </p>
        </Reveal>

        <Reveal y={24} delay={0.55} className="mt-10 flex flex-wrap items-center gap-5">
          <Magnetic>
            <a
              ref={burst.ref}
              href="#contact"
              onClick={burst.onClick}
              data-cursor-hover
              className="glow-ring glow-ring-hover relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-knight-blue px-7 py-3.5 font-hud text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-knight-blue-bright"
            >
              Start A Collaboration
            </a>
          </Magnetic>
          <a
            href="#industries"
            data-cursor-hover
            className="font-hud text-xs uppercase tracking-[0.2em] text-knight-gray underline-offset-8 transition-colors hover:text-foreground hover:underline"
          >
            Explore The Work
          </a>
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-10 lg:px-10">
        <div className="hidden gap-10 font-hud text-xs uppercase tracking-[0.2em] text-knight-gray sm:flex">
          <span>Est. Entertainment / Gaming / Esports</span>
          <span className="hidden lg:inline">Automotive / Aerospace / Culture</span>
        </div>
        <div className="mx-auto flex flex-col items-center gap-2 text-knight-gray sm:mx-0">
          <span className="font-hud text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
