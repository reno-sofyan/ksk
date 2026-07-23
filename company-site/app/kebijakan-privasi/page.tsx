import type { Metadata } from "next";
import { InnerHero } from "@/components/InnerHero";
export const metadata: Metadata = { title: "Kebijakan Privasi", robots: { index: false, follow: true } };
export default function PrivacyPage() { return <main><InnerHero eyebrow="LEGAL" title="Kebijakan Privasi" intro="Halaman ini merupakan struktur sementara dan akan diperbarui dengan dokumen hukum perusahaan yang telah disetujui." /><section className="placeholder-content"><h2>Dokumen sedang disiapkan.</h2><p>Kebijakan pemrosesan, penyimpanan, dan perlindungan data akan dicantumkan setelah teks resmi tersedia.</p></section></main>; }
