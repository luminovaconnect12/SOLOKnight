"use client";

import { useRef, type MouseEvent } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function useClickBurst<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onClick = (e: MouseEvent<T>) => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const burst = document.createElement("span");
    burst.style.position = "absolute";
    burst.style.left = `${e.clientX - rect.left}px`;
    burst.style.top = `${e.clientY - rect.top}px`;
    burst.style.width = "8px";
    burst.style.height = "8px";
    burst.style.marginLeft = "-4px";
    burst.style.marginTop = "-4px";
    burst.style.borderRadius = "9999px";
    burst.style.background = "rgba(255,255,255,0.9)";
    burst.style.pointerEvents = "none";
    el.appendChild(burst);

    gsap.fromTo(
      burst,
      { scale: 0.5, opacity: 0.9 },
      {
        scale: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => burst.remove(),
      },
    );
  };

  return { ref, onClick };
}
