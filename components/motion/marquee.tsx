"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export function Marquee({
  children,
  speed = 40,
  direction = "left",
  className,
}: {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const distance = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: direction === "left" ? -distance : distance,
      duration: distance / speed,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  return (
    <div className={`overflow-hidden mask-fade-x ${className ?? ""}`}>
      <div ref={trackRef} className="flex w-max items-center gap-16 will-change-transform">
        {children}
        {children}
      </div>
    </div>
  );
}
