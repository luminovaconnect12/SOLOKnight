"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { BOOT_DONE_EVENT } from "@/hooks/use-boot-ready";

const STORAGE_KEY = "sk-boot-seen";

export function BootIntro() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const blastRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (reduced || seen) {
      window.dispatchEvent(new Event(BOOT_DONE_EVENT));
      return;
    }
    setShow(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useGSAP(
    () => {
      if (!show || !rootRef.current) return;
      registerGsap();
      document.body.style.overflow = "hidden";

      const counter = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          window.dispatchEvent(new Event(BOOT_DONE_EVENT));
          setShow(false);
        },
      });

      tl.fromTo(
        wordRef.current,
        { opacity: 0, letterSpacing: "0.6em", filter: "blur(8px)" },
        { opacity: 1, letterSpacing: "0.3em", filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
      )
        .to(
          counter,
          {
            val: 100,
            duration: 1.1,
            ease: "power1.inOut",
            onUpdate: () => {
              if (pctRef.current) pctRef.current.textContent = `${Math.round(counter.val)}%`;
              if (barRef.current) barRef.current.style.transform = `scaleX(${counter.val / 100})`;
            },
          },
          "-=0.3",
        )
        .fromTo(
          blastRef.current,
          { scale: 0, opacity: 1 },
          { scale: 28, opacity: 0, duration: 0.85, ease: "power4.out" },
          "+=0.05",
        )
        .to(rootRef.current, { autoAlpha: 0, duration: 0.4 }, "-=0.45");

      return () => {
        tl.kill();
      };
    },
    { dependencies: [show] },
  );

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-knight-ink"
      aria-hidden="true"
    >
      <div className="bg-hud-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        ref={blastRef}
        className="pointer-events-none absolute h-24 w-24 rounded-full bg-knight-blue-bright opacity-0"
        style={{ boxShadow: "0 0 120px 60px rgba(111,143,255,0.6)" }}
      />
      <div ref={wordRef} className="font-hud text-lg uppercase text-foreground sm:text-2xl">
        Solo<span className="text-knight-blue-bright">Knight</span>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px w-40 overflow-hidden bg-knight-blue/20 sm:w-56">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-knight-blue-bright" />
        </div>
        <span ref={pctRef} className="font-hud text-xs text-knight-gray">0%</span>
      </div>
      <p className="mt-4 font-hud text-[10px] uppercase tracking-[0.3em] text-knight-gray">
        Initializing Creative Systems
      </p>
    </div>
  );
}
