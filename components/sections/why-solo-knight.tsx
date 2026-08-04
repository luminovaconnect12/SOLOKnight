import { Reveal } from "@/components/motion/reveal";
import { FlipReveal } from "@/components/motion/flip-reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const pillars = [
  {
    title: "Cinematic Craft",
    description: "Every deliverable held to the production standard of a theatrical release.",
  },
  {
    title: "Cross-Industry Fluency",
    description: "Native to gaming, anime, motorsport, aerospace, and entertainment culture.",
  },
  {
    title: "Built For Scale",
    description: "Systems and pipelines designed for franchise-length partnerships, not one-offs.",
  },
  {
    title: "Culture-First Thinking",
    description: "We start with the audience's world, not the brand's brief.",
  },
];

export function WhySoloKnight() {
  return (
    <section className="relative bg-background py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Why Solo Knight
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mt-6 text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            The studio built for partners who refuse to look ordinary.
          </SplitHeading>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <FlipReveal
              key={pillar.title}
              delay={i * 0.1}
              className="hud-corners scanline-hover border border-knight-blue/15 bg-knight-panel/30 p-8"
            >
              <h3 className="font-display text-xl font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-3 text-sm text-knight-gray">{pillar.description}</p>
            </FlipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
