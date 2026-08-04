"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    gsap.set(bar, { scaleX: 0 });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-knight-blue via-knight-blue-bright to-knight-blue shadow-[0_0_12px_1px_rgba(111,143,255,0.8)]"
      />
    </div>
  );
}
