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
  // TODO: swap these for the real booking link + inbox before launch.
  demoUrl: "mailto:hello@deforest.eu?subject=Deforest%20demo",
  waitlistUrl: "mailto:hello@deforest.eu?subject=Deforest%20early%20access",
  email: "hello@deforest.eu",

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
  titleTail: "— before the deadline.",
  subtitle:
    "Deforest collects your suppliers' plot locations, runs every one through the UN FAO's satellite forest check, and assembles a filing-ready due-diligence pack — so you walk into TRACES prepared, not panicking.",
  primaryCta: "Book a 15-minute demo",
  secondaryCta: "See how it works",
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
    "If you place coffee, cocoa, timber, rubber, cattle, soy, palm oil — or products made from them — on the EU market, you must prove they didn't come from land deforested after 31 December 2020. That means work no spreadsheet handles well:",
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
    note: "Under EUDR the legal liability sits with the operator placing goods on the market — even if a supplier's data is wrong. That's exactly why preparation and evidence matter.",
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
      body: "You bring goods into the EU market, so the full due-diligence burden lands on you: collect geolocation, run the forest check, file the statement in TRACES, keep five years of records.",
      points: [
        "Supplier geolocation intake & validation",
        "Whisp satellite forest check, plot by plot",
        "Filing-ready TRACES due-diligence pack",
        "Complete five-year audit trail",
      ],
      price: "£149–299",
      priceUnit: "/mo",
      highlight: false,
    },
    {
      id: "downstream",
      tag: "Downstream buyers & traders",
      title: "You buy from an EU importer",
      body: "Roasters, bean-to-bar makers, furniture and timber merchants who buy already-imported goods. Your job is lighter: collect and safely store your suppliers' due-diligence reference numbers — and prove you did.",
      points: [
        "Capture & store supplier reference numbers",
        "Searchable, exportable reference vault",
        "Five-year retention handled for you",
        "Audit-ready records on demand",
      ],
      price: "£29–49",
      priceUnit: "/mo",
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
      body: "Suppliers upload a GeoJSON or KML file, drop a pin, or type coordinates — from a cheap phone on patchy data if they have to. Deforest validates instantly and flags obvious errors on a map before anything moves on.",
    },
    {
      n: "02",
      icon: "Satellite",
      title: "Run the forest check",
      body: "Every plot is sent to the UN FAO's free Whisp engine. You get a plot-by-plot report and a plain traffic-light result — and we never soften what Whisp returns.",
    },
    {
      n: "03",
      icon: "FileText",
      title: "Build your statement",
      body: "Deforest assembles a filing-ready due-diligence pack you submit yourself in TRACES. Everything is in one place, formatted, and cross-checked.",
    },
    {
      n: "04",
      icon: "ShieldCheck",
      title: "Keep the records",
      body: "Every action is logged, every document versioned, and the whole five-year archive is exportable in a click — ready if an auditor ever asks.",
    },
  ],
} as const;

// -------------------------------------------------------------------
// Features — the exact 5-feature v1 scope. Nothing more.
// -------------------------------------------------------------------
export const features = {
  eyebrow: "The product",
  title: "Five tools. Exactly what the filing needs — nothing you don't.",
  subtitle:
    "We deliberately kept version one focused on the work the regulation actually requires.",
  items: [
    {
      icon: "MapPinned",
      title: "Supplier data intake",
      body: "GeoJSON / KML upload, pin-drop or typed coordinates, plus document upload. Instant validation, map confirmation and obvious-error flagging — designed to stay light on a slow phone.",
    },
    {
      icon: "Satellite",
      title: "Forest check",
      body: "Send plots straight to Whisp, store the full plot-by-plot report, and read a clear traffic-light result. Raw responses are kept verbatim; we never reinterpret the verdict.",
    },
    {
      icon: "FileText",
      title: "Statement builder",
      body: "A filing-ready pack for manual TRACES submission — formatted, complete, and easy to check before you file it yourself.",
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
  body: "When Whisp comes back, you see exactly what it found — green, amber or red — with the underlying report one click away. That honesty is the point: it's the evidence that protects you.",
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
      detail: "Possible disturbance near plot edge — check source data.",
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
  title: "Where your data lives — and where the responsibility sits.",
  cards: [
    {
      icon: "Server",
      title: "EU data residency",
      body: "Customer and supplier data is hosted in the EU region. When a customer asks where their data lives, the answer is simple and in writing.",
    },
    {
      icon: "Globe2",
      title: "Powered by UN FAO Whisp",
      body: "The satellite analysis comes from the free, open Whisp engine built by the UN's Food and Agriculture Organization. We build the workflow around it — we don't invent the science.",
    },
    {
      icon: "Lock",
      title: "GDPR-minded by design",
      body: "Farm coordinates can be personal data. We treat them that way: lawful basis, a clear privacy notice, and data-processing terms for every customer.",
    },
    {
      icon: "Scale",
      title: "You own the filing",
      body: "Deforest provides evidence and preparation. You remain legally responsible for your due-diligence statement — we're honest about that, because the law is.",
    },
  ],
} as const;

// -------------------------------------------------------------------
// Pricing.
// -------------------------------------------------------------------
export const pricing = {
  eyebrow: "Simple pricing",
  title: "Priced for a small business, not a corporate compliance department.",
  subtitle:
    "One clear monthly fee. No per-plot surprises. Cancel anytime while we're in early access.",
  plans: [
    {
      id: "downstream",
      name: "Downstream",
      tagline: "Buyers & traders who purchase from an EU importer",
      priceFrom: "£29",
      priceTo: "£49",
      unit: "/month",
      cta: "Start with Downstream",
      highlight: true,
      badge: "Most small businesses",
      features: [
        "Reference-number vault",
        "Searchable & exportable records",
        "Five-year retention handled",
        "Audit-ready evidence pack",
        "Document versioning & logging",
      ],
    },
    {
      id: "operator",
      name: "Operator",
      tagline: "First importers carrying the full due-diligence burden",
      priceFrom: "£149",
      priceTo: "£299",
      unit: "/month",
      cta: "Talk to us about Operator",
      highlight: false,
      badge: null,
      features: [
        "Everything in Downstream",
        "Supplier geolocation intake & validation",
        "Whisp forest check, plot by plot",
        "Filing-ready TRACES statement builder",
        "Full five-year audit trail",
      ],
    },
    {
      id: "dwy",
      name: "Done-with-you filing",
      tagline: "We sit with you through your very first filing",
      priceFrom: "£500",
      priceTo: null,
      unit: " one-off",
      cta: "Book a first filing",
      highlight: false,
      badge: "One-off",
      features: [
        "Hands-on setup of your first pack",
        "We prepare it alongside you, end to end",
        "You submit it in TRACES with confidence",
        "Stackable with any monthly plan",
      ],
    },
  ],
  footnote:
    "Prices shown are early-access ranges and may change. Deforest prepares your filing; it does not submit on your behalf or guarantee a compliance outcome.",
} as const;

// -------------------------------------------------------------------
// FAQ.
// -------------------------------------------------------------------
export const faqs = [
  {
    q: "When is my EUDR deadline?",
    a: "Micro and small businesses must comply by 30 June 2027. Large and medium companies must comply by 30 December 2026. One catch: micro/small timber operators already covered by the old EU Timber Regulation don't get the 2027 grace period — their deadline is 30 December 2026 too. If you're not sure which applies to you, that's one of the first things we'll figure out together.",
  },
  {
    q: "Does Deforest guarantee I'll be compliant?",
    a: "No — and be wary of anyone who says they do. Deforest collects your data, runs the satellite check and assembles a filing-ready pack. You remain legally responsible for your due-diligence statement. What we give you is the evidence and preparation that make filing straightforward and defensible.",
  },
  {
    q: "What is Whisp, and why does it matter?",
    a: "Whisp is a free, open satellite-analysis engine built by the UN's Food and Agriculture Organization to check plots for deforestation. It's the credible, independent source behind your forest check. We build the workflow around Whisp — collecting the data, storing the results verbatim, and never softening what it returns.",
  },
  {
    q: "I only buy from an EU importer. Do I even need this?",
    a: "Probably, yes — just a lighter version. Downstream buyers and traders still have to collect and keep their suppliers' due-diligence reference numbers, and retain those records for five years. Our Downstream plan is built for exactly that, from £29/month.",
  },
  {
    q: "Where is my data stored?",
    a: "In the EU. That matters for GDPR and it matters to your own customers, who will ask. Farm coordinates can themselves be personal data, so we handle them with a lawful basis, a clear privacy notice, and data-processing terms for every customer.",
  },
  {
    q: "How much technical work is this for my suppliers?",
    a: "As little as possible. A supplier can upload a GeoJSON or KML file, drop a pin on a map, or type coordinates — and the intake page is built to stay light on a cheap phone with a patchy connection. Deforest validates the data and flags obvious errors before anything moves forward.",
  },
] as const;

// -------------------------------------------------------------------
// Final CTA.
// -------------------------------------------------------------------
export const finalCta = {
  eyebrow: "Don't wait for the deadline to arrive",
  title: "See your first plot checked in fifteen minutes.",
  body: "Book a short demo and we'll walk through your exact situation — operator or downstream, coffee or timber — and show you what a filing-ready pack looks like for your business.",
  primaryCta: "Book a 15-minute demo",
  secondaryCta: "Join the early-access list",
} as const;

// -------------------------------------------------------------------
// Footer.
// -------------------------------------------------------------------
export const footer = {
  disclaimer:
    "Deforest provides workflow, record-keeping and filing-preparation software. It does not provide legal advice and does not submit filings on your behalf. The customer remains legally responsible for their due-diligence statement and its accuracy. EUDR = Regulation (EU) 2023/1115. Regulatory details are subject to change — always check the European Commission's EUDR implementation page for the current position.",
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
        { label: "Book a demo", href: "#contact" },
        { label: "Early access", href: "#contact" },
        { label: "hello@deforest.eu", href: "mailto:hello@deforest.eu" },
      ],
    },
  ],
} as const;
