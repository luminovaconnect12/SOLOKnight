"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Magnetic } from "@/components/motion/magnetic-button";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-knight-ink/80 backdrop-blur-md border-b border-knight-blue/15" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="#top" className="font-hud text-sm uppercase tracking-[0.3em] text-foreground" data-cursor-hover>
          Solo <span className="text-knight-blue-bright">Knight</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              className="font-hud text-xs uppercase tracking-[0.2em] text-knight-gray transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Magnetic>
            <a
              href="#contact"
              data-cursor-hover
              className="glow-ring-hover glow-ring inline-flex items-center rounded-full border border-knight-blue-bright/50 bg-knight-blue/10 px-5 py-2 font-hud text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-knight-blue/20"
            >
              Start A Project
            </a>
          </Magnetic>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[72px] z-40 flex flex-col gap-6 bg-knight-ink/98 px-8 py-12 backdrop-blur-xl lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex w-fit items-center rounded-full border border-knight-blue-bright/50 bg-knight-blue/10 px-6 py-3 font-hud text-xs uppercase tracking-[0.2em] text-foreground"
          >
            Start A Project
          </a>
          <p className="mt-auto font-hud text-xs uppercase tracking-[0.2em] text-knight-gray">
            {siteConfig.contactEmail}
          </p>
        </div>
      )}
    </header>
  );
}
