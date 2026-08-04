import { faqs } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="relative bg-knight-ink py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              FAQ
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mx-auto mt-6 max-w-xl text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl"
          >
            Questions worth answering upfront.
          </SplitHeading>
        </div>

        <div className="mt-16">
          <Accordion multiple={false} className="w-full">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 0.06} y={16} as="div">
                <AccordionItem
                  value={`item-${i}`}
                  className="border-l-2 border-l-transparent pl-4 border-knight-blue/15 transition-colors duration-300 hover:border-l-knight-blue-bright"
                >
                  <AccordionTrigger className="font-display text-left text-lg text-foreground hover:text-knight-blue-bright hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-knight-gray">{faq.answer}</AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
