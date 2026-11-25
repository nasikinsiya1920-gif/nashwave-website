// All site copy lives here so it can be edited without touching layout code.
// Anything marked "TODO" is still a placeholder: see README.md → "Still to fill in".

/* ------------------------------------------------------------------ */
/* Site-wide details                                                   */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Nashwave",
  url: "https://nashwavetech.com",
  title: "Nashwave | Your Digital Growth Partner: Branding, Social Media, Websites & Digital Solutions",
  description:
    "Nashwave is a digital growth partner for founders and business owners. We turn your business into a recognisable brand, run your social media, build your website and set up the digital tools that keep it running smoothly.",
  tagline: "Turn the Tide. Move the Business.",
  email: "sales@nashwavetech.com",
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

/**
 * Directors people can call or WhatsApp directly. Shown in the contact section, the footer
 * and the closing call to action.
 * - email: direct address · phone: as displayed · tel: digits and + only, for tap-to-call · whatsapp: digits only, for wa.me links
 */
export const contacts = [
  {
    name: "Zainab Arsiwala",
    role: "Director – Social Media",
    email: "social@nashwavetech.com",
    phone: "+91 90290 43014",
    tel: "+919029043014",
    whatsapp: "919029043014",
  },
  {
    name: "Insiya Nasikwala",
    role: "Director – Design",
    email: "design@nashwavetech.com",
    phone: "+91 90042 16877",
    tel: "+919004216877",
    whatsapp: "919004216877",
  },
];

export type DirectContact = (typeof contacts)[number];

export const firstName = (person: DirectContact) => person.name.split(" ")[0];

/** Pre-filled WhatsApp chat link, e.g. "Hi Zainab, I'm reaching out from the Nashwave website". */
export const whatsappLink = (person: DirectContact) =>
  `https://wa.me/${person.whatsapp}?text=${encodeURIComponent(
    `Hi ${firstName(person)}, I'm reaching out from the Nashwave website`,
  ).replace(/'/g, "%27")}`;

/** Labels used around the director contacts. */
export const contactPeople = {
  heading: "Talk to us directly",
  whatsapp: "WhatsApp",
  callLabel: "Call",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  ctaPrefix: "Or call",
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
  products: "/products",
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
  { name: "Products", href: routes.products, match: routes.products },
];

export const footerNav = {
  servicesTitle: "Services",
  companyTitle: "Company",
  connectTitle: "Connect",
  company: [
    { name: "About", href: routes.about },
    { name: "Approach", href: routes.approach },
    { name: "Products", href: routes.products },
    { name: "Contact", href: routes.contact },
  ],
  blurb: "Your digital growth partner: logo and branding, social media, websites and digital solutions, from one team.",
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
  learnMore: "See what's included →",
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
    slug: "logo-branding",
    number: "01",
    title: "Logo & Branding",
    copy: "A logo, colours, fonts and a voice that make your business instantly recognisable, and give it a personality your customers connect with.",
    includes: [
      "Logo design",
      "Brand colours and fonts",
      "Brand voice and key messages",
      "Brand guidelines",
      "Visiting cards, packaging and print",
      "Brochures, catalogues and presentations",
    ],
  },
  {
    slug: "social-media",
    number: "02",
    title: "Social Media",
    copy: "We plan, shoot, design and post content that builds your presence online, grows your following and turns followers into customers.",
    includes: [
      "Instagram, Facebook and LinkedIn pages",
      "Monthly content plan",
      "Posts, reels and photo or video shoots",
      "Captions and hashtags",
      "Replying to comments and messages",
      "Monthly results report",
    ],
  },
  {
    slug: "websites",
    number: "03",
    title: "Website Building",
    copy: "Fast, mobile-friendly websites that explain what you do in seconds, show your work and turn visitors into enquiries.",
    includes: [
      "Business websites",
      "Landing pages for offers and launches",
      "Online catalogues",
      "Enquiry and WhatsApp buttons",
      "Google search basics",
      "Domain, hosting and business email setup",
    ],
  },
  {
    slug: "digital-solutions",
    number: "04",
    title: "Digital Solutions",
    copy: "Custom web apps and automations that replace spreadsheets, paperwork and repeated work, so your business runs smoothly and you save time every day.",
    includes: [
      "Custom web apps for your business",
      "Quotes, orders, stock and billing tools",
      "Automatic reminders, emails and WhatsApp messages",
      "Dashboards and reports",
      "Ready products like our Glass Optimizer",
    ],
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
    title: "One team for everything.",
    copy: "Logo, social media, website and business tools from one team, so your brand looks and sounds the same everywhere.",
  },
  {
    title: "We make you recognisable.",
    copy: "Every logo, post and page builds one clear personality that customers remember and come back to.",
  },
  {
    title: "Built for growing businesses.",
    copy: "We work with shop owners, manufacturers, founders and speakers, and size the work to your stage and budget.",
  },
  {
    title: "Plain talk, clear updates.",
    copy: "No jargon. You always know what we are doing, when it will be ready and what it is achieving.",
  },
  {
    title: "Results you can see.",
    copy: "More enquiries, more followers, smoother operations: we track the numbers that matter to your business.",
  },
  {
    title: "We build tools too.",
    copy: "When spreadsheets and paperwork slow you down, we build simple apps that save hours, like our Glass Optimizer.",
  },
];

export const steps = [
  {
    title: "Discover",
    eyebrow: "We listen first",
    copy: "A conversation about your business, your customers, your goals and what is holding you back.",
  },
  {
    title: "Plan",
    eyebrow: "A clear plan",
    copy: "We decide together what you need first (brand, social media, website or tools) and agree the timeline.",
  },
  {
    title: "Create",
    eyebrow: "We build it",
    copy: "We design your brand, produce your content and build your website or app, sharing progress as we go.",
  },
  {
    title: "Launch",
    eyebrow: "Go live",
    copy: "Everything goes live together, so your brand looks and sounds the same on every channel.",
  },
  {
    title: "Grow",
    eyebrow: "Keep improving",
    copy: "We track enquiries, followers and results, and keep improving every month.",
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

/* ------------------------------------------------------------------ */
/* Products (/products): what we've built and run, grouped by service  */
/* ------------------------------------------------------------------ */

export type ProductItem = {
  name: string;
  /** Public address, shown and linked as "Visit". Leave empty to hide the link. */
  url: string;
  /** Short label for the address, e.g. "essarsons.com" or "@handle". */
  urlLabel: string;
  /** Text for the main button (defaults to "Visit <urlLabel>"). */
  visitLabel?: string;
  description: string;
  tags: string[];
  /** Screenshots under /public. desktop: 1440×900, phone: 585×996. */
  images: { desktop?: string; phone?: string; gallery?: string[] };
  /** Extra buttons, e.g. a free trial. */
  ctas?: { label: string; href: string }[];
};

export type ProductCategory = {
  /** Anchor id, e.g. "website-design" → /products#website-design */
  id: string;
  title: string;
  intro: string;
  /** Slug of the related service page. */
  service: string;
  /** "showcase": browser + phone mockups. "profiles": social profile cards. "gallery": brand images. */
  layout: "showcase" | "profiles" | "gallery";
  /** A category with no items is hidden everywhere on the page. */
  items: ProductItem[];
};

export const productCategories: ProductCategory[] = [
  {
    id: "website-design",
    title: "Website design",
    intro: "Websites that explain what a business does in seconds and turn visitors into enquiries.",
    service: "websites",
    layout: "showcase",
    items: [
      {
        name: "Essar Sons Group",
        url: "https://essarsons.com",
        urlLabel: "essarsons.com",
        description:
          "A multi-page website for a group of glass, aluminium and construction businesses established 40 years ago: each division and firm, real project stories, client logos, and enquiries sent straight to the team by email.",
        tags: ["Website design", "Development", "Enquiry forms"],
        images: {
          desktop: "/assets/products/essarsons-desktop.webp",
          phone: "/assets/products/essarsons-phone.webp",
        },
      },
    ],
  },
  {
    id: "web-apps",
    title: "Web apps",
    intro:
      "We build custom web apps around how a business really works. Glass Optimizer is one of them: our own product for glass shops.",
    service: "digital-solutions",
    layout: "showcase",
    items: [
      {
        name: "Glass Optimizer",
        url: "https://optimizer.nashwavetech.com",
        urlLabel: "optimizer.nashwavetech.com",
        description:
          "A sheet-cutting optimiser for glass processors. Enter the sheet and piece sizes and it works out the exact cutting layout with the least wastage, with yield, offcuts, Excel export and printable piece labels.",
        tags: ["Web app", "SaaS", "Free 3-day trial"],
        images: {
          desktop: "/assets/products/optimizer-desktop.webp",
          phone: "/assets/products/optimizer-phone.webp",
        },
        visitLabel: "Start a free 3-day trial",
      },
    ],
  },
  {
    id: "social-media",
    title: "Social media",
    intro: "Pages we plan, shoot, post and manage every day for our clients.",
    service: "social-media",
    layout: "profiles",
    // TODO: add Radhika's and Sneha's Instagram pages (name, @handle, profile URL, profile screenshot).
    items: [],
  },
  {
    id: "branding",
    title: "Branding",
    intro: "Logos and brand identities, with the colours, fonts and rules that keep them consistent everywhere.",
    service: "logo-branding",
    layout: "gallery",
    // TODO: add the SR branding project (images from the brand guideline under /public/assets/products/).
    items: [],
  },
];

/** Categories that have something to show (empty ones are hidden). */
export const liveProductCategories = productCategories.filter((c) => c.items.length > 0);


/* ------------------------------------------------------------------ */
/* Section copy                                                        */
/* ------------------------------------------------------------------ */

export const heroSection = {
  eyebrow: "Branding · Social Media · Websites · Digital Solutions",
  cursorWords: ["Branding", "Social media", "Websites", "Digital tools", "Growth", "Branding", "Social media", "Websites"],
};

export const taglineSection = {
  line1: "Turn the Tide.",
  line2: "Move the Business",
  intro:
    "Nashwave is a digital growth partner for founders and business owners. We build your brand, run your social media, create your website and set up the digital tools that keep your business running smoothly.",
  primaryCta: "Start a project",
  secondaryCta: "See our services",
  scrollCue: "Scroll to see what we do",
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

/**
 * The looping video shown right after "Turn the Tide" on the homepage (60 s brand film with sound).
 * Files live in public/assets/video/. While both sources are empty the section is hidden.
 * Keep each file under 25 MB (Cloudflare's per-file limit); ~10 MB loads well on phones.
 * The MP4 (H.264 + AAC) plays in every current browser, so no WebM is needed for this one.
 */
export const featureVideo = {
  webm: "",
  mp4: "/assets/video/nashwave-intro.mp4",
  poster: "/assets/video/nashwave-intro-poster.webp",
  label: "Nashwave video",
  playSound: "Play sound",
  soundOff: "Sound off",
  playVideo: "Play video",
};

export const aboutSection = {
  label: "Who we are",
  titleLine1: "Your digital",
  titleLine2: "growth ",
  titleEmphasis: "partner.",
  intro:
    "We turn your business into a brand people recognise and remember, with a clear look, a consistent voice and a personality your customers connect with. Then we give it what it needs to grow online: social media, a website, and digital tools that keep the business running smoothly.",
  approachLink: "See how we work",
  imageAlt: "Layered white floor with a flowing wave texture",
  povTag: "Our goal",
  povLead: "Your business deserves to be known.",
  povAccent: "We make sure it is.",
};

export const servicesSection = {
  label: "What we do",
  // Shown as two lines.
  title: ["Four services.", "One growth partner."],
  intro: "Everything your business needs to look professional, get noticed online and run smoothly, from one team.",
  allLink: "See all services",
};

export const audienceSection = {
  label: "Who we work with",
  // Shown as two lines.
  title: ["Built for people", "building something."],
  intro: "You don't need to be a big company to have a strong brand. If you run it, own it or are starting it, we can help.",
  items: [
    {
      title: "Small industrialists and manufacturers",
      copy: "Show buyers and dealers a professional face online, and replace paperwork with simple digital tools.",
    },
    {
      title: "Shop and showroom owners",
      copy: "Get found nearby, show your products on Instagram and your website, and turn walk-ins into regulars.",
    },
    {
      title: "Women founders",
      copy: "Build a brand that reflects you, and an online presence that keeps growing while you run everything else.",
    },
    {
      title: "Coaches and motivational speakers",
      copy: "Turn your voice into a recognisable personal brand, with content and a website that bring you more clients and stages.",
    },
    {
      title: "Startup founders",
      copy: "Launch with a clear brand, a website that converts and the systems to scale from day one.",
    },
    {
      title: "Feeling stuck?",
      copy: "Sales have flattened, or you don't know where to start online. We'll find your next opportunity and build it with you.",
    },
  ],
  cta: "Talk to us about your business",
};

export const whyUsSection = {
  label: "Why Nashwave",
  titleLead: "One team for your brand,",
  titleAccent: "your socials, your website and your systems.",
  intro:
    "Most businesses juggle a designer, a social media freelancer, a web developer and an IT person. With us it is one team, one plan and one point of contact.",
  extension: "You focus on running the business. We make sure it is seen, remembered and running smoothly online.",
};

export const approachSection = {
  label: "How We Work",
  title: "Process",
  cornerTop: "How we work together",
  cornerBottom: "Step by step",
  intro: "Five clear steps from the first conversation to a brand that keeps growing.",
  cta: "Start with a conversation",
};

export const clientsSection = {
  label: "Trusted By",
  title: "Brands that chose to move with us.",
};

export const productsPage = {
  label: "Our Products",
  // Shown as two lines.
  title: ["Real work for", "real businesses."],
  intro:
    "Websites, web apps, social media pages and brands we have designed, built and run, grouped by service.",
  jumpLabel: "Jump to",
  visit: "Visit",
  serviceLink: "About this service",
  gallerySuffix: "brand guideline",
};

export const contactSection = {
  label: "Let's Talk",
  titleLine1: "Tell us about",
  titleLine2: "your business.",
  intro:
    "Share what you do and where you want to grow. We will reply within one working day with clear next steps.",
  sentTag: "Brief received",
  sentTitle: "Thanks. Your message has landed.",
  sentCopy: "We will be in touch within one working day.",
  fields: {
    name: "Name",
    email: "Email",
    company: "Business name",
    service: "What do you need?",
    servicePlaceholder: "Select a service",
    serviceAddAnother: "Add another service",
    serviceRemove: "Remove",
    serviceSelectedLabel: "Selected services",
    serviceUnsure: "Not sure yet",
    message: "What do you want to achieve?",
  },
  honeypot: "Don't fill this out:",
  submit: "Send my brief",
  sending: "Sending…",
  error: "Something went wrong. Please try again or email us at",
  asideTitle: "Get in touch",
  cardLine: "Branding, social media, websites and digital solutions. One team.",
};

export const finalCtaSection = {
  label: "Ready to grow?",
  titleLine1: "Let's make your business",
  titleLine2: "a brand people remember.",
  intro:
    "Tell us where you are today. We will show you the next steps for your brand, your social media, your website and your business tools.",
  cta: "Start a project",
  emailPrefix: "Or write to us at",
};

export const serviceDetail = {
  includesLabel: "What you get",
  includesTitle: "What's included.",
  otherLabel: "More ways we help",
  otherTitle: "Other services.",
  ctaLabel: "Start a project",
};

export const notFoundPage = {
  label: "404",
  title: "This page doesn't exist.",
  copy: "The link may be broken or the page may have moved. Try one of these instead.",
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
      "Nashwave is a digital growth partner that turns businesses into recognisable brands, with branding, social media, websites and digital solutions from one team.",
    image: "/assets/nashwave-white-wave-floor.png",
  },
  services: {
    title: "Services",
    description:
      "Logo and branding, social media, website building and digital solutions for founders, shop owners, manufacturers and growing businesses.",
    image: "/assets/nashwave-ocean.jpg",
  },
  products: {
    title: "Products",
    description:
      "Websites, web apps, social pages and brands designed, built and run by Nashwave, including Essar Sons Group and Glass Optimizer.",
    image: "/assets/products/essarsons-desktop.webp",
  },
  contact: {
    title: "Contact",
    description:
      "Tell us about your business and where you want to grow. We reply within one working day with clear next steps.",
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
        "When you use our contact form we collect the details you provide: your name, email, business name, the services you are interested in and your message.",
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
        "Our website is hosted by Cloudflare, and form submissions are delivered to us by email through Resend, both on our behalf. We do not sell your personal information.",
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
