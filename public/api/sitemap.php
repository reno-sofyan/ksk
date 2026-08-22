<?php
declare(strict_types=1);

const SITE_URL = 'https://rivere.kinaraland.com';

$root = dirname(__DIR__);
$staticFile = $root . '/sitemap.xml';
$storeFile = $root . '/.blog-data/blog-posts.json';
$staticXml = file_exists($staticFile) ? file_get_contents($staticFile) : '';
$store = file_exists($storeFile) ? json_decode(file_get_contents($storeFile) ?: '{}', true) : [];
$entries = '';

foreach (($store['publishedPosts'] ?? []) as $post) {
    if (($post['status'] ?? 'published') !== 'published' || ($post['robotsIndex'] ?? true) === false) continue;
    $slug = preg_replace('/[^a-z0-9-]/', '', strtolower((string) ($post['slug'] ?? ''))) ?? '';
    if ($slug === '') continue;
    $modified = htmlspecialchars((string) ($post['dateModified'] ?? $post['datePublished'] ?? date('Y-m-d')), ENT_XML1);
    $location = htmlspecialchars(SITE_URL . '/blog/' . $slug . '/', ENT_XML1);
    if (str_contains($staticXml, '<loc>' . $location . '</loc>')) continue;
    $entries .= "  <url>\n    <loc>{$location}</loc>\n    <lastmod>{$modified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n";
}

$xml = $staticXml !== ''
    ? str_replace('</urlset>', $entries . '</urlset>', $staticXml)
    : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n{$entries}</urlset>\n";

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate, max-age=0');
echo $xml;

