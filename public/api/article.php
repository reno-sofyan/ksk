<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Jakarta');

const SITE_URL = 'https://rivere.kinaraland.com';
const DEFAULT_IMAGE = '/images/rivere/Design%201/1.png';

function escape_html($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function absolute_url($value): string
{
    $url = trim((string) $value);
    if (preg_match('/^https?:\/\//i', $url)) return $url;
    return SITE_URL . '/' . ltrim($url !== '' ? $url : DEFAULT_IMAGE, '/');
}

function format_date_id($value): string
{
    $timestamp = strtotime((string) $value);
    return $timestamp ? date('d-m-Y', $timestamp) : '';
}

function sanitize_article_html($value): string
{
    $html = strip_tags((string) $value, '<p><h2><h3><strong><b><em><i><ol><ul><li><a><img><blockquote><br>');
    $html = preg_replace('/\s(on\w+|style|class|id)\s*=\s*(["\']).*?\2/isu', '', $html) ?? '';
    return preg_replace('/\s(href|src)\s*=\s*(["\'])\s*(javascript:|data:text\/html)[^"\']*\2/isu', '', $html) ?? '';
}

$root = dirname(__DIR__);
$storeFile = $root . '/.blog-data/blog-posts.json';
$shellFile = $root . '/index.html';
$slug = strtolower(trim((string) ($_GET['slug'] ?? '')));
$slug = preg_replace('/[^a-z0-9-]/', '', $slug) ?? '';
$store = file_exists($storeFile) ? json_decode(file_get_contents($storeFile) ?: '{}', true) : [];
$post = null;

foreach (($store['publishedPosts'] ?? []) as $item) {
    if (($item['slug'] ?? '') === $slug && ($item['status'] ?? 'published') === 'published') {
        $post = $item;
        break;
    }
}

if (!$post || !file_exists($shellFile)) {
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>Artikel tidak ditemukan</title></head><body><main><h1>Artikel tidak ditemukan</h1><p><a href="/blog/">Kembali ke Blog</a></p></main></body></html>';
    exit;
}

$title = trim((string) ($post['seoTitle'] ?? '')) ?: (string) ($post['title'] ?? '');
$description = trim((string) ($post['description'] ?? '')) ?: (string) ($post['excerpt'] ?? '');
$canonical = trim((string) ($post['canonicalUrl'] ?? '')) ?: SITE_URL . '/blog/' . $slug . '/';
$ogTitle = trim((string) ($post['ogTitle'] ?? '')) ?: $title;
$ogDescription = trim((string) ($post['ogDescription'] ?? '')) ?: $description;
$ogImage = absolute_url(trim((string) ($post['ogImage'] ?? '')) ?: ($post['image'] ?? DEFAULT_IMAGE));
$featuredImage = absolute_url($post['image'] ?? DEFAULT_IMAGE);
$robots = (($post['robotsIndex'] ?? true) ? 'index' : 'noindex') . ', ' . (($post['robotsFollow'] ?? true) ? 'follow' : 'nofollow') . ', max-image-preview:large';
$author = trim((string) ($post['author'] ?? '')) ?: 'Tim Rivere Kostaycation IPB';
$tags = is_array($post['tags'] ?? null) ? $post['tags'] : ($post['keywords'] ?? []);
$content = sanitize_article_html($post['contentHtml'] ?? '');

if ($content === '') {
    foreach (($post['intro'] ?? []) as $paragraph) $content .= '<p>' . escape_html($paragraph) . '</p>';
    foreach (($post['sections'] ?? []) as $section) {
        $content .= '<h2>' . escape_html($section['heading'] ?? '') . '</h2>';
        foreach (($section['paragraphs'] ?? []) as $paragraph) $content .= '<p>' . escape_html($paragraph) . '</p>';
    }
}

$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'BlogPosting',
            'headline' => $post['title'] ?? '',
            'description' => $description,
            'image' => $featuredImage,
            'datePublished' => $post['datePublished'] ?? '',
            'dateModified' => $post['dateModified'] ?? ($post['datePublished'] ?? ''),
            'author' => ['@type' => 'Person', 'name' => $author],
            'publisher' => ['@type' => 'Organization', 'name' => 'PT Kinara Land Indonesia', 'url' => 'https://kinaraland.com/'],
            'mainEntityOfPage' => $canonical,
            'articleSection' => $post['category'] ?? '',
            'keywords' => implode(', ', $tags),
            'inLanguage' => 'id-ID',
        ],
        [
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => SITE_URL . '/'],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => SITE_URL . '/blog/'],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $post['title'] ?? '', 'item' => $canonical],
            ],
        ],
    ],
];

$tagMarkup = implode('', array_map(fn ($tag) => '<span class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">#' . escape_html($tag) . '</span>', $tags));
$articleMarkup = '
<div class="min-h-screen bg-background text-foreground">
  <header class="border-b border-border bg-white"><div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"><a class="font-bold text-primary" href="/">Rivere Kostaycation IPB</a><nav class="flex gap-5 text-sm font-semibold"><a href="/blog/">Blog</a><a href="/#konsultasi">Konsultasi</a></nav></div></header>
  <main>
    <article>
      <header class="border-b border-border bg-white py-12">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
          <nav class="mb-7 text-sm text-muted-foreground"><a href="/">Beranda</a> / <a href="/blog/">Blog</a> / ' . escape_html($post['title'] ?? '') . '</nav>
          <p class="text-sm font-semibold text-accent">' . escape_html($post['category'] ?? '') . '</p>
          <h1 class="mt-4 text-4xl font-bold leading-tight text-primary">' . escape_html($post['title'] ?? '') . '</h1>
          <p class="mt-5 text-lg leading-8 text-muted-foreground">' . escape_html($post['excerpt'] ?? '') . '</p>
          <p class="mt-6 text-sm text-muted-foreground">' . escape_html($author) . ' · Terbit ' . escape_html(format_date_id($post['datePublished'] ?? '')) . '</p>
        </div>
      </header>
      <div class="mx-auto max-w-4xl px-4 pt-10 sm:px-6"><img class="aspect-[16/9] w-full rounded-lg object-cover" src="' . escape_html($featuredImage) . '" alt="' . escape_html($post['imageAlt'] ?? '') . '"></div>
      <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div class="article-content text-lg leading-8">' . $content . '</div>
        <div class="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">' . $tagMarkup . '</div>
      </div>
    </article>
  </main>
  <footer class="bg-primary py-10 text-white"><div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-4 sm:px-6"><p class="font-bold">Rivere Kostaycation IPB</p><p class="text-sm text-white/70">PT Kinara Land Indonesia</p></div></footer>
</div>';

$html = file_get_contents($shellFile) ?: '';
$html = preg_replace('/<title[^>]*>.*?<\/title>/is', '<title>' . escape_html($title) . '</title>', $html, 1);
$html = preg_replace('/<meta(?=[^>]*name="description")[^>]*>/i', '<meta name="description" content="' . escape_html($description) . '">', $html, 1);
$head = '
<meta name="robots" content="' . escape_html($robots) . '">
<link rel="canonical" href="' . escape_html($canonical) . '">
<meta property="og:type" content="article"><meta property="og:title" content="' . escape_html($ogTitle) . '"><meta property="og:description" content="' . escape_html($ogDescription) . '"><meta property="og:url" content="' . escape_html($canonical) . '"><meta property="og:image" content="' . escape_html($ogImage) . '">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' . escape_html($ogTitle) . '"><meta name="twitter:description" content="' . escape_html($ogDescription) . '"><meta name="twitter:image" content="' . escape_html($ogImage) . '">
<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
$html = str_replace('</head>', $head . '</head>', $html);
$html = preg_replace('/<div id="root">.*?<\/div>\s*<\/body>/is', '<div id="root">' . $articleMarkup . '</div></body>', $html, 1);

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate, max-age=0');
echo $html;
