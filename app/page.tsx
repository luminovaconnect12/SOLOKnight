import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Vision } from "@/components/sections/vision";
import { Industries } from "@/components/sections/industries";
import { PartnershipShowcase } from "@/components/sections/partnership-showcase";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { WhySoloKnight } from "@/components/sections/why-solo-knight";
import { Timeline } from "@/components/sections/timeline";
import { Gallery } from "@/components/sections/gallery";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Vision />
      <Industries />
      <PartnershipShowcase />
      <Services />
      <Process />
      <WhySoloKnight />
      <Timeline />
      <Gallery />
      <Faq />
      <Contact />
    </>
  );
}
