import type { MetadataRoute } from "next";
import { portfolios } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/tentang-kami", "/fokus-bisnis", "/portofolio", "/rivere-kostaycation", "/wawasan", "/karier", "/hubungi-kami", "/kebijakan-privasi"];
  return [...routes, ...portfolios.map((item) => `/portofolio/${item.slug}`)].map((path) => ({ url: `https://kinaraland.com${path}`, lastModified: new Date(), changeFrequency: path ? "monthly" : "weekly", priority: path ? .8 : 1 }));
}
