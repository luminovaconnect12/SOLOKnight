"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function NumberGlitch({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.textContent = value;
        return;
      }

      const digits = value.length;
      const state = { t: 0 };
      gsap.to(state, {
        t: 1,
        duration: 0.5,
        ease: "steps(10)",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        onUpdate: () => {
          if (state.t >= 1) {
            el.textContent = value;
            return;
          }
          el.textContent = Array.from({ length: digits })
            .map(() => Math.floor(Math.random() * 10))
            .join("");
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
