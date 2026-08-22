const DRAFTS_KEY = 'rivere_blog_drafts_v1';
const PUBLISHED_POSTS_KEY = 'rivere_blog_published_posts_v1';
const REMOTE_BLOG_URL = import.meta.env.VITE_BLOG_API_URL || '/api/blog.php';
const BLOG_ADMIN_KEY = import.meta.env.VITE_BLOG_ADMIN_KEY || 'RivereBlog2026!';
const SITE_URL = 'https://rivere.kinaraland.com';

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
    status: 'draft',
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
  const existingPost = publishedPosts.find((item) => item.id === post.id || item.slug === post.slug);
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toISOString();
  const nextPost = {
    ...post,
    id: existingPost?.id || `post-${Date.now()}`,
    source: 'dashboard',
    status: 'published',
    datePublished: existingPost?.datePublished || post.datePublished || today,
    dateModified: today,
    createdAt: existingPost?.createdAt || post.createdAt || now,
    publishedAt: existingPost?.publishedAt || now,
    updatedAt: now
  };
  const next = [
    nextPost,
    ...publishedPosts.filter((item) => item.slug !== nextPost.slug && item.id !== nextPost.id)
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
  const keywords = (draft.keywords || draft.tags || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const intro = (draft.intro || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const bodyParagraphs = (draft.body || '')
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
    id: draft.id,
    slug: draft.slug,
    title: draft.title,
    seoTitle: draft.title,
    description: draft.excerpt,
    excerpt: draft.excerpt,
    category: draft.category,
    tags: (draft.tags || draft.keywords || '').split(',').map((item) => item.trim()).filter(Boolean),
    author: draft.author || 'Tim Rivere Kostaycation IPB',
    status: draft.status || 'draft',
    datePublished: draft.datePublished || today,
    dateModified: today,
    createdAt: draft.createdAt,
    publishedAt: draft.publishedAt,
    updatedAt: draft.updatedAt,
    readTime: estimateReadTime(`${draft.contentHtml || ''} ${draft.intro || ''} ${draft.body || ''}`),
    image: draft.image,
    imageAlt: draft.imageAlt,
    keywords,
    focusKeyword: '',
    canonicalUrl: '',
    ogTitle: draft.title,
    ogDescription: draft.excerpt,
    ogImage: draft.image,
    robotsIndex: true,
    robotsFollow: true,
    contentHtml: draft.contentHtml || '',
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

export function resolveBlogPostSeo(post) {
  const canonical = post.canonicalUrl || `${SITE_URL}/blog/${post.slug}/`;
  const seoTitle = post.seoTitle || post.title;
  const description = post.description || post.excerpt || '';

  return {
    seoTitle,
    description,
    canonical,
    ogTitle: post.ogTitle || seoTitle,
    ogDescription: post.ogDescription || description,
    ogImage: post.ogImage || post.image,
    robots: `${post.robotsIndex === false ? 'noindex' : 'index'}, ${post.robotsFollow === false ? 'nofollow' : 'follow'}, max-image-preview:large`
  };
}

export function mergePublishedBlogPosts(staticPosts, publishedPosts = readPublishedBlogPosts()) {
  const publicPosts = publishedPosts.filter((post) => (post.status || 'published') === 'published');
  const publishedSlugs = new Set(publicPosts.map((post) => post.slug));
  return [
    ...publicPosts,
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
      label: 'Excerpt blog wajib diisi',
      pass: Boolean(post.excerpt.trim())
    },
    {
      label: 'Featured image wajib diisi',
      pass: Boolean(post.image.trim())
    },
    {
      label: 'Alt text featured image wajib diisi sebelum publish',
      pass: Boolean(post.imageAlt.trim())
    },
    {
      label: 'Isi artikel wajib diisi',
      pass: Boolean(post.contentHtml.trim()) || post.intro.length > 0 || post.sections.some((section) => section.paragraphs.length > 0)
    }
  ];
}

export function getSeoChecks(draft) {
  const tags = draft.tags || draft.keywords || '';
  const keywordCount = tags.split(',').map((item) => item.trim()).filter(Boolean).length;
  const wordCount = countWords(`${draft.contentHtml || ''} ${draft.intro || ''} ${draft.body || ''}`.replace(/<[^>]+>/g, ' '));
  const seoTitle = draft.seoTitle || draft.title || '';
  const description = draft.description || draft.excerpt || '';

  return [
    {
      label: 'SEO title sekitar 50-60 karakter',
      pass: seoTitle.length >= 50 && seoTitle.length <= 60,
      value: `${seoTitle.length} karakter`
    },
    {
      label: 'Meta description sekitar 140-160 karakter',
      pass: description.length >= 140 && description.length <= 160,
      value: `${description.length} karakter`
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
