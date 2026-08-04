"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/hero-scene").then((m) => m.HeroScene), {
  ssr: false,
});
const OrbitScene = dynamic(() => import("@/components/three/orbit-scene").then((m) => m.OrbitScene), {
  ssr: false,
});

const scenes: Record<"hero" | "orbit", ComponentType> = {
  hero: HeroScene,
  orbit: OrbitScene,
};

export function SceneViewport({
  scene,
  className,
  fallbackClassName,
}: {
  scene: "hero" | "orbit";
  className?: string;
  fallbackClassName?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    setCanRender(!reduced && hasWebGL);
  }, []);

  const Scene = scenes[scene];

  return (
    <div ref={ref} className={cn("absolute inset-0", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-radial-fade",
          fallbackClassName,
        )}
        aria-hidden="true"
      />
      {canRender && inView && <Scene />}
    </div>
  );
}
