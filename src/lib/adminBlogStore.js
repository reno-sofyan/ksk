const DRAFTS_KEY = 'rivere_blog_drafts_v1';
const PUBLISHED_POSTS_KEY = 'rivere_blog_published_posts_v1';
const REMOTE_BLOG_URL = import.meta.env.VITE_BLOG_API_URL || '/api/blog.php';
const BLOG_ADMIN_KEY = import.meta.env.VITE_BLOG_ADMIN_KEY || 'RivereBlog2026!';

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function estimateReadTime(text) {
  const words = countWords(text);
  return `${Math.max(1, Math.ceil(words / 180))} menit baca`;
}

export function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function readBlogDrafts() {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(window.localStorage.getItem(DRAFTS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function readPublishedBlogPosts() {
  if (typeof window === 'undefined') return [];

  try {
    const posts = JSON.parse(window.localStorage.getItem(PUBLISHED_POSTS_KEY) || '[]');
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

function canUseFetch() {
  return typeof window !== 'undefined' && typeof window.fetch === 'function';
}

function shouldUseRemoteBlog() {
  return Boolean(REMOTE_BLOG_URL) && REMOTE_BLOG_URL !== 'disabled';
}

async function requestRemoteBlog(action, options = {}) {
  if (!canUseFetch() || !shouldUseRemoteBlog()) {
    throw new Error('Remote blog API disabled.');
  }

  const { admin, query: queryParams, headers, ...fetchOptions } = options;
  const separator = REMOTE_BLOG_URL.includes('?') ? '&' : '?';
  const query = new URLSearchParams({ action, ...(queryParams || {}) });
  const response = await window.fetch(`${REMOTE_BLOG_URL}${separator}${query.toString()}`, {
    cache: 'no-store',
    ...fetchOptions,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(admin ? { 'X-Blog-Admin-Key': BLOG_ADMIN_KEY } : {}),
      ...(headers || {})
    }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'Blog API gagal merespons.');
  }

  return data;
}

export async function fetchServerPublishedBlogPosts() {
  try {
    const data = await requestRemoteBlog('published');
    return Array.isArray(data?.items) ? data.items : null;
  } catch {
    return null;
  }
}

export async function fetchServerBlogDrafts() {
  try {
    const data = await requestRemoteBlog('drafts', { admin: true });
    return Array.isArray(data?.items) ? data.items : null;
  } catch {
    return null;
  }
}

export async function saveServerBlogDraft(draft) {
  const data = await requestRemoteBlog('draft', {
    method: 'POST',
    admin: true,
    body: JSON.stringify(draft)
  });

  return Array.isArray(data?.items) ? data.items : [];
}

export async function publishServerBlogPost(post) {
  const data = await requestRemoteBlog('publish', {
    method: 'POST',
    admin: true,
    body: JSON.stringify(post)
  });

  return Array.isArray(data?.items) ? data.items : [];
}

export async function deleteServerBlogDraft(id) {
  const data = await requestRemoteBlog('draft', {
    method: 'DELETE',
    admin: true,
    query: { id }
  });

  return Array.isArray(data?.items) ? data.items : [];
}

export async function deleteServerPublishedBlogPost(slug) {
  const data = await requestRemoteBlog('published', {
    method: 'DELETE',
    admin: true,
    query: { slug }
  });

  return Array.isArray(data?.items) ? data.items : [];
}

export function saveBlogDraft(draft) {
  if (typeof window === 'undefined') return [];

  const drafts = readBlogDrafts();
  const nextDraft = {
    ...draft,
    id: draft.id || `draft-${Date.now()}`,
    updatedAt: new Date().toISOString()
  };
  const next = [nextDraft, ...drafts.filter((item) => item.id !== nextDraft.id)].slice(0, 30);

  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(next));
  return next;
}

export function deleteBlogDraft(id) {
  if (typeof window === 'undefined') return [];

  const next = readBlogDrafts().filter((item) => item.id !== id);
  window.localStorage.setItem(DRAFTS_KEY, JSON.stringify(next));
  return next;
}

export function publishBlogPost(post) {
  if (typeof window === 'undefined') return [];

  const publishedPosts = readPublishedBlogPosts();
  const existingPost = publishedPosts.find((item) => item.slug === post.slug);
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toISOString();
  const nextPost = {
    ...post,
    id: existingPost?.id || `post-${Date.now()}`,
    source: 'dashboard',
    datePublished: existingPost?.datePublished || post.datePublished || today,
    dateModified: today,
    publishedAt: existingPost?.publishedAt || now,
    updatedAt: now
  };
  const next = [
    nextPost,
    ...publishedPosts.filter((item) => item.slug !== nextPost.slug)
  ].sort((a, b) => new Date(b.updatedAt || b.dateModified) - new Date(a.updatedAt || a.dateModified));

  window.localStorage.setItem(PUBLISHED_POSTS_KEY, JSON.stringify(next));
  return next;
}

export function deletePublishedBlogPost(slug) {
  if (typeof window === 'undefined') return [];

  const next = readPublishedBlogPosts().filter((item) => item.slug !== slug);
  window.localStorage.setItem(PUBLISHED_POSTS_KEY, JSON.stringify(next));
  return next;
}

export function getPublishedBlogPost(slug) {
  return readPublishedBlogPosts().find((post) => post.slug === slug);
}

export function buildBlogPostExport(draft) {
  const today = new Date().toISOString().slice(0, 10);
  const keywords = draft.keywords
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const intro = draft.intro
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const bodyParagraphs = draft.body
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const faq = [
    draft.faqQuestion1 && draft.faqAnswer1
      ? { question: draft.faqQuestion1, answer: draft.faqAnswer1 }
      : null,
    draft.faqQuestion2 && draft.faqAnswer2
      ? { question: draft.faqQuestion2, answer: draft.faqAnswer2 }
      : null
  ].filter(Boolean);

  return {
    slug: draft.slug,
    title: draft.title,
    seoTitle: draft.seoTitle,
    description: draft.description,
    excerpt: draft.excerpt,
    category: draft.category,
    datePublished: today,
    dateModified: today,
    readTime: estimateReadTime(`${draft.intro} ${draft.body}`),
    image: draft.image,
    imageAlt: draft.imageAlt,
    keywords,
    intro,
    sections: [
      {
        heading: draft.sectionHeading || 'Pembahasan Utama',
        paragraphs: bodyParagraphs
      }
    ],
    faq
  };
}

export function mergePublishedBlogPosts(staticPosts, publishedPosts = readPublishedBlogPosts()) {
  const publishedSlugs = new Set(publishedPosts.map((post) => post.slug));
  return [
    ...publishedPosts,
    ...staticPosts.filter((post) => !publishedSlugs.has(post.slug))
  ];
}

export function findMergedBlogPost(staticPosts, slug, publishedPosts = readPublishedBlogPosts()) {
  return mergePublishedBlogPosts(staticPosts, publishedPosts).find((post) => post.slug === slug);
}

export function getPublishChecks(draft) {
  const post = buildBlogPostExport(draft);

  return [
    {
      label: 'Judul artikel wajib diisi',
      pass: Boolean(post.title.trim())
    },
    {
      label: 'Slug URL wajib diisi',
      pass: Boolean(post.slug.trim())
    },
    {
      label: 'SEO title wajib diisi',
      pass: Boolean(post.seoTitle.trim())
    },
    {
      label: 'Meta description wajib diisi',
      pass: Boolean(post.description.trim())
    },
    {
      label: 'Excerpt blog wajib diisi',
      pass: Boolean(post.excerpt.trim())
    },
    {
      label: 'Gambar dan alt text wajib diisi',
      pass: Boolean(post.image.trim() && post.imageAlt.trim())
    },
    {
      label: 'Intro artikel wajib diisi',
      pass: post.intro.length > 0
    },
    {
      label: 'Isi artikel wajib diisi',
      pass: post.sections.some((section) => section.paragraphs.length > 0)
    }
  ];
}

export function getSeoChecks(draft) {
  const keywordCount = draft.keywords.split(',').map((item) => item.trim()).filter(Boolean).length;
  const wordCount = countWords(`${draft.intro} ${draft.body}`);

  return [
    {
      label: 'SEO title 30-60 karakter',
      pass: draft.seoTitle.length >= 30 && draft.seoTitle.length <= 60,
      value: `${draft.seoTitle.length} karakter`
    },
    {
      label: 'Meta description 120-160 karakter',
      pass: draft.description.length >= 120 && draft.description.length <= 160,
      value: `${draft.description.length} karakter`
    },
    {
      label: 'Minimal 3 keyword',
      pass: keywordCount >= 3,
      value: `${keywordCount} keyword`
    },
    {
      label: 'Konten minimal 350 kata',
      pass: wordCount >= 350,
      value: `${wordCount} kata`
    },
    {
      label: 'Slug tersedia',
      pass: Boolean(draft.slug),
      value: draft.slug || '-'
    }
  ];
}
