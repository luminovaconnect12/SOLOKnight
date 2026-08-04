"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function Materialize({
  children,
  className,
  delay = 0,
  index = 0,
  rotate = 6,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" });
        return;
      }

      const dir = index % 2 === 0 ? 1 : -1;

      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.82, rotate: rotate * dir, filter: "blur(6px)" },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
