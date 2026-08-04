"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function useTilt<T extends HTMLElement>(intensity = 10) {
  const ref = useRef<T>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateX: py * -intensity,
      rotateY: px * intensity,
      duration: 0.4,
      ease: "power3.out",
      transformPerspective: 700,
    });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  return { ref, onMouseMove, onMouseLeave };
}
