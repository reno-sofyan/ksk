<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Jakarta');

const MAX_DRAFTS = 50;
const MAX_POSTS = 200;
const MAX_JSON_BYTES = 1024 * 1024 * 8;
const DEFAULT_ADMIN_KEY = 'RivereBlog2026!';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Blog-Admin-Key');

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function blog_data_dir(): string
{
    return dirname(__DIR__) . '/.blog-data';
}

function blog_data_file(): string
{
    return blog_data_dir() . '/blog-posts.json';
}

function blog_upload_dir(): string
{
    return dirname(__DIR__) . '/images/blog-uploads';
}

function empty_blog_store(): array
{
    return [
        'drafts' => [],
        'publishedPosts' => [],
        'lastUpdated' => null,
    ];
}

function ensure_blog_storage(): void
{
    $dataDir = blog_data_dir();
    $uploadDir = blog_upload_dir();

    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $htaccess = $dataDir . '/.htaccess';

    if (!file_exists($htaccess)) {
        file_put_contents($htaccess, "Require all denied\nDeny from all\n", LOCK_EX);
    }
}

function normalize_store($decoded): array
{
    return is_array($decoded) ? array_merge(empty_blog_store(), $decoded) : empty_blog_store();
}

function read_blog_store(): array
{
    ensure_blog_storage();
    $file = blog_data_file();

    if (!file_exists($file)) {
        return empty_blog_store();
    }

    $raw = file_get_contents($file);
    $decoded = json_decode($raw ?: '', true);

    return normalize_store($decoded);
}

function update_blog_store(callable $updater): array
{
    ensure_blog_storage();
    $file = blog_data_file();
    $handle = fopen($file, 'c+');

    if ($handle === false) {
        throw new RuntimeException('Blog storage unavailable.');
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            throw new RuntimeException('Blog storage lock unavailable.');
        }

        rewind($handle);
        $raw = stream_get_contents($handle);
        $store = normalize_store(json_decode($raw ?: '', true));
        $next = $updater($store);
        $next['lastUpdated'] = date(DATE_ATOM);
        $encoded = json_encode($next, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        if ($encoded === false || strlen($encoded) > MAX_JSON_BYTES) {
            throw new RuntimeException('Blog storage payload too large.');
        }

        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, $encoded);
        fflush($handle);
        flock($handle, LOCK_UN);

        return $next;
    } finally {
        fclose($handle);
    }
}

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function clean_string($value, int $maxLength = 500): string
{
    $clean = trim((string) $value);
    $clean = preg_replace('/[\x00-\x1F\x7F]/u', '', $clean) ?? '';

    if (function_exists('mb_substr')) {
        return mb_substr($clean, 0, $maxLength);
    }

    return substr($clean, 0, $maxLength);
}

function clean_slug($value): string
{
    $slug = strtolower(clean_string($value, 120));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';
    $slug = trim($slug, '-');

    return $slug !== '' ? substr($slug, 0, 80) : 'artikel';
}

function clean_list($value, int $maxItems = 20, int $maxLength = 500): array
{
    if (!is_array($value)) {
        return [];
    }

    $items = [];

    foreach ($value as $item) {
        $clean = clean_string($item, $maxLength);

        if ($clean !== '') {
            $items[] = $clean;
        }

        if (count($items) >= $maxItems) {
            break;
        }
    }

    return $items;
}

function count_words_from_post(array $post): int
{
    $parts = $post['intro'] ?? [];

    foreach (($post['sections'] ?? []) as $section) {
        foreach (($section['paragraphs'] ?? []) as $paragraph) {
            $parts[] = $paragraph;
        }
    }

    $text = trim(implode(' ', $parts));

    return $text === '' ? 0 : count(preg_split('/\s+/', $text));
}

function estimate_read_time(array $post): string
{
    return max(1, (int) ceil(count_words_from_post($post) / 180)) . ' menit baca';
}

function save_data_image_if_needed(string $image, string $slug): string
{
    if (!preg_match('/^data:image\/(png|jpe?g|webp);base64,/', $image, $matches)) {
        return clean_string($image, 1200);
    }

    $extension = $matches[1] === 'jpeg' ? 'jpg' : $matches[1];
    $base64 = substr($image, strpos($image, ',') + 1);
    $binary = base64_decode($base64, true);

    if ($binary === false || strlen($binary) > 1024 * 1024 * 5) {
        throw new RuntimeException('Invalid or too large blog image.');
    }

    ensure_blog_storage();
    $safeSlug = clean_slug($slug);
    $fileName = $safeSlug . '-' . time() . '-' . bin2hex(random_bytes(3)) . '.' . $extension;
    $filePath = blog_upload_dir() . '/' . $fileName;

    file_put_contents($filePath, $binary, LOCK_EX);

    return '/images/blog-uploads/' . $fileName;
}

function normalize_section($section): ?array
{
    if (!is_array($section)) {
        return null;
    }

    $heading = clean_string($section['heading'] ?? 'Pembahasan Utama', 180);
    $paragraphs = clean_list($section['paragraphs'] ?? [], 80, 4000);
    $bullets = clean_list($section['bullets'] ?? [], 40, 600);

    if ($heading === '' && count($paragraphs) === 0) {
        return null;
    }

    $next = [
        'heading' => $heading !== '' ? $heading : 'Pembahasan Utama',
        'paragraphs' => $paragraphs,
    ];

    if (count($bullets)) {
        $next['bullets'] = $bullets;
    }

    return $next;
}

function normalize_faq($faq): array
{
    if (!is_array($faq)) {
        return [];
    }

    $items = [];

    foreach ($faq as $item) {
        if (!is_array($item)) {
            continue;
        }

        $question = clean_string($item['question'] ?? '', 220);
        $answer = clean_string($item['answer'] ?? '', 1200);

        if ($question !== '' && $answer !== '') {
            $items[] = ['question' => $question, 'answer' => $answer];
        }

        if (count($items) >= 8) {
            break;
        }
    }

    return $items;
}

function normalize_post(array $input): array
{
    $title = clean_string($input['title'] ?? '', 220);
    $slug = clean_slug($input['slug'] ?? $title);
    $today = date('Y-m-d');
    $sections = [];

    foreach (($input['sections'] ?? []) as $section) {
        $normalized = normalize_section($section);

        if ($normalized !== null) {
            $sections[] = $normalized;
        }
    }

    if (!count($sections)) {
        $sections[] = [
            'heading' => 'Pembahasan Utama',
            'paragraphs' => [],
        ];
    }

    $post = [
        'id' => clean_string($input['id'] ?? ('post-' . time() . '-' . bin2hex(random_bytes(3))), 120),
        'source' => 'hostinger',
        'slug' => $slug,
        'title' => $title,
        'seoTitle' => clean_string($input['seoTitle'] ?? $title, 220),
        'description' => clean_string($input['description'] ?? '', 500),
        'excerpt' => clean_string($input['excerpt'] ?? '', 500),
        'category' => clean_string($input['category'] ?? 'Rivere Insights', 120),
        'datePublished' => clean_string($input['datePublished'] ?? $today, 40),
        'dateModified' => $today,
        'readTime' => clean_string($input['readTime'] ?? '', 40),
        'image' => save_data_image_if_needed((string) ($input['image'] ?? ''), $slug),
        'imageAlt' => clean_string($input['imageAlt'] ?? $title, 220),
        'keywords' => clean_list($input['keywords'] ?? [], 20, 120),
        'intro' => clean_list($input['intro'] ?? [], 20, 4000),
        'sections' => $sections,
        'faq' => normalize_faq($input['faq'] ?? []),
        'updatedAt' => date(DATE_ATOM),
    ];

    if ($post['readTime'] === '') {
        $post['readTime'] = estimate_read_time($post);
    }

    return $post;
}

function normalize_draft(array $input): array
{
    $draft = $input;
    $draft['id'] = clean_string($input['id'] ?? ('draft-' . time() . '-' . bin2hex(random_bytes(3))), 120);
    $draft['title'] = clean_string($input['title'] ?? '', 220);
    $draft['slug'] = clean_slug($input['slug'] ?? $draft['title']);
    $draft['image'] = save_data_image_if_needed((string) ($input['image'] ?? ''), $draft['slug']);
    $draft['updatedAt'] = date(DATE_ATOM);

    return $draft;
}

function require_admin(): void
{
    $expected = getenv('BLOG_ADMIN_KEY') ?: DEFAULT_ADMIN_KEY;
    $provided = $_SERVER['HTTP_X_BLOG_ADMIN_KEY'] ?? '';
    $authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if ($provided === '' && str_starts_with($authorization, 'Bearer ')) {
        $provided = substr($authorization, 7);
    }

    if (!hash_equals($expected, $provided)) {
        respond(['error' => 'Unauthorized'], 401);
    }
}

function get_json_input(): array
{
    $raw = file_get_contents('php://input') ?: '{}';
    $decoded = json_decode($raw, true);

    if (!is_array($decoded)) {
        respond(['error' => 'Invalid JSON'], 400);
    }

    return $decoded;
}

function sort_posts(array $posts): array
{
    usort($posts, function ($a, $b) {
        return strtotime($b['updatedAt'] ?? $b['dateModified'] ?? $b['datePublished'] ?? 'now')
            <=> strtotime($a['updatedAt'] ?? $a['dateModified'] ?? $a['datePublished'] ?? 'now');
    });

    return $posts;
}

try {
    $action = clean_string($_GET['action'] ?? 'published', 80);

    if ($method === 'GET') {
        $store = read_blog_store();

        if ($action === 'drafts') {
            require_admin();
            respond(['items' => $store['drafts'] ?? [], 'source' => 'server', 'lastUpdated' => $store['lastUpdated'] ?? null]);
        }

        respond(['items' => $store['publishedPosts'] ?? [], 'source' => 'server', 'lastUpdated' => $store['lastUpdated'] ?? null]);
    }

    if ($method === 'POST') {
        require_admin();
        $input = get_json_input();

        if ($action === 'draft') {
            $draft = normalize_draft($input);
            $store = update_blog_store(function (array $store) use ($draft) {
                $drafts = array_values(array_filter($store['drafts'] ?? [], fn ($item) => ($item['id'] ?? '') !== $draft['id']));
                $store['drafts'] = array_slice(array_merge([$draft], $drafts), 0, MAX_DRAFTS);
                return $store;
            });

            respond(['ok' => true, 'items' => $store['drafts'], 'draft' => $draft], 201);
        }

        if ($action === 'publish') {
            $post = normalize_post($input);

            if ($post['title'] === '' || $post['slug'] === '' || $post['description'] === '' || $post['excerpt'] === '') {
                respond(['error' => 'Required blog fields are incomplete.'], 422);
            }

            $store = update_blog_store(function (array $store) use ($post) {
                $posts = array_values(array_filter($store['publishedPosts'] ?? [], fn ($item) => ($item['slug'] ?? '') !== $post['slug']));
                $store['publishedPosts'] = array_slice(sort_posts(array_merge([$post], $posts)), 0, MAX_POSTS);
                return $store;
            });

            respond(['ok' => true, 'items' => $store['publishedPosts'], 'post' => $post], 201);
        }

        respond(['error' => 'Unknown action'], 400);
    }

    if ($method === 'DELETE') {
        require_admin();

        if ($action === 'draft') {
            $id = clean_string($_GET['id'] ?? '', 140);
            $store = update_blog_store(function (array $store) use ($id) {
                $store['drafts'] = array_values(array_filter($store['drafts'] ?? [], fn ($item) => ($item['id'] ?? '') !== $id));
                return $store;
            });

            respond(['ok' => true, 'items' => $store['drafts']]);
        }

        if ($action === 'published') {
            $slug = clean_slug($_GET['slug'] ?? '');
            $store = update_blog_store(function (array $store) use ($slug) {
                $store['publishedPosts'] = array_values(array_filter($store['publishedPosts'] ?? [], fn ($item) => ($item['slug'] ?? '') !== $slug));
                return $store;
            });

            respond(['ok' => true, 'items' => $store['publishedPosts']]);
        }

        respond(['error' => 'Unknown action'], 400);
    }

    respond(['error' => 'Method not allowed'], 405);
} catch (Throwable $error) {
    respond(['error' => 'Blog API unavailable', 'detail' => $error->getMessage()], 500);
}
