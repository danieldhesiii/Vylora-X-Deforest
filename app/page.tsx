import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DeadlineBand } from "@/components/deadline-band";
import { Stakes } from "@/components/stakes";
import { Audience } from "@/components/audience";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { TrafficLight } from "@/components/traffic-light";
import { Trust } from "@/components/trust";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { BookDemo } from "@/components/book-demo";
import { Footer } from "@/components/footer";
import { site, faqs, pricing } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Deforest helps small businesses prepare their EU Deforestation Regulation (EUDR) due-diligence filing: supplier geolocation intake, UN FAO Whisp satellite forest check, filing-ready TRACES statement pack, reference-number vault and a five-year audit trail.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "GBP",
        lowPrice: pricing.downstream.price.replace("£", ""),
        highPrice: "299",
        offerCount: 5,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <DeadlineBand />
        <Stakes />
        <Audience />
        <HowItWorks />
        <Features />
        <TrafficLight />
        <Trust />
        <Pricing />
        <Faq />
        <FinalCta />
        <BookDemo />
      </main>
      <Footer />
    </>
  );
}
