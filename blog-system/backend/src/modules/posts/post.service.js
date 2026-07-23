import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import { createSlug } from '../../utils/slug.js';
import * as repository from './post.repository.js';

const postSchema = z.object({
  title: z.string().trim().min(3).max(180),
  content: z.string().trim().min(10),
  excerpt: z.string().trim().min(10).max(500),
  thumbnail_url: z.string().trim().url().optional().or(z.literal('')),
  status: z.enum(['draft', 'published']).default('draft'),
  meta_title: z.string().trim().max(180).optional().or(z.literal('')),
  meta_description: z.string().trim().max(300).optional().or(z.literal('')),
  slug: z.string().trim().max(120).optional().or(z.literal(''))
});

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().max(100).default('')
});

function cleanContent(html) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt']
    },
    allowedSchemes: ['http', 'https', 'mailto']
  });
}

async function makeUniqueSlug(baseValue, currentId = null) {
  const baseSlug = createSlug(baseValue);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await repository.findPostBySlug(candidate);

    if (!existing || existing.id === currentId) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function listPublishedPosts(query) {
  const params = listQuerySchema.parse(query);
  const [items, total] = await Promise.all([
    repository.findPublishedPosts(params),
    repository.countPublishedPosts(params)
  ]);

  return {
    items,
    meta: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages: Math.ceil(total / params.limit)
    }
  };
}

export async function listAdminPosts(query) {
  const params = listQuerySchema.parse({ limit: 20, ...query });
  const items = await repository.findAllPosts(params);

  return {
    items,
    meta: {
      page: params.page,
      limit: params.limit
    }
  };
}

export async function getPublishedPostBySlug(slug) {
  const post = await repository.findPublishedPostBySlug(slug);

  if (!post) {
    throw new Error('POST_NOT_FOUND');
  }

  return post;
}

export async function createPost(input, uploadedThumbnailUrl = null) {
  const payload = postSchema.parse(input);
  const slug = await makeUniqueSlug(payload.slug || payload.title);

  return repository.createPost({
    ...payload,
    slug,
    content: cleanContent(payload.content),
    thumbnail_url: uploadedThumbnailUrl || payload.thumbnail_url || null,
    meta_title: payload.meta_title || payload.title,
    meta_description: payload.meta_description || payload.excerpt
  });
}

export async function updatePost(id, input, uploadedThumbnailUrl = null) {
  const existing = await repository.findPostById(id);

  if (!existing) {
    throw new Error('POST_NOT_FOUND');
  }

  const payload = postSchema.partial().parse(input);
  const nextTitle = payload.title ?? existing.title;
  const nextSlug = await makeUniqueSlug(payload.slug || nextTitle, id);

  const updated = await repository.updatePost(id, {
    title: nextTitle,
    slug: nextSlug,
    content: cleanContent(payload.content ?? existing.content),
    excerpt: payload.excerpt ?? existing.excerpt,
    thumbnail_url: uploadedThumbnailUrl || payload.thumbnail_url || existing.thumbnail_url,
    status: payload.status ?? existing.status,
    meta_title: payload.meta_title ?? existing.meta_title ?? nextTitle,
    meta_description: payload.meta_description ?? existing.meta_description ?? existing.excerpt
  });

  if (!updated) {
    throw new Error('POST_NOT_FOUND');
  }

  return updated;
}

export async function deletePost(id) {
  const deleted = await repository.deletePost(id);

  if (!deleted) {
    throw new Error('POST_NOT_FOUND');
  }

  return { id };
}
