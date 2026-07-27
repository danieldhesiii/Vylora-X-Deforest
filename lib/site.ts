/* ------------------------------------------------------------------
   Deforest — single source of truth for all editable content.
   Change copy, prices, dates and contact details here — nothing else.

   COMPLIANCE GUARDRAIL (see CLAUDE.md liability doctrine):
   Never let copy assert a compliance *outcome*. We provide evidence and
   preparation; the customer remains legally responsible for their filing.
   Use verbs like "prepare", "assemble", "evidence", "get filing-ready" —
   never "guarantee compliance", "make you compliant", or soften a risk
   verdict.
-------------------------------------------------------------------*/

export const site = {
  name: "Deforest",
  tagline: "EUDR paperwork, prepared for you.",
  domain: "deforest.eu",

  // --- Contact / CTA destinations --------------------------------
  // "Get started" / sign up routes to the Clerk sign-up flow.
  // "Book a demo" scrolls to the on-page form (#book-demo) which posts
  // to Formspree. Waitlist is still a placeholder mailto.
  signupUrl: "/sign-up",
  demoUrl: "#book-demo",
  waitlistUrl: "mailto:hello@deforest.eu?subject=Deforest%20early%20access",
  email: "hello@deforest.eu",

  // Formspree form endpoint for the "Book a demo" form.
  formspreeEndpoint: "https://formspree.io/f/xkodkwzl",

  socials: {
    linkedin: "https://www.linkedin.com/",
  },
} as const;

// -------------------------------------------------------------------
// The two EUDR deadlines. Confirmed 2026-07-17 against the Commission
// EUDR page + Regulation (EU) 2025/2650. Do not edit without re-checking
// the live source — dates have moved before.
// -------------------------------------------------------------------
export const deadlines = {
  smb: {
    label: "Micro & small businesses",
    date: "2027-06-30T00:00:00Z",
    dateDisplay: "30 June 2027",
  },
  large: {
    label: "Large & medium companies (and timber under old EUTR)",
    date: "2026-12-30T00:00:00Z",
    dateDisplay: "30 December 2026",
  },
} as const;

// -------------------------------------------------------------------
// Nav links (hash anchors into the single page).
// -------------------------------------------------------------------
export const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Who it's for", href: "#audience" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

// -------------------------------------------------------------------
// Hero
// -------------------------------------------------------------------
export const hero = {
  eyebrow: "For coffee, cocoa, timber, rubber & furniture businesses",
  titleLead: "Get your EUDR due diligence",
  titleAccent: "filing-ready",
  titleTail: "before the deadline.",
  subtitle:
    "Deforest collects your suppliers' plot locations, runs every one through the UN FAO's satellite forest check, and assembles a filing-ready due-diligence pack, so you walk into TRACES prepared, not panicking.",
  primaryCta: "Get started",
  secondaryCta: "Book a 15-minute demo",
  trustPoints: [
    "Built on the free UN FAO Whisp engine",
    "Your data stored in the EU",
    "You stay in control of your filing",
  ],
  // Stats shown under the hero copy.
  stats: [
    { n: "£29", l: "per month to start" },
    { n: "5 yrs", l: "records, retained for you" },
    { n: "31 Dec 2020", l: "the deforestation cut-off we check against" },
  ],
} as const;

// -------------------------------------------------------------------
// "The stakes" — what EUDR actually demands + penalties.
// Framed factually; we describe the law, not our guarantees.
// -------------------------------------------------------------------
export const stakes = {
  eyebrow: "What the regulation demands",
  title: "The EU Deforestation Regulation is real, and the paperwork is heavy.",
  intro:
    "If you place coffee, cocoa, timber, rubber, cattle, soy or palm oil (or products made from them) on the EU market, you must prove they didn't come from land deforested after 31 December 2020. That means work no spreadsheet handles well:",
  demands: [
    {
      icon: "MapPin",
      title: "Geolocation for every plot",
      body: "Collect precise coordinates from every supplier. Plots over 4 hectares need polygons; smaller ones need a point.",
    },
    {
      icon: "Satellite",
      title: "A deforestation risk check",
      body: "Each plot has to be assessed against satellite forest data going back to the 2020 cut-off date.",
    },
    {
      icon: "FileCheck2",
      title: "A due diligence statement",
      body: "A formal statement filed in the EU's TRACES system before your goods can move.",
    },
    {
      icon: "Archive",
      title: "Five years of records",
      body: "Every document, coordinate and statement kept and retrievable for five years in case of audit.",
    },
  ],
  penalties: {
    title: "Getting it wrong is expensive.",
    items: [
      { stat: "≥ 4%", label: "of your EU turnover in fines" },
      { stat: "Seized", label: "goods confiscated at the border" },
      { stat: "Excluded", label: "from public procurement & funding" },
    ],
    note: "Under EUDR the legal liability sits with the operator placing goods on the market, even if a supplier's data is wrong. That is exactly why preparation and evidence matter.",
  },
} as const;

// -------------------------------------------------------------------
// Audience — two paths. This mirrors the two customer types that
// "shape everything" in the roadmap.
// -------------------------------------------------------------------
export const audience = {
  eyebrow: "Two ways in",
  title: "Whether you import or you buy, there's a lane for you.",
  paths: [
    {
      id: "operator",
      tag: "Operators",
      title: "You're the first importer into the EU",
      body: "The full due-diligence burden lands on you: collect geolocation, run the forest check, file in TRACES, keep five years of records.",
      points: [
        "Supplier geolocation intake & validation",
        "Whisp forest check, plot by plot",
        "Filing-ready TRACES pack",
        "Five-year audit trail",
      ],
      highlight: false,
    },
    {
      id: "downstream",
      tag: "Downstream buyers & traders",
      title: "You buy from an EU importer",
      body: "Roasters, makers and merchants buying already-imported goods. Your job is lighter: collect and store your suppliers' reference numbers, and prove you did.",
      points: [
        "Capture & store supplier reference numbers",
        "Searchable, exportable vault",
        "Five-year retention handled",
        "Audit-ready records on demand",
      ],
      highlight: true,
    },
  ],
} as const;

// -------------------------------------------------------------------
// How it works — the core flow.
// -------------------------------------------------------------------
export const howItWorks = {
  eyebrow: "How it works",
  title: "Four steps from supplier data to a filing-ready pack.",
  subtitle:
    "No satellite science to learn, no consultant to hire. Deforest runs the workflow; you stay in the driver's seat of your filing.",
  steps: [
    {
      n: "01",
      icon: "Upload",
      title: "Collect supplier data",
      body: "Suppliers upload a file, drop a pin, or type coordinates, even from a cheap phone. Deforest validates instantly and flags obvious errors on a map.",
    },
    {
      n: "02",
      icon: "Satellite",
      title: "Run the forest check",
      body: "Each plot is checked against satellite forest data. You get a plot-by-plot report and a plain traffic-light result, never softened.",
    },
    {
      n: "03",
      icon: "FileText",
      title: "Build your statement",
      body: "Deforest assembles a filing-ready pack you submit yourself in TRACES: everything in one place, formatted and cross-checked.",
    },
    {
      n: "04",
      icon: "ShieldCheck",
      title: "Keep the records",
      body: "Every action is logged and versioned. Export the whole five-year archive in a click, ready if an auditor asks.",
    },
  ],
} as const;

// -------------------------------------------------------------------
// Features — the exact 5-feature v1 scope. Nothing more.
// -------------------------------------------------------------------
export const features = {
  eyebrow: "The product",
  title: "Five tools. Exactly what the filing needs, nothing you don't.",
  subtitle:
    "We deliberately kept version one focused on the work the regulation actually requires.",
  items: [
    {
      icon: "MapPinned",
      title: "Supplier data intake",
      body: "GeoJSON or KML upload, pin-drop or typed coordinates, plus document upload. Instant validation, map confirmation and obvious-error flagging, all built to stay light on a slow phone.",
    },
    {
      icon: "Satellite",
      title: "Forest check",
      body: "Send plots straight to Whisp, store the full plot-by-plot report, and read a clear traffic-light result. Raw responses are kept verbatim; we never reinterpret the verdict.",
    },
    {
      icon: "FileText",
      title: "Statement builder",
      body: "A filing-ready pack for manual TRACES submission: formatted, complete, and easy to check before you file it yourself.",
    },
    {
      icon: "Vault",
      title: "Reference-number vault",
      body: "For downstream buyers: capture supplier due-diligence reference numbers in a searchable, exportable store with five-year retention built in.",
    },
    {
      icon: "ScrollText",
      title: "Audit trail",
      body: "Every action logged, documents versioned, and an append-only history you can export as a single evidence pack whenever you need it.",
    },
  ],
} as const;

// -------------------------------------------------------------------
// Traffic-light demo (the plot-check result screen mock).
// -------------------------------------------------------------------
export const trafficLight = {
  eyebrow: "The forest check, in plain sight",
  title: "One clear result per plot. Never softened.",
  body: "When Whisp comes back, you see exactly what it found (green, amber or red) with the underlying report one click away. That honesty is the point: it is the evidence that protects you.",
  plots: [
    {
      id: "Plot A · 2.1 ha",
      origin: "Huila, Colombia",
      status: "clear",
      label: "No deforestation detected",
      detail: "Tree-cover stable since 2020 cut-off.",
    },
    {
      id: "Plot B · 6.8 ha",
      origin: "Lampung, Indonesia",
      status: "review",
      label: "Needs review",
      detail: "Possible disturbance near plot edge. Check source data.",
    },
    {
      id: "Plot C · 4.4 ha",
      origin: "Nariño, Colombia",
      status: "flagged",
      label: "Deforestation risk flagged",
      detail: "Tree-cover loss detected after 31 Dec 2020.",
    },
  ],
} as const;

// -------------------------------------------------------------------
// Trust / data protection strip.
// -------------------------------------------------------------------
export const trust = {
  eyebrow: "Built to be trusted",
  title: "Where your data lives, and where the responsibility sits.",
  cards: [
    {
      icon: "Server",
      title: "EU data residency",
      body: "Customer and supplier data is hosted in the EU region. When a customer asks where their data lives, the answer is simple and in writing.",
    },
    {
      icon: "Globe2",
      title: "Powered by UN FAO Whisp",
      body: "The satellite analysis comes from the free, open Whisp engine built by the UN's Food and Agriculture Organization. We build the workflow around it. We don't invent the science.",
    },
    {
      icon: "Lock",
      title: "GDPR-minded by design",
      body: "Farm coordinates can be personal data. We treat them that way: lawful basis, a clear privacy notice, and data-processing terms for every customer.",
    },
    {
      icon: "Scale",
      title: "You own the filing",
      body: "Deforest provides evidence and preparation. You remain legally responsible for your due-diligence statement. We are honest about that, because the law is.",
    },
  ],
} as const;

// -------------------------------------------------------------------
// Pricing.
// -------------------------------------------------------------------
export const pricing = {
  eyebrow: "Simple pricing",
  title: "Priced for how much you actually file.",
  subtitle:
    "Downstream buyers pay one flat price. Operators pick a tier by how many due-diligence statements they file each month. Cancel anytime while we're in early access.",
  // Flat plan for the largest, most price-sensitive segment.
  downstream: {
    id: "downstream",
    name: "Downstream",
    tagline: "For buyers & traders who buy from an EU importer",
    price: "£29",
    unit: "/month",
    annual: "or £290/year (two months free)",
    cta: "Get started",
    ctaKind: "signup",
    badge: "Most small businesses",
    features: [
      "Reference-number vault",
      "Searchable, exportable records",
      "Five-year retention handled",
      "Audit-ready evidence pack",
    ],
  },
  // Volume tiers by number of due-diligence filings per month.
  operator: {
    id: "operator",
    name: "Operator",
    tagline: "For first importers filing due-diligence statements in TRACES",
    unit: "/month",
    tiers: [
      { name: "Starter", filings: "Up to 15 filings / mo", price: "£149", popular: false },
      { name: "Growth", filings: "Up to 50 filings / mo", price: "£229", popular: true },
      { name: "Scale", filings: "Unlimited filings", price: "£299", popular: false },
    ],
    cta: "Book a demo",
    ctaKind: "demo",
    features: [
      "Everything in Downstream",
      "Supplier geolocation intake",
      "Forest check, plot by plot",
      "Filing-ready TRACES statement",
      "Five-year audit trail",
    ],
  },
  dwy: {
    id: "dwy",
    name: "First filing, done with you",
    tagline: "We prepare your very first pack with you, end to end",
    price: "£500",
    unit: " one-off",
    note: "Stacks onto any plan",
    cta: "Book a call",
    ctaKind: "demo",
    badge: "One-off",
    features: [
      "Hands-on setup of your first pack",
      "Prepared with you, step by step",
      "You file it in TRACES with confidence",
    ],
  },
  footnote:
    "Prices shown are early-access rates and may change. A filing means one due-diligence statement prepared for TRACES. Deforest prepares your filing; it does not submit on your behalf or guarantee a compliance outcome.",
} as const;

// -------------------------------------------------------------------
// FAQ.
// -------------------------------------------------------------------
export const faqs = [
  {
    q: "When is my EUDR deadline?",
    a: "Micro and small businesses must comply by 30 June 2027. Large and medium companies must comply by 30 December 2026. One catch: micro and small timber operators already covered by the old EU Timber Regulation don't get the 2027 grace period, so their deadline is 30 December 2026 too. If you're not sure which applies to you, that's one of the first things we'll work out together.",
  },
  {
    q: "Does Deforest guarantee I'll be compliant?",
    a: "No, and be wary of anyone who says they do. Deforest collects your data, runs the satellite check and assembles a filing-ready pack. You remain legally responsible for your due-diligence statement. What we give you is the evidence and preparation that make filing straightforward and defensible.",
  },
  {
    q: "What is Whisp, and why does it matter?",
    a: "Whisp is a free, open satellite-analysis engine built by the UN's Food and Agriculture Organization to check plots for deforestation. It is the credible, independent source behind your forest check. We build the workflow around Whisp: collecting the data, storing the results verbatim, and never softening what it returns.",
  },
  {
    q: "I only buy from an EU importer. Do I even need this?",
    a: "Probably yes, just a lighter version. Downstream buyers and traders still have to collect and keep their suppliers' due-diligence reference numbers, and retain those records for five years. Our Downstream plan is built for exactly that, from £29/month.",
  },
  {
    q: "Where is my data stored?",
    a: "In the EU. That matters for GDPR and it matters to your own customers, who will ask. Farm coordinates can themselves be personal data, so we handle them with a lawful basis, a clear privacy notice, and data-processing terms for every customer.",
  },
  {
    q: "How much technical work is this for my suppliers?",
    a: "As little as possible. A supplier can upload a GeoJSON or KML file, drop a pin on a map, or type coordinates, and the intake page is built to stay light on a cheap phone with a patchy connection. Deforest validates the data and flags obvious errors before anything moves forward.",
  },
] as const;

// -------------------------------------------------------------------
// Final CTA.
// -------------------------------------------------------------------
export const finalCta = {
  eyebrow: "Don't wait for the deadline to arrive",
  title: "See your first plot checked in fifteen minutes.",
  body: "Sign up in minutes, or book a short call and we'll walk through your exact situation, operator or downstream, coffee or timber, and show you what a filing-ready pack looks like for your business.",
  primaryCta: "Get started",
  secondaryCta: "Book a 15-minute demo",
} as const;

// -------------------------------------------------------------------
// Book-a-demo form (posts to Formspree).
// -------------------------------------------------------------------
export const bookDemo = {
  eyebrow: "Book a demo",
  title: "See Deforest on your own supply chain.",
  body: "Tell us a little about your business and we'll set up a 15-minute walkthrough for your exact situation, operator or downstream.",
  roles: [
    "Operator (first importer into the EU)",
    "Downstream buyer or trader",
    "Not sure which one I am",
  ],
  submitLabel: "Request my demo",
  success: {
    title: "Thanks, that's booked in.",
    body: "We'll be in touch within one working day to arrange your walkthrough. Check your inbox for a confirmation.",
  },
  error:
    "Something went wrong sending that. Please try again, or email hello@deforest.eu directly.",
} as const;

// -------------------------------------------------------------------
// Footer.
// -------------------------------------------------------------------
export const footer = {
  disclaimer:
    "Deforest provides workflow, record-keeping and filing-preparation software. It does not provide legal advice and does not submit filings on your behalf. The customer remains legally responsible for their due-diligence statement and its accuracy. EUDR refers to Regulation (EU) 2023/1115. Regulatory details are subject to change, so always check the European Commission's EUDR implementation page for the current position.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Who it's for",
      links: [
        { label: "Operators", href: "#audience" },
        { label: "Downstream buyers", href: "#audience" },
        { label: "Coffee & cocoa", href: "#audience" },
        { label: "Timber & furniture", href: "#audience" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Book a demo", href: "#book-demo" },
        { label: "Early access", href: "#contact" },
        { label: "hello@deforest.eu", href: "mailto:hello@deforest.eu" },
      ],
    },
  ],
} as const;
