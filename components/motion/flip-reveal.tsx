"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function FlipReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, rotateX: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, rotateX: -75, y: 30, transformPerspective: 800, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1,
          delay,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
