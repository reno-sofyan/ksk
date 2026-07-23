import type { Metadata } from "next";
import { Instrument_Sans, Lora } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kinaraland.com"),
  title: { default: "PT Kinara Land Indonesia | Developer Properti Produktif Bogor", template: "%s | Kinara Land" },
  description: "PT Kinara Land Indonesia mengembangkan hunian, kost produktif, dan ekosistem hospitality dengan pendekatan lokasi strategis, desain bernilai, serta pengelolaan profesional.",
  keywords: ["PT Kinara Land Indonesia","developer properti Bogor","properti produktif Bogor","kost produktif IPB","developer kost Bogor","Rivere Kostaycation IPB","property management Bogor","investasi properti Bogor"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "id_ID", siteName: "Kinara Land Indonesia", images: ["/images/gerbang.jpeg"] },
  twitter: { card: "summary_large_image", images: ["/images/gerbang.jpeg"] },
};

const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": "https://kinaraland.com/#organization", name: "PT Kinara Land Indonesia", url: "https://kinaraland.com", telephone: "+6282111124005", description: "Developer properti dan hospitality ecosystem yang mengembangkan properti produktif dengan pendekatan kurasi aset." },
  { "@type": "RealEstateAgent", "@id": "https://kinaraland.com/#real-estate-agent", name: "PT Kinara Land Indonesia", url: "https://kinaraland.com", telephone: "+6282111124005", areaServed: "Bogor, Jawa Barat", parentOrganization: { "@id": "https://kinaraland.com/#organization" } }
] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${instrument.variable} ${lora.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
