#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { BLOG_POSTS, SITE_URL, getBlogPostUrl } from '../src/data/blogPosts.js';
import { DENAH_PAGE } from '../src/data/riverePlans.js';

const errors = [];
const outputDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : null;

function check(condition, message) {
  if (!condition) errors.push(message);
}

function countMatches(content, pattern) {
  return [...content.matchAll(pattern)].length;
}

function articleWordCount(post) {
  const text = [
    ...post.intro,
    ...post.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets || [])]),
    ...post.faq.flatMap((item) => [item.question, item.answer])
  ].join(' ');

  return text.trim().split(/\s+/).length;
}

function extractJsonLd(html, fileName) {
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];

  return blocks.map((match, index) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${fileName}: JSON-LD block ${index + 1} is invalid (${error.message})`);
      return null;
    }
  }).filter(Boolean);
}

function flattenSchemaTypes(schema) {
  const nodes = schema['@graph'] || [schema];
  return new Set(nodes.map((node) => node['@type']).filter(Boolean));
}

function auditSourceData() {
  const slugs = new Set();
  const titles = new Set();
  const descriptions = new Set();

  for (const post of BLOG_POSTS) {
    const label = `Article ${post.slug}`;
    const imagePath = path.join(process.cwd(), 'public', decodeURIComponent(post.image).replace(/^\//, ''));
    const words = articleWordCount(post);

    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug), `${label}: slug must be lowercase and hyphenated`);
    check(!slugs.has(post.slug), `${label}: duplicate slug`);
    check(!titles.has(post.seoTitle), `${label}: duplicate SEO title`);
    check(!descriptions.has(post.description), `${label}: duplicate meta description`);
    check(post.seoTitle.length >= 30 && post.seoTitle.length <= 60, `${label}: SEO title length is ${post.seoTitle.length}, expected 30-60`);
    check(post.description.length >= 120 && post.description.length <= 160, `${label}: meta description length is ${post.description.length}, expected 120-160`);
    check(words >= 350, `${label}: content is too thin at ${words} words`);
    check(post.sections.length >= 4, `${label}: expected at least 4 content sections`);
    check(post.faq.length >= 2, `${label}: expected at least 2 visible FAQs`);
    check(post.keywords.length >= 3, `${label}: expected at least 3 focused keyword phrases`);
    check(fs.existsSync(imagePath), `${label}: image does not exist at ${post.image}`);

    slugs.add(post.slug);
    titles.add(post.seoTitle);
    descriptions.add(post.description);
  }

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const robots = fs.readFileSync(robotsPath, 'utf8');

  check(sitemap.includes(`<loc>${SITE_URL}/</loc>`), 'Sitemap: homepage URL is missing');
  check(sitemap.includes(`<loc>${SITE_URL}${DENAH_PAGE.path}</loc>`), 'Sitemap: denah URL is missing');
  check(sitemap.includes(`<loc>${SITE_URL}/blog/</loc>`), 'Sitemap: blog URL is missing');
  check(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), 'robots.txt: sitemap declaration is missing');

  for (const post of BLOG_POSTS) {
    check(sitemap.includes(`<loc>${getBlogPostUrl(post)}</loc>`), `Sitemap: ${post.slug} is missing`);
  }
}

function auditBuiltHtml() {
  if (!outputDir) return;

  const homePath = path.join(outputDir, 'index.html');
  const denahPath = path.join(outputDir, 'denah', 'index.html');
  const blogPath = path.join(outputDir, 'blog', 'index.html');

  check(fs.existsSync(homePath), `Build: missing ${homePath}`);
  check(fs.existsSync(denahPath), `Build: missing ${denahPath}`);
  check(fs.existsSync(blogPath), `Build: missing ${blogPath}`);

  if (fs.existsSync(homePath)) {
    const homeHtml = fs.readFileSync(homePath, 'utf8');
    check(countMatches(homeHtml, /<link[^>]*rel="canonical"/gi) === 1, 'Homepage: expected exactly one canonical link');
    check(countMatches(homeHtml, /<meta[^>]*name="description"/gi) === 1, 'Homepage: expected exactly one meta description');
    check(countMatches(homeHtml, /<h1[\s>]/gi) === 1, 'Homepage: expected exactly one H1');
    const types = new Set(extractJsonLd(homeHtml, 'Homepage').flatMap((schema) => [...flattenSchemaTypes(schema)]));
    check(types.has('Organization'), 'Homepage schema: Organization is missing');
    check(types.has('WebSite'), 'Homepage schema: WebSite is missing');
    check(types.has('WebPage'), 'Homepage schema: WebPage is missing');
  }

  if (fs.existsSync(denahPath)) {
    const denahHtml = fs.readFileSync(denahPath, 'utf8');
    check(countMatches(denahHtml, /<link[^>]*rel="canonical"/gi) === 1, 'Denah page: expected exactly one canonical link');
    check(countMatches(denahHtml, /<meta[^>]*name="description"/gi) === 1, 'Denah page: expected exactly one meta description');
    check(countMatches(denahHtml, /<h1[\s>]/gi) === 1, 'Denah page: expected exactly one H1');
    const types = new Set(extractJsonLd(denahHtml, 'Denah page').flatMap((schema) => [...flattenSchemaTypes(schema)]));
    check(types.has('CollectionPage'), 'Denah page schema: CollectionPage is missing');
  }

  if (fs.existsSync(blogPath)) {
    const blogHtml = fs.readFileSync(blogPath, 'utf8');
    check(countMatches(blogHtml, /<link[^>]*rel="canonical"/gi) === 1, 'Blog index: expected exactly one canonical link');
    check(countMatches(blogHtml, /<meta[^>]*name="description"/gi) === 1, 'Blog index: expected exactly one meta description');
    check(countMatches(blogHtml, /<h1[\s>]/gi) === 1, 'Blog index: expected exactly one H1');
    const types = new Set(extractJsonLd(blogHtml, 'Blog index').flatMap((schema) => [...flattenSchemaTypes(schema)]));
    check(types.has('Blog'), 'Blog index schema: Blog is missing');
  }

  for (const post of BLOG_POSTS) {
    const articlePath = path.join(outputDir, 'blog', post.slug, 'index.html');
    const label = `Built article ${post.slug}`;
    check(fs.existsSync(articlePath), `${label}: HTML file is missing`);
    if (!fs.existsSync(articlePath)) continue;

    const html = fs.readFileSync(articlePath, 'utf8');
    const schemas = extractJsonLd(html, label);
    const types = new Set(schemas.flatMap((schema) => [...flattenSchemaTypes(schema)]));

    check(countMatches(html, /<title[^>]*>/gi) === 1, `${label}: expected exactly one title`);
    check(countMatches(html, /<meta[^>]*name="description"/gi) === 1, `${label}: expected exactly one meta description`);
    check(countMatches(html, /<link[^>]*rel="canonical"/gi) === 1, `${label}: expected exactly one canonical link`);
    check(html.includes(`href="${getBlogPostUrl(post)}"`), `${label}: canonical URL is incorrect`);
    check(countMatches(html, /<h1[\s>]/gi) === 1, `${label}: expected exactly one H1`);
    check(countMatches(html, /<article[\s>]/gi) === 1, `${label}: expected semantic article markup`);
    check(types.has('BlogPosting'), `${label}: BlogPosting schema is missing`);
    check(types.has('BreadcrumbList'), `${label}: BreadcrumbList schema is missing`);
    check(types.has('FAQPage'), `${label}: FAQPage schema is missing`);
  }
}

auditSourceData();
auditBuiltHtml();

if (errors.length) {
  console.error(`SEO audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO audit passed for ${BLOG_POSTS.length} articles${outputDir ? ' and built HTML' : ''}`);
