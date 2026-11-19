// All site copy lives here so it can be edited without touching layout code.
// Anything marked "TODO" is still a placeholder: see README.md → "Still to fill in".

/* ------------------------------------------------------------------ */
/* Site-wide details                                                   */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Nashwave",
  url: "https://nashwave.tech",
  title: "Nashwave | Media Marketing & Digital Solutions — Turn the Tide. Move the Business.",
  description:
    "Nashwave is a media marketing and digital solutions company that turns business challenges and digital shifts into momentum through creativity and technology.",
  tagline: "Turn the Tide. Move the Business.",
  email: "hello@nashwave.tech",
  /** TODO: phone number as it should be displayed, e.g. "+44 20 1234 5678". Hidden while empty. */
  phone: "",
  /** TODO: the same number for the tel: link, digits and + only, e.g. "+442012345678". */
  phoneTel: "",
  /** TODO: city / country line shown on the contact page, e.g. "London, UK". Hidden while empty. */
  city: "",
  /** TODO: full profile URLs. Any link left empty is hidden everywhere on the site. */
  social: {
    linkedin: "",
    instagram: "",
    youtube: "",
  },
  /**
   * TODO: the showreel. A YouTube or Vimeo link, or a direct video file URL (e.g. "/assets/reel.mp4").
   * While empty, the "Showreel footage coming soon" placeholder is shown instead.
   */
  showreelUrl: "",
  /** Default share image used by every page unless the page sets its own. */
  shareImage: "/assets/nashwave-ocean.jpg",
};

export const socialLinks = [
  { name: "LinkedIn", href: site.social.linkedin },
  { name: "Instagram", href: site.social.instagram },
  { name: "YouTube", href: site.social.youtube },
].filter((link) => link.href !== "");

/* ------------------------------------------------------------------ */
/* Routes & navigation (used by Header, Footer, sitemap and links)     */
/* ------------------------------------------------------------------ */

export const routes = {
  home: "/",
  about: "/about",
  approach: "/about#approach",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  work: "/work",
  contact: "/contact",
  contactFor: (slug: string) => `/contact?service=${slug}`,
  privacy: "/privacy",
  terms: "/terms",
};

/** Main navigation. `match` is the path prefix that marks the item as the active page. */
export const navLinks = [
  { name: "About", href: routes.about, match: routes.about },
  { name: "Services", href: routes.services, match: routes.services },
  { name: "Approach", href: routes.approach, match: null },
  { name: "Work", href: routes.work, match: routes.work },
];

export const footerNav = {
  servicesTitle: "Services",
  companyTitle: "Company",
  connectTitle: "Connect",
  company: [
    { name: "About", href: routes.about },
    { name: "Approach", href: routes.approach },
    { name: "Work", href: routes.work },
    { name: "Contact", href: routes.contact },
  ],
  blurb: "Media, marketing and digital solutions that turn change into momentum.",
  rights: "Nashwave. All rights reserved.",
  privacy: "Privacy",
  terms: "Terms",
};

/** Small interface strings shared across components. */
export const ui = {
  startProject: "Start a project",
  mobileContact: "Contact",
  toggleNav: "Toggle navigation",
  homeLogoLabel: "Nashwave home",
  learnMore: "Learn more →",
  learnMoreLabel: "Learn more about",
  breadcrumbHome: "Home",
  breadcrumbServices: "Services",
  breadcrumbLabel: "Breadcrumb",
  prevQuote: "Previous quote",
  nextQuote: "Next quote",
  placeholderTag: "Placeholder",
  sampleTestimonial: "Sample testimonial — replace before launch",
  sampleClients: "Sample client names — replace before launch",
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = [
  {
    slug: "brand-creative",
    number: "01",
    title: "Brand & Creative",
    copy: "Brand identity, positioning, messaging and creative direction that make you impossible to confuse with anyone else.",
    includes: ["Brand identity", "Positioning", "Messaging", "Creative direction"],
  },
  {
    slug: "media-content-production",
    number: "02",
    title: "Media & Content Production",
    copy: "Video, photography, motion graphics and campaign content, produced end to end.",
    includes: ["Video", "Photography", "Motion graphics", "Campaign content"],
  },
  {
    slug: "social-community",
    number: "03",
    title: "Social & Community",
    copy: "Social strategy, content calendars, influencer collaborations and community management.",
    includes: ["Social strategy", "Content calendars", "Influencer collaborations", "Community management"],
  },
  {
    slug: "websites-digital-products",
    number: "04",
    title: "Websites & Digital Products",
    copy: "Fast, beautiful websites, landing pages and apps built to convert.",
    includes: ["Websites", "Landing pages", "Apps"],
  },
  {
    slug: "web-apps-data-automation",
    number: "05",
    title: "Web Apps, Data, Automation & Insight",
    copy: "Custom web apps, analytics, tracking, CRM integrations and automated workflows that make operations clearer, faster and easier to scale.",
    includes: ["Custom web apps", "Analytics", "Tracking", "CRM integrations", "Automated workflows"],
  },
  {
    slug: "brand-assets-design",
    number: "06",
    title: "Brand Assets Design",
    copy: "Custom digital assets including emails, reminders, decks, plans and catalogues, plus practical print-ready designs shaped around your business.",
    includes: ["Emails", "Reminders", "Decks", "Plans", "Catalogues", "Print-ready designs"],
  },
];

export type Service = (typeof services)[number];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* Why us, approach, clients, testimonials, case studies               */
/* ------------------------------------------------------------------ */

/** The homepage shows the first 3; /about shows all 6. */
export const reasons = [
  {
    title: "Momentum over noise.",
    copy: "Every idea is tied to a business outcome, so effort turns into movement.",
  },
  {
    title: "Creativity with a commercial spine.",
    copy: "Bold ideas, always checked against your goals and your budget.",
  },
  {
    title: "Technology-fluent.",
    copy: "We build, automate and measure, so strategy and execution never drift apart.",
  },
  {
    title: "One integrated team.",
    copy: "Media, marketing and digital under one roof, with no hand-off gaps.",
  },
  {
    title: "Built for change.",
    copy: "We treat digital shifts as openings, and move fast when the market does.",
  },
  {
    title: "Clear, honest partnership.",
    copy: "Transparent reporting, plain language and no surprises.",
  },
];

export const steps = [
  {
    title: "Discover",
    eyebrow: "Nice to meet you",
    copy: "We listen first: your business, audience, market and what is holding you back.",
  },
  {
    title: "Strategise",
    eyebrow: "It all starts with a plan",
    copy: "We turn insight into a clear plan: positioning, channels, goals and measurement.",
  },
  {
    title: "Create",
    eyebrow: "Let's get creative",
    copy: "Our creative and tech teams produce the content, design and digital experiences.",
  },
  {
    title: "Activate",
    eyebrow: "Showtime",
    copy: "We launch across the right channels, at the right moment, with the right message.",
  },
  {
    title: "Optimise",
    eyebrow: "Again, but better",
    copy: "We track, test and refine, so every cycle performs better than the last.",
  },
];

/**
 * TODO: real client names (or swap for logo images later).
 * While `clientsArePlaceholder` is true, the logo strip is labelled as sample content.
 */
export const clients = ["NORTH/CO", "KINETIC", "ALTURA", "MORROW", "FOLD", "VERA", "METRIC", "AFTER"];
export const clientsArePlaceholder = true;

/**
 * TODO: real testimonials. Set `placeholder: false` on each one once it is a genuine, approved quote;
 * until then it is shown with a "Sample testimonial" label.
 */
export const quotes = [
  {
    text: "Nashwave gave us more than a campaign. They gave the whole business a clearer sense of where to go next.",
    author: "Client name",
    role: "Marketing Director, Company",
    placeholder: true,
  },
  {
    text: "They work like part of the team—commercially sharp, creatively brave and always accountable to the result.",
    author: "Client name",
    role: "Founder, Company",
    placeholder: true,
  },
  {
    text: "Strategy, content and technology finally moved in the same direction. That changed the pace of our growth.",
    author: "Client name",
    role: "Chief Growth Officer, Company",
    placeholder: true,
  },
];

export type CaseStudy = {
  title: string;
  client: string;
  /** Slug of the related service, e.g. "brand-creative". */
  service: string;
  summary: string;
  /** Image path under /public, e.g. "/assets/case-acme.jpg". */
  image: string;
  /** Optional link to a full write-up. */
  href?: string;
};

/** TODO: add case studies here. While empty, /work shows a "Case studies coming soon" placeholder. */
export const caseStudies: CaseStudy[] = [];


/* ------------------------------------------------------------------ */
/* Section copy                                                        */
/* ------------------------------------------------------------------ */

export const heroSection = {
  eyebrow: "Media · Marketing · Digital Solutions",
  cursorWords: ["Brand", "Strategy", "Apps", "Digital", "Solutions", "Growth", "Brand", "Strategy"],
};

export const taglineSection = {
  line1: "Turn the Tide.",
  line2: "Move the Business",
  intro:
    "We turn business challenges and digital shifts into momentum, using creativity and technology to move brands forward.",
  primaryCta: "Start a Project",
  secondaryCta: "See What We Do",
  scrollCue: "Scroll to ride the wave",
};

export const showreelSection = {
  label: "In Motion",
  title: "See the work move.",
  intro:
    "Strategy, content, campaigns and digital products, all in one flow. Here is Nashwave in sixty seconds.",
  playLabel: "Play Nashwave showreel",
  playButton: "Play reel",
  previewAlt: "Nashwave showreel preview",
  kineticWords: ["Create.", "Connect.", "Convert.", "Grow."],
  footerLine: "Media. Marketing. Digital. One team, one wave.",
  watchFull: "Watch full reel →",
  dialogLabel: "Nashwave showreel",
  close: "Close showreel",
  comingSoonTitle: "Showreel footage coming soon.",
  comingSoonNote: "Replace this placeholder with the final 45–60 second production reel.",
};

export const aboutSection = {
  label: "Meet Nashwave",
  titleLine1: "When the market shifts,",
  titleLine2: "we see a ",
  titleEmphasis: "wave.",
  intro:
    "Markets shift. We turn those shifts into sharper stories, stronger digital experiences and momentum that moves brands forward.",
  approachLink: "Discover our approach",
  imageAlt: "Layered white floor with a flowing wave texture",
  povTag: "POV",
  povLead: "Challenges are just currents.",
  povAccent: "The right strategy turns them into movement.",
};

export const servicesSection = {
  label: "Our Services",
  title: "Everything a brand needs to move.",
  intro: "Six connected capabilities, built to work alone or as one integrated engine.",
  allLink: "Explore all services",
};

export const whyUsSection = {
  label: "Why Us",
  titleLead: "Creative that thinks like a business.",
  titleAccent: "Technology that thinks like a creative.",
  intro:
    "We believe marketing should do more than look good. It should move something: an audience, a number, a decision.",
  extension: "We work as an extension of your team: close, curious and accountable to results.",
};

export const approachSection = {
  label: "How We Work",
  title: "Process",
  cornerTop: "How we work together",
  cornerBottom: "Step by step",
  intro: "Five steps that turn a challenge into a campaign, and a campaign into growth.",
  cta: "Start with a conversation",
};

export const clientsSection = {
  label: "Trusted By",
  title: "Brands that chose to move with us.",
};

export const caseStudiesSection = {
  label: "Case Studies",
  title: "Selected work.",
  emptyTitle: "Case studies coming soon.",
  emptyCopy: "Selected projects will be published here soon. In the meantime, let's talk about yours.",
  emptyCta: "Start a project",
  readMore: "Read case study →",
};

export const contactSection = {
  label: "Let's Talk",
  titleLine1: "Start a project",
  titleLine2: "with us.",
  intro: "Tell us what you are facing and where you want to go. We will reply within one working day.",
  sentTag: "Brief received",
  sentTitle: "Thanks. Your message has landed.",
  sentCopy: "We will be in touch within one working day.",
  fields: {
    name: "Name",
    email: "Work email",
    company: "Company",
    service: "What do you need?",
    servicePlaceholder: "Select a service",
    serviceAddAnother: "Add another service",
    serviceRemove: "Remove",
    serviceSelectedLabel: "Selected services",
    serviceUnsure: "Not sure yet",
    message: "Tell us about your project",
  },
  honeypot: "Don't fill this out:",
  submit: "Send my brief",
  sending: "Sending…",
  error: "Something went wrong. Please try again or email us at",
  asideTitle: "Get in touch",
  cardLine: "Close, curious and accountable to results.",
};

export const finalCtaSection = {
  label: "One last thing",
  titleLine1: "The tide is turning.",
  titleLine2: "Be ready to move.",
  intro: "Whether you are facing a challenge or chasing an opportunity, let's start the conversation.",
  cta: "Start a Project",
  emailPrefix: "Or write to us at",
};

export const serviceDetail = {
  includesLabel: "What's Included",
  includesTitle: "What's included.",
  otherLabel: "Keep Exploring",
  otherTitle: "Other services.",
  ctaLabel: "Start a project",
};

export const notFoundPage = {
  label: "404",
  title: "This page drifted off.",
  copy: "The page you are looking for doesn't exist or has moved. Let's get you back on course.",
  links: [
    { name: "Back to home", href: routes.home },
    { name: "Our services", href: routes.services },
    { name: "Start a project", href: routes.contact },
  ],
};

/* ------------------------------------------------------------------ */
/* Page metadata (title, description, share image)                     */
/* ------------------------------------------------------------------ */

export const pageMeta = {
  about: {
    title: "About",
    description:
      "Meet Nashwave: a media, marketing and digital team that turns business challenges and digital shifts into momentum.",
    image: "/assets/nashwave-white-wave-floor.png",
  },
  services: {
    title: "Services",
    description: "Six connected capabilities, built to work alone or as one integrated engine.",
    image: "/assets/nashwave-ocean.jpg",
  },
  work: {
    title: "Work",
    description:
      "Strategy, content, campaigns and digital products, all in one flow. See the work move.",
    image: "/assets/nashwave-workspace.jpg",
  },
  contact: {
    title: "Contact",
    description:
      "Tell us what you are facing and where you want to go. We will reply within one working day.",
    image: "/assets/nashwave-ocean.jpg",
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Nashwave collects, uses and protects personal information.",
    image: "/assets/nashwave-ocean.jpg",
  },
  terms: {
    title: "Terms of Use",
    description: "The terms that apply when you use the Nashwave website.",
    image: "/assets/nashwave-ocean.jpg",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for doesn't exist or has moved.",
  },
};

/* ------------------------------------------------------------------ */
/* Legal pages                                                         */
/* ------------------------------------------------------------------ */

/*
 * ⚠️ LEGAL REVIEW REQUIRED ⚠️
 * The privacy and terms text below is a generic starting template, NOT legal advice.
 * Have it reviewed (and completed) by a qualified lawyer before launch.
 */
export const legal = {
  /** TODO: registered legal entity name, e.g. "Nashwave Ltd". */
  entityName: "[TODO: legal entity name]",
  /** TODO: registered business address. */
  address: "[TODO: registered address]",
  /** TODO: date these policies take effect, e.g. "1 January 2027". */
  effectiveDate: "[TODO: effective date]",
  label: "Legal",
  effectiveLabel: "Effective date",
  reviewNote: "Draft template — this page must be reviewed by a qualified lawyer before launch.",
};

export const privacyPage = {
  title: "Privacy Policy",
  intro: `This policy explains how ${legal.entityName} ("Nashwave", "we", "us") handles personal information collected through this website.`,
  sections: [
    {
      heading: "Information we collect",
      body: [
        "When you use our contact form we collect the details you provide: your name, work email, company, the services you are interested in and your message.",
        "Our hosting provider may also record standard technical information such as IP address, browser type and the pages you visit.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "We use the information you send us to reply to your enquiry and to discuss a potential project with you.",
        "[TODO: describe any other uses, such as analytics or marketing emails, and the legal basis for each.]",
      ],
    },
    {
      heading: "Sharing your information",
      body: [
        "Form submissions are processed by our website host (Netlify) on our behalf. We do not sell your personal information.",
        "[TODO: list any other processors or third parties.]",
      ],
    },
    {
      heading: "How long we keep it",
      body: ["[TODO: state how long enquiries and related data are retained.]"],
    },
    {
      heading: "Your rights",
      body: [
        `You can ask us to access, correct or delete the personal information we hold about you by emailing ${site.email}.`,
        "[TODO: add the rights that apply in your jurisdiction and how to complain to the relevant authority.]",
      ],
    },
    {
      heading: "Contact",
      body: [`${legal.entityName}, ${legal.address}. Email: ${site.email}.`],
    },
  ],
};

export const termsPage = {
  title: "Terms of Use",
  intro: `These terms apply to your use of this website, operated by ${legal.entityName} ("Nashwave", "we", "us"). By using the site you agree to them.`,
  sections: [
    {
      heading: "Use of the website",
      body: [
        "You may browse and share this website for personal and business information purposes. Please do not misuse it or attempt to disrupt it.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The content, branding and design of this website belong to Nashwave or its licensors unless stated otherwise.",
      ],
    },
    {
      heading: "No professional advice",
      body: [
        "Information on this website is general. Any project work is governed by a separate written agreement.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: ["[TODO: liability wording to be provided by your lawyer.]"],
    },
    {
      heading: "Governing law",
      body: ["[TODO: governing law and jurisdiction.]"],
    },
    {
      heading: "Contact",
      body: [`${legal.entityName}, ${legal.address}. Email: ${site.email}.`],
    },
  ],
};
