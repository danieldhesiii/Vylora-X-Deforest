import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Public_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deforest.eu"),
  title: {
    default: "Deforest: Get your EUDR due diligence filing-ready",
    template: "%s · Deforest",
  },
  description:
    "Deforest is the simplest way for small coffee, cocoa, timber, rubber and furniture businesses to prepare their EU Deforestation Regulation (EUDR) filing. Collect supplier geolocation, run the free UN FAO Whisp satellite forest check, and assemble a filing-ready due-diligence pack. From £29/month.",
  keywords: [
    "EUDR",
    "EU Deforestation Regulation",
    "EUDR compliance software",
    "due diligence statement",
    "TRACES",
    "Whisp",
    "geolocation coordinates",
    "coffee roaster EUDR",
    "cocoa EUDR",
    "timber EUDR",
    "deforestation-free supply chain",
  ],
  authors: [{ name: "Deforest" }],
  openGraph: {
    title: "Deforest: EUDR paperwork, prepared for you",
    description:
      "Collect supplier geolocation, run the UN FAO Whisp forest check, and build a filing-ready EUDR due-diligence pack. Built for small businesses, from £29/month.",
    type: "website",
    locale: "en_GB",
    siteName: "Deforest",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deforest: EUDR paperwork, prepared for you",
    description:
      "The simplest way for small businesses to prepare their EU Deforestation Regulation filing. From £29/month.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#123a29",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${sourceSerif.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>
      </body>
    </html>
  );
}
