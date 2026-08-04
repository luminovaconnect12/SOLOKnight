import { navLinks, siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-knight-blue/15 bg-knight-ink">
      <div className="bg-hud-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <Reveal y={20} className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-hud text-sm uppercase tracking-[0.3em] text-foreground">
              Solo<span className="text-knight-blue-bright">Knight</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-knight-gray">{siteConfig.description}</p>
          </div>

          <div>
            <p className="font-hud text-xs uppercase tracking-[0.2em] text-knight-blue-bright">Navigate</p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-knight-gray transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-hud text-xs uppercase tracking-[0.2em] text-knight-blue-bright">Studio</p>
            <ul className="mt-4 space-y-3 text-sm text-knight-gray">
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="transition-colors hover:text-foreground">
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>Remote-first &middot; Global</li>
            </ul>
          </div>

          <div>
            <p className="font-hud text-xs uppercase tracking-[0.2em] text-knight-blue-bright">Connect</p>
            <ul className="mt-4 space-y-3 text-sm text-knight-gray">
              <li>
                <a href={siteConfig.social.instagram} className="transition-colors hover:text-foreground" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.social.x} className="transition-colors hover:text-foreground" target="_blank" rel="noreferrer">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href={siteConfig.social.youtube} className="transition-colors hover:text-foreground" target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-knight-blue/10 pt-8 text-xs text-knight-gray sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Solo Knight. All rights reserved.</p>
          <p className="font-hud uppercase tracking-[0.2em]">Creating The Future Of Entertainment Partnerships.</p>
        </div>
      </Reveal>
    </footer>
  );
}
