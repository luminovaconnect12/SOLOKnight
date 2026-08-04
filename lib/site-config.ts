export const siteConfig = {
  name: "Solo Knight",
  legalName: "Solo Knight",
  tagline: "Creating The Future Of Entertainment Partnerships.",
  description:
    "Solo Knight is a futuristic creative entertainment and promotional studio building world-class collaborations across gaming, anime, esports, entertainment, technology, aerospace, and automotive culture.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://soloknight.vercel.app",
  contactEmail: "hello@soloknight.com",
  social: {
    instagram: "https://instagram.com/soloknight",
    x: "https://x.com/soloknight",
    youtube: "https://youtube.com/@soloknight",
  },
} as const;

export const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Industries", href: "#industries" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export type Industry = {
  id: string;
  title: string;
  description: string;
  stat: string;
};

export const industries: Industry[] = [
  {
    id: "gaming",
    title: "Gaming",
    description:
      "AAA campaign design, in-universe activations, and launch-day spectacle for the platforms players live on.",
    stat: "01",
  },
  {
    id: "anime",
    title: "Anime & Animation",
    description:
      "Cross-cultural creative that honors source material while building bridges to global fandoms.",
    stat: "02",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description:
      "Franchise-scale storytelling, premieres, and cinematic promotion built for the biggest screens.",
    stat: "03",
  },
  {
    id: "esports",
    title: "Esports",
    description:
      "Arena-grade broadcast identity, team branding, and fan-activation for competitive gaming's biggest stages.",
    stat: "04",
  },
  {
    id: "automotive",
    title: "Automotive",
    description:
      "Performance-driven storytelling for the machines built to break records — from concept reveal to track day.",
    stat: "05",
  },
  {
    id: "aerospace",
    title: "Aerospace & Defense",
    description:
      "Mission-grade visual language for organizations operating at the edge of the atmosphere and beyond.",
    stat: "06",
  },
  {
    id: "japan",
    title: "Japan & Tourism",
    description:
      "Culturally fluent promotional design connecting global audiences to Japan's creative export economy.",
    stat: "07",
  },
  {
    id: "technology",
    title: "Technology",
    description:
      "Product reveals and brand systems for companies building what comes next.",
    stat: "08",
  },
];

export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  { title: "Creative Promotion", description: "Full-funnel campaign concepts built to dominate culture, not just a channel." },
  { title: "Brand Collaborations", description: "Co-branded programs that make two audiences feel like they gained something." },
  { title: "Content Creation", description: "Cinematic film, motion, and stills produced at franchise quality." },
  { title: "Event Promotion", description: "Launch moments engineered for the front page and the group chat." },
  { title: "Gaming Campaigns", description: "In-game, out-of-game, and everywhere players actually pay attention." },
  { title: "Entertainment Marketing", description: "Theatrical, streaming, and franchise marketing with cinematic craft." },
  { title: "Social Campaigns", description: "Native-first creative built for the feed, not bolted onto it." },
  { title: "Esports Promotion", description: "Broadcast packages and fan programs for competitive gaming orgs." },
  { title: "Travel Promotions", description: "Destination storytelling that turns curiosity into a booked ticket." },
  { title: "Japanese Campaigns", description: "Localized creative that respects craft on both sides of the Pacific." },
  { title: "Experiential Marketing", description: "Physical activations built to be filmed, shared, and remembered." },
  { title: "Creative Consulting", description: "Embedded strategic partnership for teams building something ambitious." },
];

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { index: "01", title: "Signal", description: "We study the culture around your brand before we design a single frame." },
  { index: "02", title: "Concept", description: "Big, ownable creative territory — built to survive contact with the real world." },
  { index: "03", title: "Build", description: "Production at franchise quality, across film, motion, and experience design." },
  { index: "04", title: "Launch", description: "Coordinated deployment engineered for maximum cultural impact." },
  { index: "05", title: "Amplify", description: "We stay in the room after launch, tuning the campaign against real signal." },
];

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  { year: "Phase 01", title: "Founding Signal", description: "Solo Knight is founded on a single premise: entertainment partnerships deserve cinematic craft." },
  { year: "Phase 02", title: "Creative Systems", description: "We build the internal frameworks — brand systems, production pipelines, creative technology." },
  { year: "Phase 03", title: "First Collaborations", description: "Pilot programs across gaming and entertainment prove the model at speed." },
  { year: "Phase 04", title: "Global Reach", description: "Expansion into esports, automotive, aerospace, and international markets." },
  { year: "Phase 05", title: "The Next Chapter", description: "Solo Knight becomes the studio the biggest brands in the world call first." },
];

export const aspirationalBrands = [
  "MARVEL",
  "DISNEY",
  "PLAYSTATION",
  "NINTENDO",
  "SEGA",
  "CAPCOM",
  "MONSTER ENERGY",
  "PEPSI",
  "REEBOK",
  "NASA",
  "U.S. AIR FORCE",
  "CORVETTE",
] as const;

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "What kind of brands does Solo Knight partner with?",
    answer:
      "We're built for entertainment, gaming, anime, esports, automotive, aerospace, and technology brands that want promotional creative with cinematic craft — from global franchises to ambitious challengers.",
  },
  {
    question: "Is Solo Knight an agency?",
    answer:
      "We operate like a creative studio embedded in your team — strategy, production, and launch under one roof, not a hand-off between vendors.",
  },
  {
    question: "Do you work with early-stage or first-time partners?",
    answer:
      "Yes. Some of our best work has come from brands taking their first swing at a culture-scale campaign. We scope to ambition, not headcount.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "Most partnerships begin with a Signal phase — a short, focused study of your brand and audience — before we propose a creative territory and production plan.",
  },
  {
    question: "How do we start a conversation?",
    answer:
      "Use the contact form below with as much detail as you can share. A member of the team will respond within two business days.",
  },
];
