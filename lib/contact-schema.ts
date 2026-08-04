import { z } from "zod";

export const budgetOptions = [
  "Under $25K",
  "$25K – $100K",
  "$100K – $500K",
  "$500K+",
  "Not yet defined",
] as const;

export const timelineOptions = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Exploratory",
] as const;

export const industryOptions = [
  "Gaming",
  "Anime & Animation",
  "Entertainment",
  "Esports",
  "Automotive",
  "Aerospace & Defense",
  "Japan & Tourism",
  "Technology",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  company: z.string().trim().min(2, "Enter your company name."),
  position: z.string().trim().min(2, "Enter your role."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  country: z.string().trim().min(2, "Enter your country."),
  budget: z.enum(budgetOptions, { message: "Select a project budget." }),
  industry: z.enum(industryOptions, { message: "Select an industry." }),
  timeline: z.enum(timelineOptions, { message: "Select a timeline." }),
  goals: z.string().trim().min(10, "Give us a sentence on your goals."),
  message: z.string().trim().min(20, "Tell us a bit more (20+ characters)."),
  consent: z.literal(true, { message: "Consent is required to submit." }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
