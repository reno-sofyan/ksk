const ALLOWED_TAGS = new Set([
  'P', 'H2', 'H3', 'STRONG', 'B', 'EM', 'I', 'OL', 'UL', 'LI',
  'A', 'IMG', 'BLOCKQUOTE', 'BR'
]);

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

function safeUrl(value, allowRelative = true) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (allowRelative && (url.startsWith('/') || url.startsWith('#'))) return url;

  try {
    const parsed = new URL(url);
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? url : '';
  } catch {
    return '';
  }
}

export function sanitizeArticleHtml(html) {
  if (!html || typeof window === 'undefined' || typeof DOMParser === 'undefined') return '';

  const document = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = document.body.firstElementChild;

  [...root.querySelectorAll('*')].forEach((element) => {
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }

    const originalHref = element.getAttribute('href');
    const originalSrc = element.getAttribute('src');
    const originalAlt = element.getAttribute('alt');
    [...element.attributes].forEach((attribute) => element.removeAttribute(attribute.name));

    if (element.tagName === 'A') {
      const href = safeUrl(originalHref);
      if (href) {
        element.setAttribute('href', href);
        if (/^https?:/.test(href)) {
          element.setAttribute('target', '_blank');
          element.setAttribute('rel', 'noopener noreferrer');
        }
      }
    }

    if (element.tagName === 'IMG') {
      const src = safeUrl(originalSrc);
      if (src) element.setAttribute('src', src);
      element.setAttribute('alt', String(originalAlt || '').slice(0, 220));
      element.setAttribute('loading', 'lazy');
      element.setAttribute('decoding', 'async');
    }
  });

  return root.innerHTML;
}

export function legacyPostToHtml(post) {
  const escape = (value) => String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  const intro = (post.intro || []).map((paragraph) => `<p>${escape(paragraph)}</p>`).join('');
  const sections = (post.sections || []).map((section) => {
    const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${escape(paragraph)}</p>`).join('');
    const bullets = section.bullets?.length
      ? `<ul>${section.bullets.map((bullet) => `<li>${escape(bullet)}</li>`).join('')}</ul>`
      : '';
    return `<h2>${escape(section.heading)}</h2>${paragraphs}${bullets}`;
  }).join('');

  return `${intro}${sections}`;
}

export function articlePlainText(post) {
  const html = post.contentHtml || legacyPostToHtml(post);
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return html.replace(/<[^>]+>/g, ' ');
  }
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
}
