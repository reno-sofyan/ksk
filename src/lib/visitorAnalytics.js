const ANALYTICS_KEY = 'rivere_visitor_analytics_v1';
const VISITOR_ID_KEY = 'rivere_visitor_id';
const SESSION_KEY = 'rivere_session_state';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const MAX_EVENTS = 250;
const REMOTE_ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_API_URL || '/api/analytics.php';
const REMOTE_TIMEOUT_MS = 5000;
const ANALYTICS_TIME_ZONE = 'Asia/Jakarta';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readAnalytics() {
  if (!canUseStorage()) {
    return createEmptyAnalytics();
  }

  try {
    const value = window.localStorage.getItem(ANALYTICS_KEY);
    return value ? { ...createEmptyAnalytics(), ...JSON.parse(value) } : createEmptyAnalytics();
  } catch {
    return createEmptyAnalytics();
  }
}

function writeAnalytics(data) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

function getDateKey(value = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: ANALYTICS_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(value);
}

function getSinceDateKey(days) {
  const since = new Date();
  since.setDate(since.getDate() - (days - 1));
  return getDateKey(since);
}

function sumDailyPageViews(dailyPageViews, days) {
  const sinceKey = getSinceDateKey(days);

  return Object.entries(dailyPageViews || {}).reduce((total, [date, count]) => {
    return date >= sinceKey ? total + Number(count || 0) : total;
  }, 0);
}

function createEmptyAnalytics() {
  return {
    totalPageViews: 0,
    totalSessions: 0,
    uniqueVisitors: 0,
    visitors: [],
    events: [],
    pageViewsByPath: {},
    dailyPageViews: {}
  };
}

function canUseFetch() {
  return typeof window !== 'undefined' && typeof window.fetch === 'function';
}

function shouldUseRemoteAnalytics() {
  return Boolean(REMOTE_ANALYTICS_URL) && REMOTE_ANALYTICS_URL !== 'disabled';
}

function getOrCreateVisitorId() {
  if (!canUseStorage()) return 'visitor-unavailable';

  let visitorId = window.localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

function getSessionState(now) {
  if (!canUseStorage()) {
    return { sessionId: `session-${now}`, isNewSession: true };
  }

  try {
    const current = JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null');
    const isExpired = !current?.lastSeen || now - current.lastSeen > SESSION_TIMEOUT_MS;

    if (!current || isExpired) {
      const next = { sessionId: `session-${now}`, lastSeen: now };
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      return { ...next, isNewSession: true };
    }

    const next = { ...current, lastSeen: now };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    return { ...next, isNewSession: false };
  } catch {
    return { sessionId: `session-${now}`, isNewSession: true };
  }
}

export function trackPageView(pathname, title = '') {
  if (!canUseStorage()) return;

  const now = Date.now();
  const dateKey = getDateKey(new Date(now));
  const visitorId = getOrCreateVisitorId();
  const session = getSessionState(now);
  const analytics = readAnalytics();
  const visitors = new Set(analytics.visitors || []);

  visitors.add(visitorId);

  const event = {
    id: `${now}-${Math.random().toString(16).slice(2)}`,
    visitorId,
    sessionId: session.sessionId,
    pathname,
    title,
    timestamp: now
  };

  const next = {
    ...analytics,
    totalPageViews: (analytics.totalPageViews || 0) + 1,
    totalSessions: (analytics.totalSessions || 0) + (session.isNewSession ? 1 : 0),
    uniqueVisitors: visitors.size,
    visitors: [...visitors],
    events: [event, ...(analytics.events || [])].slice(0, MAX_EVENTS),
    pageViewsByPath: {
      ...(analytics.pageViewsByPath || {}),
      [pathname]: ((analytics.pageViewsByPath || {})[pathname] || 0) + 1
    },
    dailyPageViews: {
      ...(analytics.dailyPageViews || {}),
      [dateKey]: ((analytics.dailyPageViews || {})[dateKey] || 0) + 1
    }
  };

  writeAnalytics(next);
  sendRemotePageView(event, session.isNewSession);
}

export function getVisitorAnalytics() {
  const analytics = readAnalytics();
  const pageViewsByPath = analytics.pageViewsByPath || {};
  const dailyPageViews = analytics.dailyPageViews || {};
  const todayKey = getDateKey();

  return {
    ...analytics,
    source: 'local',
    todayPageViews: dailyPageViews[todayKey] || 0,
    last7DaysPageViews: sumDailyPageViews(dailyPageViews, 7),
    last14DaysPageViews: sumDailyPageViews(dailyPageViews, 14),
    last30DaysPageViews: sumDailyPageViews(dailyPageViews, 30),
    topPages: Object.entries(pageViewsByPath)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8),
    recentEvents: (analytics.events || []).slice(0, 12)
  };
}

export async function fetchGlobalVisitorAnalytics() {
  if (!canUseFetch() || !shouldUseRemoteAnalytics()) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REMOTE_TIMEOUT_MS);

  try {
    const response = await window.fetch(REMOTE_ANALYTICS_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      return null;
    }

    const dailyPageViews = data.dailyPageViews || {};

    return {
      ...data,
      source: data.source || 'server',
      todayPageViews: data.todayPageViews ?? dailyPageViews[getDateKey()] ?? 0,
      last7DaysPageViews: data.last7DaysPageViews ?? sumDailyPageViews(dailyPageViews, 7),
      last14DaysPageViews: data.last14DaysPageViews ?? sumDailyPageViews(dailyPageViews, 14),
      last30DaysPageViews: data.last30DaysPageViews ?? sumDailyPageViews(dailyPageViews, 30)
    };
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function sendRemotePageView(event, isNewSession) {
  if (!canUseFetch() || !shouldUseRemoteAnalytics()) {
    return;
  }

  const payload = {
    ...event,
    isNewSession,
    referrer: typeof document !== 'undefined' ? document.referrer : ''
  };
  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(REMOTE_ANALYTICS_URL, blob);
    return;
  }

  window.fetch(REMOTE_ANALYTICS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true
  }).catch(() => {});
}

export function resetVisitorAnalytics() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(ANALYTICS_KEY);
}
