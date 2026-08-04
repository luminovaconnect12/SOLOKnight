"use client";

import { useRef, createElement } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText, registerGsap, prefersReducedMotion } from "@/lib/gsap";

gsap.registerPlugin(useGSAP);

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type SplitHeadingProps = {
  children: string;
  as?: HeadingTag;
  className?: string;
  type?: "chars" | "words" | "lines";
  delay?: number;
  trigger?: "load" | "scroll";
  start?: string;
};

export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  type = "words",
  delay = 0,
  trigger = "scroll",
  start = "top 85%",
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      let split: SplitText | undefined;

      const run = () => {
        split = new SplitText(el, {
          type,
          mask: type,
        });
        const targets = type === "chars" ? split.chars : type === "lines" ? split.lines : split.words;

        gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          targets,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            stagger: type === "chars" ? 0.015 : 0.06,
            ease: "power4.out",
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: el, start, toggleActions: "play none none none" }
                : undefined,
          },
        );
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => {
        split?.revert();
      };
    },
    { scope: ref, dependencies: [children] },
  );

  return createElement(
    Tag,
    { ref: ref as never, className, style: { opacity: 0 } },
    children,
  );
}
