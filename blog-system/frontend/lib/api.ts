import type { BlogPost, PaginatedPosts } from './types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getPublishedPosts(params: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.search) searchParams.set('search', params.search);

  const suffix = searchParams.toString() ? `?${searchParams}` : '';
  return getJson<PaginatedPosts>(`/api/posts${suffix}`);
}

export async function getPostBySlug(slug: string) {
  const result = await getJson<{ data: BlogPost }>(`/api/posts/${encodeURIComponent(slug)}`);
  return result.data;
}

export function postUrl(post: BlogPost) {
  return `${SITE_URL}/blog/${post.slug}`;
}
