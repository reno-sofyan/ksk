<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Jakarta');

const MAX_EVENTS = 500;
const MAX_VISITORS = 20000;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function analytics_data_dir(): string
{
    return dirname(__DIR__) . '/.analytics-data';
}

function analytics_data_file(): string
{
    return analytics_data_dir() . '/visitor-analytics.json';
}

function empty_analytics(): array
{
    return [
        'totalPageViews' => 0,
        'totalSessions' => 0,
        'uniqueVisitors' => 0,
        'visitors' => [],
        'events' => [],
        'pageViewsByPath' => [],
        'dailyPageViews' => [],
        'lastUpdated' => null,
    ];
}

function ensure_storage(): void
{
    $dir = analytics_data_dir();

    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $htaccess = $dir . '/.htaccess';

    if (!file_exists($htaccess)) {
        file_put_contents($htaccess, "Require all denied\nDeny from all\n", LOCK_EX);
    }
}

function normalize_analytics($decoded): array
{
    return is_array($decoded) ? array_merge(empty_analytics(), $decoded) : empty_analytics();
}

function read_analytics(): array
{
    ensure_storage();
    $file = analytics_data_file();

    if (!file_exists($file)) {
        return empty_analytics();
    }

    $raw = file_get_contents($file);
    $decoded = json_decode($raw ?: '', true);

    return normalize_analytics($decoded);
}

function write_analytics(array $data): void
{
    ensure_storage();
    file_put_contents(analytics_data_file(), json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX);
}

function update_analytics(callable $updater): array
{
    ensure_storage();
    $file = analytics_data_file();
    $handle = fopen($file, 'c+');

    if ($handle === false) {
        throw new RuntimeException('Analytics storage unavailable.');
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            throw new RuntimeException('Analytics storage lock unavailable.');
        }

        rewind($handle);
        $raw = stream_get_contents($handle);
        $analytics = normalize_analytics(json_decode($raw ?: '', true));
        $next = $updater($analytics);
        $encoded = json_encode($next, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, $encoded ?: '{}');
        fflush($handle);
        flock($handle, LOCK_UN);

        return $next;
    } finally {
        fclose($handle);
    }
}

function clean_string($value, int $maxLength = 255): string
{
    $clean = trim((string) $value);
    $clean = preg_replace('/[\x00-\x1F\x7F]/u', '', $clean) ?? '';

    if (function_exists('mb_substr')) {
        return mb_substr($clean, 0, $maxLength);
    }

    return substr($clean, 0, $maxLength);
}

function client_ip_hash(): string
{
    $raw = $_SERVER['HTTP_CF_CONNECTING_IP']
        ?? $_SERVER['HTTP_X_FORWARDED_FOR']
        ?? $_SERVER['REMOTE_ADDR']
        ?? 'unknown';
    $ip = explode(',', (string) $raw)[0];

    return hash('sha256', trim($ip));
}

function sum_daily_page_views(array $dailyPageViews, int $days): int
{
    $since = new DateTimeImmutable('-' . ($days - 1) . ' days');
    $total = 0;

    foreach ($dailyPageViews as $date => $count) {
        if ($date >= $since->format('Y-m-d')) {
            $total += (int) $count;
        }
    }

    return $total;
}

function summarize_analytics(array $analytics): array
{
    $todayKey = date('Y-m-d');
    $dailyPageViews = $analytics['dailyPageViews'] ?? [];
    $topPages = [];

    foreach (($analytics['pageViewsByPath'] ?? []) as $path => $views) {
        $topPages[] = ['path' => $path, 'views' => (int) $views];
    }

    usort($topPages, function ($a, $b) {
        return $b['views'] <=> $a['views'];
    });

    $events = array_slice($analytics['events'] ?? [], 0, 12);

    return array_merge($analytics, [
        'todayPageViews' => (int) ($dailyPageViews[$todayKey] ?? 0),
        'last7DaysPageViews' => sum_daily_page_views($dailyPageViews, 7),
        'last14DaysPageViews' => sum_daily_page_views($dailyPageViews, 14),
        'last30DaysPageViews' => sum_daily_page_views($dailyPageViews, 30),
        'topPages' => array_slice($topPages, 0, 8),
        'recentEvents' => $events,
        'source' => 'server',
    ]);
}

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($method === 'GET') {
    respond(summarize_analytics(read_analytics()));
}

if ($method !== 'POST') {
    respond(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input') ?: '{}', true);

if (!is_array($input)) {
    respond(['error' => 'Invalid JSON'], 400);
}

$pathname = clean_string($input['pathname'] ?? '/', 320);
$title = clean_string($input['title'] ?? '', 180);
$visitorId = clean_string($input['visitorId'] ?? '', 140);
$sessionId = clean_string($input['sessionId'] ?? '', 140);
$referrer = clean_string($input['referrer'] ?? '', 500);
$isNewSession = filter_var($input['isNewSession'] ?? false, FILTER_VALIDATE_BOOLEAN);

if ($pathname === '') {
    $pathname = '/';
}

if ($visitorId === '') {
    $visitorId = 'ip-' . client_ip_hash();
}

if ($sessionId === '') {
    $sessionId = 'session-' . time() . '-' . bin2hex(random_bytes(4));
    $isNewSession = true;
}

$now = time();

try {
    $next = update_analytics(function (array $analytics) use ($visitorId, $sessionId, $pathname, $title, $referrer, $isNewSession, $now) {
        $dateKey = date('Y-m-d', $now);
        $visitors = array_values(array_unique($analytics['visitors'] ?? []));

        if (!in_array($visitorId, $visitors, true)) {
            $visitors[] = $visitorId;
        }

        if (count($visitors) > MAX_VISITORS) {
            $visitors = array_slice($visitors, -MAX_VISITORS);
        }

        $event = [
            'id' => $now . '-' . bin2hex(random_bytes(4)),
            'visitorId' => $visitorId,
            'sessionId' => $sessionId,
            'pathname' => $pathname,
            'title' => $title,
            'referrer' => $referrer,
            'timestamp' => $now * 1000,
        ];

        $pageViewsByPath = $analytics['pageViewsByPath'] ?? [];
        $dailyPageViews = $analytics['dailyPageViews'] ?? [];

        $pageViewsByPath[$pathname] = (int) ($pageViewsByPath[$pathname] ?? 0) + 1;
        $dailyPageViews[$dateKey] = (int) ($dailyPageViews[$dateKey] ?? 0) + 1;

        return [
            'totalPageViews' => (int) ($analytics['totalPageViews'] ?? 0) + 1,
            'totalSessions' => (int) ($analytics['totalSessions'] ?? 0) + ($isNewSession ? 1 : 0),
            'uniqueVisitors' => count($visitors),
            'visitors' => $visitors,
            'events' => array_slice(array_merge([$event], $analytics['events'] ?? []), 0, MAX_EVENTS),
            'pageViewsByPath' => $pageViewsByPath,
            'dailyPageViews' => $dailyPageViews,
            'lastUpdated' => date(DATE_ATOM, $now),
        ];
    });
} catch (Throwable $error) {
    respond(['error' => 'Analytics storage unavailable'], 500);
}

respond(['ok' => true, 'analytics' => summarize_analytics($next)], 201);
