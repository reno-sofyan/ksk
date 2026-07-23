export type PostStatus = 'draft' | 'published';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail_url: string | null;
  status: PostStatus;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

export type PaginatedPosts = {
  items: BlogPost[];
  meta: {
    page: number;
    limit: number;
    total?: number;
    totalPages?: number;
  };
};
