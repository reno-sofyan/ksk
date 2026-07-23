import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/site";

const footerNavigation = [
  ["Tentang Kami", "/tentang-kami"],
  ["Fokus Bisnis", "/fokus-bisnis"],
  ["Portofolio", "/portofolio"],
  ["Rivere Kostaycation", company.rivereUrl],
  ["Wawasan", "/wawasan"],
  ["Karier", "/karier"],
  ["Hubungi Kami", "/hubungi-kami"],
  ["Kebijakan Privasi", "/kebijakan-privasi"],
];

export function Footer() {
  return (
    <footer className="footer" data-theme="dark">
      <div className="footer-intro">
        <div className="footer-brand">
          <Image src="/images/logo.png" alt="Logo Kinara Land" width={64} height={64} />
          <div><h2>KINARA LAND</h2><p>PT Kinara Land Indonesia</p></div>
        </div>
        <p>{company.tagline}</p>
      </div>
      <div className="footer-summary">
        <div><span>STRATEGIC FOCUS</span><p>Developer properti, kost produktif, dan hospitality management.</p></div>
        <div><span>PRIMARY MARKET</span><p>{company.market}</p></div>
        <div><span>FEATURED PROJECT</span><a href={company.rivereUrl}>Rivere Kostaycation IPB</a></div>
      </div>
      <div className="footer-grid company-footer-grid">
        <div><span>NAVIGASI</span>{footerNavigation.slice(0, 4).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        <div><span>INFORMASI</span>{footerNavigation.slice(4).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        <div><span>KONTAK</span><a href={company.whatsappUrl}>WhatsApp +62 821 1112 4005</a>{company.email ? <a href={`mailto:${company.email}`}>{company.email}</a> : <p>Email: akan diperbarui</p>}{company.officeAddress ? <p>{company.officeAddress}</p> : <p>Alamat kantor: akan diperbarui</p>}</div>
        <div><span>SOCIAL MEDIA</span>{Object.entries(company.social).map(([name, url]) => url ? <a key={name} href={url}>{name}</a> : <p key={name}>{name}: akan diperbarui</p>)}</div>
      </div>
      <div className="footer-legal"><p>© {new Date().getFullYear()} PT Kinara Land Indonesia. Seluruh hak dilindungi.</p><p>Developer properti dan hospitality ecosystem.</p></div>
    </footer>
  );
}
