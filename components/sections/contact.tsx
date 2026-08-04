"use client";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGSAP } from "@gsap/react";
import { CheckCircle2, Paperclip, Send } from "lucide-react";
import {
  contactSchema,
  type ContactFormValues,
  budgetOptions,
  timelineOptions,
  industryOptions,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site-config";
import { useClickBurst } from "@/hooks/use-click-burst";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Magnetic } from "@/components/motion/magnetic-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>;
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  const burst = useClickBurst<HTMLButtonElement>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      country: "",
      goals: "",
      message: "",
      consent: false as unknown as true,
    },
  });

  useGSAP(
    () => {
      if (!submitted || !confirmRef.current) return;
      const el = confirmRef.current;
      const rings = el.querySelectorAll<HTMLElement>("[data-blast-ring]");
      const icon = el.querySelector<HTMLElement>("[data-blast-icon]");

      const tl = gsap.timeline();
      tl.fromTo(el, { opacity: 0, y: 24, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" });
      if (icon) {
        tl.fromTo(icon, { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.2)" }, "-=0.3");
      }
      rings.forEach((ring, i) => {
        tl.fromTo(
          ring,
          { scale: 0.4, opacity: 0.8 },
          { scale: 2.4, opacity: 0, duration: 1.1, ease: "power2.out" },
          i === 0 ? "-=0.4" : "-=0.9",
        );
      });
    },
    { dependencies: [submitted] },
  );

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong sending your message. Please try again or email us directly.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-background py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-knight-blue/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center">
          <Reveal>
            <p className="font-hud text-xs uppercase tracking-[0.4em] text-knight-blue-bright">
              Contact
            </p>
          </Reveal>
          <SplitHeading
            as="h2"
            type="words"
            className="mx-auto mt-6 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Let&apos;s build the partnership no one saw coming.
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-lg text-sm text-knight-gray">
              Tell us about your brand and your ambition. A member of the team responds
              within two business days — or email us directly at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-knight-blue-bright hover:underline">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {submitted ? (
            <div
              ref={confirmRef}
              className="hud-corners glow-ring relative flex flex-col items-center gap-4 overflow-hidden border border-knight-blue/20 bg-knight-panel/50 px-8 py-20 text-center"
            >
              <span
                data-blast-ring
                className="pointer-events-none absolute h-24 w-24 rounded-full border border-knight-blue-bright/70"
                aria-hidden="true"
              />
              <span
                data-blast-ring
                className="pointer-events-none absolute h-24 w-24 rounded-full border border-knight-blue-bright/50"
                aria-hidden="true"
              />
              <span
                data-blast-ring
                className="pointer-events-none absolute h-24 w-24 rounded-full border border-knight-blue-bright/30"
                aria-hidden="true"
              />
              <span data-blast-icon className="relative">
                <CheckCircle2 className="h-12 w-12 text-knight-blue-bright" />
              </span>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Transmission received.
              </h3>
              <p className="max-w-md text-sm text-knight-gray">
                Thank you for reaching out to Solo Knight. Our team will review your project
                and respond within two business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="hud-corners border border-knight-blue/15 bg-knight-panel/30 p-6 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Name</Label>
                  <Input id="name" className="mt-2" aria-invalid={!!errors.name} {...register("name")} />
                  <FieldError message={errors.name?.message} />
                </div>
                <div>
                  <Label htmlFor="company" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Company</Label>
                  <Input id="company" className="mt-2" aria-invalid={!!errors.company} {...register("company")} />
                  <FieldError message={errors.company?.message} />
                </div>
                <div>
                  <Label htmlFor="position" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Position</Label>
                  <Input id="position" className="mt-2" aria-invalid={!!errors.position} {...register("position")} />
                  <FieldError message={errors.position?.message} />
                </div>
                <div>
                  <Label htmlFor="email" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Email</Label>
                  <Input id="email" type="email" className="mt-2" aria-invalid={!!errors.email} {...register("email")} />
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Phone (optional)</Label>
                  <Input id="phone" type="tel" className="mt-2" {...register("phone")} />
                </div>
                <div>
                  <Label htmlFor="country" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Country</Label>
                  <Input id="country" className="mt-2" aria-invalid={!!errors.country} {...register("country")} />
                  <FieldError message={errors.country?.message} />
                </div>

                <div>
                  <Label className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Industry</Label>
                  <Controller
                    control={control}
                    name="industry"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-2 w-full" aria-invalid={!!errors.industry}>
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError message={errors.industry?.message} />
                </div>

                <div>
                  <Label className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Project Budget</Label>
                  <Controller
                    control={control}
                    name="budget"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-2 w-full" aria-invalid={!!errors.budget}>
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError message={errors.budget?.message} />
                </div>

                <div>
                  <Label className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Timeline</Label>
                  <Controller
                    control={control}
                    name="timeline"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="mt-2 w-full" aria-invalid={!!errors.timeline}>
                          <SelectValue placeholder="Select a timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError message={errors.timeline?.message} />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="goals" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Project Goals</Label>
                <Textarea id="goals" rows={2} className="mt-2" aria-invalid={!!errors.goals} {...register("goals")} />
                <FieldError message={errors.goals?.message} />
              </div>

              <div className="mt-6">
                <Label htmlFor="message" className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Message</Label>
                <Textarea id="message" rows={4} className="mt-2" aria-invalid={!!errors.message} {...register("message")} />
                <FieldError message={errors.message?.message} />
              </div>

              <div className="mt-6">
                <Label className="font-hud text-xs uppercase tracking-[0.15em] text-knight-gray">Attachment (optional)</Label>
                <label
                  htmlFor="attachment"
                  className="mt-2 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-knight-blue/30 px-4 py-3 text-sm text-knight-gray transition-colors hover:border-knight-blue-bright/60 hover:text-foreground"
                >
                  <Paperclip className="h-4 w-4" />
                  {fileName ?? "Attach a deck, brief, or reference file"}
                </label>
                <input
                  id="attachment"
                  type="file"
                  className="sr-only"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
              </div>

              <div className="mt-8 flex items-start gap-3">
                <Controller
                  control={control}
                  name="consent"
                  render={({ field }) => (
                    <Checkbox
                      id="consent"
                      checked={field.value === true}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      aria-invalid={!!errors.consent}
                    />
                  )}
                />
                <Label htmlFor="consent" className="text-sm font-normal leading-snug text-knight-gray">
                  I consent to Solo Knight storing and using this information to respond to my
                  inquiry.
                </Label>
              </div>
              <FieldError message={errors.consent?.message} />

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Magnetic>
                  <button
                    ref={burst.ref}
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor-hover
                    onClick={burst.onClick}
                    className={cn(
                      "glow-ring glow-ring-hover relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-knight-blue px-7 py-3.5 font-hud text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-knight-blue-bright disabled:opacity-60",
                    )}
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </Magnetic>
                <p className="text-xs text-knight-gray">
                  Prefer a call? Calendar scheduling is coming soon — email us in the meantime.
                </p>
              </div>
              {serverError && <p className="mt-4 text-sm text-destructive">{serverError}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
