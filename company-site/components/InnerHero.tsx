export function InnerHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="inner-hero"><span>{eyebrow}</span><h1>{title}</h1><p>{intro}</p></section>;
}
