import { services } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function Services() {
  return (
    <section id="services" className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Capabilities
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mt-6 text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Full-service creative, built for franchise-scale ambition.
          </SplitHeading>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-knight-blue/15 bg-knight-blue/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ClipReveal
              key={service.title}
              delay={(i % 3) * 0.08}
              className="group relative bg-background p-8 transition-colors duration-300 hover:bg-knight-panel/60"
            >
              <span className="font-hud text-xs text-knight-blue-bright/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-knight-gray">{service.description}</p>
              <div className="mt-6 h-px w-0 bg-knight-blue-bright transition-all duration-500 group-hover:w-12" />
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
