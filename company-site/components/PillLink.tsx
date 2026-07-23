import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PillLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`pill ${light ? "pill-light" : ""}`}>
      <span>{children}</span><ArrowRight aria-hidden="true" />
    </Link>
  );
}
