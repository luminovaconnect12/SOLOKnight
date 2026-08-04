"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function ClipReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const startClip = direction === "up" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";

      if (prefersReducedMotion()) {
        gsap.set(el, { clipPath: "inset(0 0 0 0)", opacity: 1 });
        return;
      }

      gsap.set(el, { clipPath: startClip });
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        delay,
        ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
