"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { aspirationalBrands } from "@/lib/site-config";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

function Wordmark({ label }: { label: string }) {
  return (
    <span className="font-display text-3xl font-semibold tracking-tight text-knight-gray/70 transition-colors hover:text-foreground sm:text-4xl">
      {label}
    </span>
  );
}

export function PartnershipShowcase() {
  const rowA = aspirationalBrands.slice(0, 6);
  const rowB = aspirationalBrands.slice(6);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
    tl.set(el, { opacity: 0 })
      .to(el, { opacity: 1, duration: 0.06 })
      .to(el, { opacity: 0.15, duration: 0.05 })
      .to(el, { opacity: 1, duration: 0.05 })
      .to(el, { opacity: 0.3, duration: 0.04 })
      .fromTo(
        el,
        { opacity: 0.3, filter: "blur(6px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
      );
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-knight-blue/10 bg-knight-ink py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
            Future Collaborations
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Brands We&apos;d Love To Collaborate With
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-knight-gray">
            An aspirational list, not a client roster — the caliber of partner Solo Knight
            is built to work alongside.
          </p>
        </Reveal>
      </div>

      <div ref={wrapRef} className="mt-16 space-y-8">
        <Marquee speed={35} direction="left">
          {rowA.map((brand) => (
            <Wordmark key={brand} label={brand} />
          ))}
        </Marquee>
        <Marquee speed={30} direction="right">
          {rowB.map((brand) => (
            <Wordmark key={brand} label={brand} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
